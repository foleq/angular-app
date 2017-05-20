module Common.Tabs {

    export interface ITab {
        label: string;
        selected: boolean;
    }

    export interface ITabScope {
        tab: ITab;
        label: string;
        selected: boolean;
    }

    export class TabDirective implements ng.IDirective {

        constructor() {
            var directive: ng.IDirective = {
                restrict: "E",
                scope: {
                    label: "@"
                },
                transclude: true,
                template: `
                    <div class="tabs-content" ng-if="tab.selected">
                        <div ng-transclude></div>
                    </div>
                `,
                require: '^tabs',
                link: function ($scope: ITabScope, $element, $attrs, $ctrl: ITabsController) {
                    $scope.tab = {
                        label: $scope.label,
                        selected: false
                    };
                    $ctrl.addTab($scope.tab);
                }
            };
            return directive;
        }

        static instance(): ng.IDirective {
            return new TabDirective();
        }
    }
}