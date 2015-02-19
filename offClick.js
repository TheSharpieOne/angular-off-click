angular.module('offClick', [])
    .directive('offClick', ['$document', '$rootScope', '$timeout', '$parse', function ($document, $rootScope, $timeout, $parse) {

    function targetInFilter(target, filter) {
        if (!target || !filter) return false;
        var elms = angular.element(document.querySelectorAll(filter));
        var elmsLen = elms.length;
        for (var i = 0; i < elmsLen; ++i)
        if (elms[i].contains(target)) return true;
        return false;
    }

    return {
        restrict: 'A',
        compile: function ($element, attr) {
            var fn = $parse(attr.offClick);
            return function (scope, element) {
                var offClickFilter;
                if (attr.offClickIf) {
                    $rootScope.$watch(attr.offClickIf, function (newVal, oldVal) {
                        if (newVal && !oldVal) {
                            $timeout(function () {
                                $document.on('click', handler);
                            });
                        } else if (!newVal) {
                            $document.off('click', handler);
                        }
                    });
                } else {
                    $document.on('click', handler);
                }

                attr.$observe('offClickFilter', function (value) {
                    offClickFilter = value;
                });

                function handler(event) {
                    // This filters out artificial click events. Example: If you hit enter on a form to submit it, an
                    // artificial click event gets triggered on the form's submit button.
                    if (event.pageX == 0 && event.pageY == 0) return;

                    var target = event.target || event.srcElement;
                    if (!(element[0].contains(target) || targetInFilter(target, offClickFilter))) {
                        var callback = function () {
                            fn(scope, {
                                $event: event
                            });
                        };
                        scope.$apply(callback);
                    }
                }
            };
        }
    };
}]);
