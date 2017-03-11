module Common.Tabs {

    export class TabsDirective implements ng.IDirective {

        constructor() {
            var directive: ng.IDirective = {
                restrict: "E",
                scope: {
                },
                transclude: true,
                controller: TabsController,
                controllerAs: "tabsCtrl",
                templateUrl: "/Directives/Template/Common/Tabs",
                link: function ($scope, $element, $attrs, $ctrl: ITabsController) {
                    if ($ctrl.getTabs().length > 0) {
                        $ctrl.selectTab($attrs.active || 0);
                    }
                },
            };
            return directive;
        }

        
        static instance(): ng.IDirective {
            return new TabsDirective();
        }
    }
} 