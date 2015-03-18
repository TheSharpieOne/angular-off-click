angular.module('offClick', [])
    .directive('offClick', ['$rootScope', '$parse', function ($rootScope, $parse) {
    var id = 0;
    var listeners = {};

    document.addEventListener("touchend", offClickEventHandler, true);
    document.addEventListener('click', offClickEventHandler, true);

    function targetInFilter(target, elms) {
        if (!target || !elms) return false;
        var elmsLen = elms.length;
        for (var i = 0; i < elmsLen; ++i)
        if (elms[i].contains(target)) return true;
        return false;
    }

    function offClickEventHandler(event) {
        var target = event.target || event.srcElement;
        angular.forEach(listeners, function (listener, i) {
            if (!(listener.elm.contains(target) || targetInFilter(target, listener.offClickFilter))) {
                $rootScope.$evalAsync(function () {
                    listener.cb(listener.scope, {
                        $event: event
                    });
                })
            }

        });
    }

    return {
        restrict: 'A',
        compile: function ($element, attr) {
            var fn = $parse(attr.offClick);
            return function (scope, element) {
                var elmId = id++;
                var offClickFilter;
                var removeWatcher;
                
                offClickFilter = document.querySelectorAll(scope.$eval(attr.offClickFilter));

                if (attr.offClickIf) {
                    removeWatcher = $rootScope.$watch(function () {
                        return $parse(attr.offClickIf)(scope);
                    }, function (newVal) {
                        if (newVal) {
                            on();
                        } else if (!newVal) {
                            off();
                        }
                    });
                } else {
                    on();
                }

                attr.$observe('offClickFilter', function (value) {
                    offClickFilter = document.querySelectorAll(scope.$eval(value));
                });

                scope.$on('$destroy', function () {
                    off();
                    if (removeWatcher) {
                        removeWatcher();
                    }
                });

                function on() {
                    listeners[elmId] = {
                        elm: element[0],
                        cb: fn,
                        scope: scope,
                        offClickFilter: offClickFilter
                    };
                }

                function off() {
                    delete listeners[elmId];
                }
            };
        }
    };
}]);
