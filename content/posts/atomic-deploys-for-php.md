---
title: Atomic Deploys for PHP
publishDate: 2015-01-26
---

#### Preface
I make <a href="https://lateplateapp.com">Lateplate App</a>, a tiny web app for requesting to-go boxes for when you miss a meal because of a test or meeting (it's tiny because there were only 142 people visit in the last month). It's not making gobs of cash, so I don't call it a business. It's more of a very nerdy hobby. A very nerdy hobby that lets me grapple with real problems of making a web product, without having to be employeed at a company with those problems. One of those problems has been deploying without having little blips of time where errors occur. 

### Setup
In PHP, classes are autoloaded on the fly, so there's a chance that dependencies have been updated to a new, backwards-incompatible version. Imagine version 1 of the code this looks something like this:

```php
<?php

class Email {
    public function send() {}
}

class Notification {
    public function send() {
        $email = new Email();
        $email->send();
    }
}
```
(Although both classes are shown above in the same place, imagine they're actually in different files: `Email.php`, and `Notification.php`)

Version 2 might look like this. A `prepare()` is now required before sending the email.
```php
<?php

class Email {
    private $_prepared = false;

    public function prepare() {
        $this->_prepared = true;
    }
    public function send() {
        if ($this->_prepared !== true) {
            throw new Exception('Email must be prepared first');
        }
    }
}

class Notification {
    public function send() {
        $email = new Email();
        $email->prepare();
        $email->send();
    }
}
```

### Problem
This seems all well, the new version works, and the old version works. But only if the code is either all version 1 or all version 2. When your deploy process is a glorified `rsync`, this isn't the case. `Email.php` could be at version 2 while `Notification.php` is still at version 1. If a request comes in at this unfortunate blip in time, `$email->send()` will throw an exception. 

### Solution
For my web app, this tiny blip in time has, to my knowledge, never been discovered. There just aren't enough requests per second to have hit that blip, or there were, any errors went unnoticed. However, I threw a wrench in the deploy process, increasing the blip time to a few seconds. Now I can't dismiss the risk of the blip being exposed to the people using the app. Here's how I get around it (this is nothing novel, it's well-ish document in the PHP world). The web server root directory is pointed to a symlink instead of a hard directory name (imagine `/opt/my-app/current/web/` instead of `/opt/my-app/web/` where `current` is a symlink and `/opt/my-app/` contains directories of versions of the app). The symlink then points to whatever version should be live (maybe `/opt/my-app/current/ -> /opt/my-app/1/`). Instead of `rsync`ing to the live version directory, on each deploy, a new version directory is made (`/opt/my-app/2/`). New code is uploaded to the new version directory. Once all the code is uploaded, a `latest` symlink is created: `ln -s 2 latest`. Finally, the `current` symlink is updated atomically: `mv -T latest current`. The 'atomic' bit matters the most. The `mv` command does special kernel magic to make sure that `current` will always exist, effectively making the blip time zero.

Old deploy process:
```bash
rsync ./ server:/opt/my-app/
```

New deploy process:
```bash
ssh myapp
cd /opt/my-app/
mkdir 2
exit
rsync ./ server:/opt/my-app/2/
ssh myapp
cd /opt/my-app/
ls -s 2 latest
mv -T latest current
```
This manual process is simplified into a fabric deploy script, so I actually just run `fab upversion tag_release` to increment the app version number and create an annotated git tag. To deploy, it's just `fab prod deploy` where the `prod` task sets up the `env`, and `deploy` actually uploads the code, and does the symlink magic.
