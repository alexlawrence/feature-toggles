# feature-toggles

Simple implementation of
[feature toggles](http://martinfowler.com/bliki/FeatureToggle.html)
for Node.js (also called feature flipping).

### Features

This module offers one additional feature over using a simple plain JavaScript object:
computed feature toggle values in form of functions.

### Simple toggle values

Example for using plain values:

```javascript
// define toggles
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

For computed values provide a function for the value of a feature toggle.
Whenever checking if the feature is enabled the provided function will be invoked.
All arguments passed to the `isFeatureEnabled()` call except the first one are passed on to the function.

Example:

```javascript
// define a computed toggle
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

If the function throws an exception the `isFeatureEnabled()` call will return false to prevent runtime crashes.

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
