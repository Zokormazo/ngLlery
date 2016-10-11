'use strict';

angular.module('myApp.common')

.directive('compareTo', function() {
	return {
		require: "ngModel",
		link: function(scope, element, attributes, ngModel) {
			var modelToMatch = attributes.compareTo;

			scope.$watch(attributes.compareTo, function() {
				ngModel.$validate();
			});

			ngModel.$validators.compareTo = function(modelValue, viewValue) {
				return viewValue === scope.$eval(modelToMatch);
			};
		}
	}
});
