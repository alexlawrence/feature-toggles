var featureToggles = require('./index.js');

describe('when checking if a feature is enabled', function() {

    describe('without any toggles loaded', function() {

        it('should return false', function() {
            expect(featureToggles.isFeatureEnabled('foobar')).toBeFalsy();
        });

    });

    describe('which is not defined in the toggles', function() {

        beforeEach(function() {
            featureToggles.load({foo: true});
        });

        it('should return false', function() {
            expect(featureToggles.isFeatureEnabled('bar')).toBeFalsy();
        });

    });

    describe('which has a value of 1', function() {

        beforeEach(function() {
            featureToggles.load({foo: 1});
        });

        it('should return false', function() {
            expect(featureToggles.isFeatureEnabled('foo')).toBeFalsy();
        });

    });

    describe('which has an empty array as value', function() {

        beforeEach(function() {
            featureToggles.load({foo: []});
        });

        it('should return false', function() {
            expect(featureToggles.isFeatureEnabled('foo')).toBeFalsy();
        });

    });

    describe('which has a value of 0', function() {

        beforeEach(function() {
            featureToggles.load({foo: 0});
        });

        it('should return false', function() {
            expect(featureToggles.isFeatureEnabled('foo')).toBeFalsy();
        });

    });

    describe('which has a value of false', function() {

        beforeEach(function() {
            featureToggles.load({foo: false});
        });

        it('should return false', function() {
            expect(featureToggles.isFeatureEnabled('foo')).toBeFalsy();
        });

    });

    describe('which has a value of true', function() {

        beforeEach(function() {
            featureToggles.load({foo: true});
        });

        it('should return true', function() {
            expect(featureToggles.isFeatureEnabled('foo')).toBeTruthy();
        });

    });

    describe('which has a function as value', function() {

        var _spy;

        beforeEach(function() {
            _spy = jasmine.createSpy('featureToggle');
            featureToggles.load({foo: _spy});
            featureToggles.isFeatureEnabled('foo', 2, 3, 4);
        });

        it('should invoke the function', function() {
            expect(_spy).toHaveBeenCalled();
        });

        it('should pass all arguments except the feature name to the function', function() {
            expect(_spy).toHaveBeenCalledWith(2, 3, 4);
        });

    });

    describe('which has a function as value which returns false', function() {

        beforeEach(function() {
            featureToggles.load({foo: function() { return false; }})
        });

        it('should return false', function() {
            expect(featureToggles.isFeatureEnabled('foo')).toBeFalsy();
        });

    });

    describe('which has a function as value which throws an exception', function() {

        beforeEach(function() {
            featureToggles.load({foo: function() { throw new Error('error'); }})
        });

        it('should return false', function() {
            expect(featureToggles.isFeatureEnabled('foo')).toBeFalsy();
        });

    });

    describe('which has a function as value which returns 1', function() {

        beforeEach(function() {
            featureToggles.load({foo: function() { return 1; }})
        });

        it('should return false', function() {
            expect(featureToggles.isFeatureEnabled('foo')).toBeFalsy();
        });

    });

    describe('which has a function as value which returns true', function() {

        beforeEach(function() {
            featureToggles.load({foo: function() { return true; }})
        });

        it('should return true', function() {
            expect(featureToggles.isFeatureEnabled('foo')).toBeTruthy();
        });

    });

    describe('which has a function with arguments as value which returns true', function() {

        beforeEach(function() {
            featureToggles.load({foo: function(a) { var b = 'bar'; return a === b; }})
        });

        it('should return true', function() {
            expect(featureToggles.isFeatureEnabled('foo', 'bar')).toBeTruthy();
        });

    });

});

describe('when checking multiple times if a feature is enabled which has a function as value', function() {

    var _spy;

    beforeEach(function() {
        _spy = jasmine.createSpy('featureToggle');
        featureToggles.load({foo: _spy});
        featureToggles.isFeatureEnabled('foo');
        featureToggles.isFeatureEnabled('foo');
        featureToggles.isFeatureEnabled('foo');
    });

    it('should invoke the function every time asked if the feature is enabled', function() {
        expect(_spy.callCount).toBe(3);
    });

});
