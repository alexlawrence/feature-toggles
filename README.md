# feature-toggles

Simple implementation of
[feature toggles](http://martinfowler.com/bliki/FeatureToggle.html)
for JavaScript (also called feature flipping).

### Features

This module encapsulates all calls to check if a certain feature (toggle) is enabled.
Furthermore it provides the possibility to have computed feature toggle values in form of functions.

### Simple toggle values

Example for using plain values:

```javascript
// define toggles
var toggles = {foo: true, bar: false};

// load them into the module
var featureToggles = require('feature-toggles');
featureToggles.load(toggles);

// check if a feature is enabled
if (featureToggles.isFeatureEnabled('foo')) {
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

app.get('/', function(request, response) {
    if (featureToggles.isFeatureEnabled('foo', request)) {
        // do something
    }
});
```

Enabling a toggle based on a certain date:

```javascript
var toggles = {
    foo: function() {
        var date = new Date();
        return date.getDate() > 15;
    }
}

var featureToggles = require('feature-toggles');
featureToggles.load(toggles);

if (featureToggles.isFeatureEnabled('foo')) {
    // do something
}
```

#### Express integration

Use the middleware to easily toggle features per request.
This way a special version of `isFeatureEnabled()` is exposed to all views (res.locals).
Computed toggles will automatically receive the current request and response as arguments.

```javascript
var toggles = {
    foo: function(request, response) {
        return request.param('enableFoo');
    }
}
```

```javascript
var application = express();

application.use(featureToggles.middleware);
```

```jade
- if (isFeatureEnabled('foo'))
    Foo is enabled
```

### Alternative modules

* https://github.com/nomiddlename/flipper
* https://github.com/bigodines/feature-flipper-js
