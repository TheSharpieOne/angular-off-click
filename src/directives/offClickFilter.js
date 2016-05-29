angular.module('offClick')
.directive('offClickFilter', (OffClickFilterCache, $parse) => {
    let filters;
    const addFiltersToCache = (filters) => {
            filters.forEach((filter) => {
                OffClickFilterCache[filter] ? OffClickFilterCache[filter].push(elem[0]) : OffClickFilterCache[filter] = [elem[0]];
            });
    };
    return {
        restrict:'A',
        compile : (elem, attrs)  => {
            addFiltersToCache ($parse(attrs.OffClickFilterCache).split(',').map(x => x.trim()));
            return (scope, element) => {
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