var _toggles = {};

var slice = Array.prototype.slice;

exports.load = function(toggles) {
    _toggles = toggles;
};

exports.isFeatureEnabled = function(name) {
    var toggleValue = _toggles[name];
    if (typeof toggleValue == 'function') {
        try {
            var toggleArguments = slice.call(arguments, 1);
            toggleValue = toggleValue.apply(this, toggleArguments);
        }
        catch (error) {
            return false;
        }
    }
    return toggleValue === true;
};

exports.middleware = function(request, response, next) {
    response.locals.isFeatureEnabled = function(name) {
        return exports.isFeatureEnabled(name, request, response);
    };
    next();
};