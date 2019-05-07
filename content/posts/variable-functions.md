---
title: Variable functions are stupid and fun
publishDate: 2015-03-23
---

#### Preface
PHP was my first scripting language. For better or worse, it's been my most comfortable language since 2008 (7 years ago at time of writting). As a result, it's influenced how I write in other languages.

### Variable variableness by example
In PHP, there's dedicated syntax for calling class methods by name. Here's a trivial example:
```php
class Dog {
    public function bark() {
        print "Woof!\n";
    }
    public function sit() {
        print "Cool\n";
    }
}

$dog = new Dog();
$commands = array('bark', 'sit');

foreach ($commands as $command) {
    $dog->{$command}();
}
```

In Python, the syntax isn't on hand, but `getattr` can act similarly.
```python
class Dog:
    def bark(self):
        print "Woof!\n"

    def sit(self):
        print "Cool\n"

dog = Dog()
commands = ['bark', 'sit']

for command in commands:
    getattr(dog, command)()
```

In Javascript, I don't know of a name for it. It seems like a natural product of how the language works.
```javascript
function Dog() {}
Dog.prototype.bark = function () {
    console.log('Woof!');
};
Dog.prototype.sit = function () {
    console.log('Cool');
};

var dog = new Dog();
var commands = ['bark', 'sit'];

for (var i in commands) {
    var command = commands[i];
    dog[command]();
}
```

#### Stupid
A lot of trust is required here. The methods have to exist, and static code analysis often won't detect when they don't. A misspelling kills the program. 

#### Fun
The alternative is checking for possible command, then invoking the appropriate method. When the number of commands becomes very large, a big switch or lots of if/elseifs becomes cumbersome. 

### Becoming smart and boring
Reeling in the danger is pretty simple: check for errors. In the case of PHP and Javascript, add checks before invoking the method. In Python, `getattr` throws an `AttributeError` when the attribute doesn't exist. Handle the exceptional case with a safe default, an error page, or safe self destruction.

#### An example from Mancala
I used this dynamic invocation trick on [Mancala](https://github.com/jonathantrevorh/mancala/), a service for playing the board game via SMS. Game play consisted of texting a command, like `start`, the letter for the position you want to play, or `reset` to quit. If `getattr` threw up, then the service simply replied 'Invalid move' and quit.
```php
try:
    getattr(self, command)()
except AttributeError:
    self.message = "Invalid move"
```
