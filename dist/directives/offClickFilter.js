'use strict';

angular.module('offClick').directive('offClickFilter', ["OffClickFilterCache", "$parse", function (OffClickFilterCache, $parse) {
    var filters = void 0;
    var addFiltersToCache = function addFiltersToCache(filters) {
        filters.forEach(function (filter) {
            OffClickFilterCache[filter] ? OffClickFilterCache[filter].push(elem[0]) : OffClickFilterCache[filter] = [elem[0]];
        });
    };
    return {
        restrict: 'A',
        compile: function compile(elem, attrs) {
            addFiltersToCache($parse(attrs.OffClickFilterCache).split(',').map(function (x) {
                return x.trim();
            }));
            return function (scope, element) {
                scope.$on('$destroy', function () {
                    element = null;
                    filters.forEach(function (filter) {
                        if (OffClickFilterCache[filter].length > 1) {
                            OffClickFilterCache[filter].splice(OffClickFilterCache[filter].indexOf(elem[0]), 1);
                        } else {
                            OffClickFilterCache[filter] = null;
                            delete OffClickFilterCache[filter];
                        }
                    });
                });
            };
        }
    };
}]);