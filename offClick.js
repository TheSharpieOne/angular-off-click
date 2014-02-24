var app = angular.module('offClick',[]);
app.directive('offClick', ['$document', function ($document) {
    return {
        restrict: 'A',
        scope: {
            offClick: '&',
            offClickIf: '&'
        },
        link: function (scope, elm, attr) {
            $document.on('click',function(e){
                if(attr.offClickIf && !scope.offClickIf()) return;
                if ($(e.target).parents().add(e.target).filter(elm.add($(attr.offClickFilter))).length === 0){
                    scope.$apply(scope.offClick());
                }
            });
        }
    };
}]);
