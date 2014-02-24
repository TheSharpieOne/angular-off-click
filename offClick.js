var app = angular.module('offClick',[]);
app.directive('offClick', ['$document', function ($document) {
        
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
                scope.$watch(scope.offClickIf, function (newVal) {
                        if (newVal) {
                            $document.bind('click', handler);
                        } else {
                            $document.unbind('click', handler);
                        }
                    }
                );
            } else {
                $document.bind('click', handler);
            }
    
            function handler(event) {
                if (!(elm[0].contains(event.target) || targetInFilter(event.target, attr.offClickFilter))) {
                    scope.$apply(scope.offClick());
                }
            }
        }
    };
}]);
