# feature-toggles

Simple implementation of
[feature toggles](http://martinfowler.com/bliki/FeatureToggle.html)
for Node.js (also called feature flipping).

### Features

This module offers one additional functionality over using a simple plain JavaScript object:
computed feature toggle values in form of functions.

### Boolean toggle values

Example for using simple boolean values:

```javascript
// define your toggles
var toggles = {foo: true, bar: false};

// load them into the module
var featureToggles = require('feature-toggles');
featureToggles.load(toggles);

// check if a feature is enabled
if (featureToggles.isFeatureEnabled('foo') {
    // do something
}
```

### Computed toggle values

To use computed values you simply provide a function for the value of a feature toggle.
Whenever you check if the feature is enabled the provided function will be invoked.
All arguments passed to the `isFeatureEnabled` call except the first one are passed on to your function.

Example:

```javascript
// define your computed toggle
var toggles = {
    foo: function(a, b) {
        return (a == 'a' && b == 'b');
     }
}

// load them into the module
var featureToggles = require('feature-toggles');
featureToggles.load(toggles);

// check if a feature is enabled and provide additional arguments
if (featureToggles.isFeatureEnabled('foo', 'a', 'b') {
    // do something
}
```

If a function throws an exception `isFeatureEnabled()` will simply return false to prevent runtime crashes.

#### Advanced examples (pseudo code)

Enabling a toggle based on an url parameter within an express app:

```javascript
var toggles = {
    foo: function(request) {
        return request.param('enableFoo');
    }
}

var featureToggles = require('feature-toggles');
featureToggles.load(toggles);

app.get('/', function() {
    if (featureToggles.isFeatureEnabled('foo', request)) {
        // do something
    }
});
```

Enabling a toggle based on a certain date:

```javascript
var toggles = {
    foo: function(request) {
        var date = new Date();
        return date.getDate() > 15;
    }
}

var featureToggles = require('feature-toggles');
featureToggles.load(toggles);

if (featureToggles.isFeatureEnabled('foo', request)) {
    // do something
}
```

### Alternative modules

* https://github.com/nomiddlename/flipper
* https://github.com/bigodines/feature-flipper-js
