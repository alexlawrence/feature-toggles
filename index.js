var featureToggles = {
    _toggles: {},
    load: function(toggles) {
        this._toggles = toggles;
    },

    isFeatureEnabled: function(featureName) {
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
    },

    middleware: function(request, response, next) {
        response.locals.isFeatureEnabled = function(featureName) {
            return featureToggles.isFeatureEnabled(featureName, request, response);
        };
        next();
    }
};

module.exports = featureToggles;
