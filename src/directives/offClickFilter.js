angular.module('offClick')
.directive('offClickFilter', (OffClickFilterCache, $parse) => {
    let filters;

    return {
        restrict:'A',
        compile : (elem, attrs)  => {
            return (scope, element) => {
                $parse(attrs.offClickFilter)(scope).split(',').map(x => x.trim()).forEach(filter => {
                    OffClickFilterCache[filter] ? OffClickFilterCache[filter].push(elem[0]) : OffClickFilterCache[filter] = [elem[0]];
                });

                scope.$on('$destroy',()  => {
                    element = null;
                    filters.forEach((filter) => {
                        if(OffClickFilterCache[filter].length > 1)  {
                            OffClickFilterCache[filter].splice(OffClickFilterCache[filter].indexOf(elem[0]), 1);
                        }
                        else {
                            OffClickFilterCache[filter] = null;
                            delete OffClickFilterCache[filter];
                        }
                    });
                });
            };
        }
    };
});