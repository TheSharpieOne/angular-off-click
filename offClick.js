angular.module('offClick',[])
.directive('offClick', ['$document', function ($document) {
        
    function targetInFilter(target,filter){
        if(!target || !filter) return false;
        var elms = angular.element(filter);
        var elmsLen = elms.length;
        for (var i = 0; i< elmsLen; ++i)
            if(elms[i].contains(target)) return true;
        return false;
    }
    
    return {
        restrict: 'A',
        scope: {
            offClick: '&',
            offClickIf: '&'
        },
        link: function (scope, elm, attr) {

            if (attr.offClickIf) {
                scope.$watch(scope.offClickIf, function (newVal, oldVal) {
                        if (newVal && !oldVal) {
                            $document.on('click', handler);
                        } else if(!newVal){
                            $document.off('click', handler);
                        }
                    }
                );
            } else {
                $document.on('click', handler);
            }

            scope.$on('$destroy', function() {
                $document.off('click', handler);
            });

            function handler(event) {
                var target = event.target || event.srcElement;
                if (!(elm[0].contains(target) || targetInFilter(target, attr.offClickFilter))) {
                    scope.$apply(scope.offClick());
                }
            }
        }
    };
}]);
