angular.module('offClick')
.directive('offClickFilter', (OffClickFilterCache, $parse) => {
    let filters;

    return {
        restrict:'A',
        compile : (elem, attrs)  => {
            return (scope, element) => {
                filters = $parse(attrs.offClickFilter)(scope).split(',').map(x => x.trim());

                filters.forEach(filter => {
                    OffClickFilterCache[filter] ? OffClickFilterCache[filter].push(element[0]) : OffClickFilterCache[filter] = [element[0]];
                });

                scope.$on('$destroy',()  => {
                    filters.forEach((filter) => {
                        if(angular.isArray(OffClickFilterCache[filter]) && OffClickFilterCache[filter].length > 1)  {
                            OffClickFilterCache[filter].splice(OffClickFilterCache[filter].indexOf(element[0]), 1);
                        }
                        else {
                            OffClickFilterCache[filter] = null;
                            delete OffClickFilterCache[filter];
                        }
                    });
                    element = null;
                });
            };
        }
    };
});
