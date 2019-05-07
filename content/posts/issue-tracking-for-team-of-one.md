---
title: Issue tracking for a team of 1
publishDate: 2015-01-31
---

#### Preface
I make <a href="https://lateplateapp.com">Lateplate App</a>, a tiny SaaS, as <a href="/Atomic-Deploys-for-PHP/">mentioned before</a>. People don't often ask for features, but luckily, enough things come to mind to cause contention for what is implemented next.

### My process
No matter how small the team, some process for tracking what to do next will exist. Either it's stream of thought and you're able to write software quicker than you can forget, or you've got so many incoming requests that some issues have been seen only by the requester. I'm terrible at remembering things, so my issue tracking is only a checklist. It looks something like this:

```
☐ Make a logo
☐ Suggest adding a diet if the request notes include "vegetarian" or "no meat", etc
☐ Update to OAuth
☐ Better error page
☐ ----------------------
☐ Create an event storage system to string together user stories
☐ On help page, use referrer to guess a relevant article
☐ Migrate to www.
☐ ----------------------
☑ Get rid of /about page
☑ Precompile views
☑ Add meals to admin panel
☑ Menu uploads via /manage/
```

Sections are divided by dashes.

#### The first section: Bugs and on-mind features
Bugs jump straight to the top here. I don't work on features until known bugs are gone. This section contains things that are on my mind and are to be implemented next. When an item is finished, it's commited to master and checked off (moving it to the bottom section). I deploy whenever I feel like, but at least when the top section is exhausted. More often, I'll finish things and check them off, and add things back before this section is emptied.

#### The second section: Everything else
These are "I wish I had [blank]"s, and "In the future, it'd be good to have [blank]"s. Things that came to mind once, but aren't worth their development cost right now. A few months ago, the OAuth item was in this section, but it's got an artificial deadline around April, so it's been bumped up.

#### Checked section
I have never read through this section. It's mostly to make me feel better, and maybe it'll be useful in the future to know what I've done.

### Minimum viable process
I've been asked why I don't use something more formal, like the "agile" tools mentioned in coursework. They're just not necessary for how few things there are to track. Using something with more features requires manipulating tasks in a framework other than my head. The goal for any interface should be matching the person's mental model as closely as possible. This is echoed in principles like [KISS](http://en.wikipedia.org/wiki/KISS_principle) and books like [Don't Make Me Think](http://en.wikipedia.org/wiki/Don%27t_Make_Me_Think). Tasks are done or not done, in mind or not. Anything more descriptive (points, delivered vs rejected vs unstarted, etc) just gets in the way, for a project this small.
