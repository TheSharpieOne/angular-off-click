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
            $document.on('click',function(event){
                if(attr.offClickIf && !scope.offClickIf()) return;
                if (!(elm[0].contains(event.target) || targetInFilter(event.target, attr.offClickFilter))){
                    scope.$apply(scope.offClick());
                }
            });
        }
    };
}]);
