function _isFeatureEnabled(featureName) {
    var toggle = this._toggles[featureName];
    if (typeof toggle == 'function') {
        try {
            var toggleArguments = Array.prototype.slice.call(arguments, 1);
            toggle = toggle.apply(this, toggleArguments);
        }
        catch (error) {
            return false;
        }
    }
    return toggle === true;
}

var featureToggles = {
    _toggles: {},
    load: function(toggles) {
        this._toggles = toggles;
    },

    isFeatureEnabled: function(featureName) {
        if (Array.isArray(featureName)) {
          return featureName.some(_isFeatureEnabled, this);
        }
        return _isFeatureEnabled.apply(this, arguments);
    },

    middleware: function(request, response, next) {
        response.locals.isFeatureEnabled = function(featureName) {
            return featureToggles.isFeatureEnabled(featureName, request, response);
        };
        next();
    }
};

module.exports = featureToggles;
