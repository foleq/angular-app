module Common.PagerScroll {

    export interface IPagerScrollScope {
        pagerScroll: IPagerScrollModel;
        $apply: any;
    }

    export class PagerScrollDirective implements ng.IDirective {

        constructor() {
            var directive: ng.IDirective = {
                restrict: "A",
                scope: {
                    pagerScroll: "="
                },
                controller: PagerScrollController,
                link(scope: IPagerScrollScope, element, attrs, ctrl: IPagerScrollController) {
                    var rowHeight: number;

                    element.scroll((event) => {
                        if (scope.pagerScroll == null) {
                            return;
                        }
                        event.preventDefault();

                        if (rowHeight == null) {
                            rowHeight = ctrl.calculateRowHeight(scope.pagerScroll, element);
                        }

                        if (ctrl.isScrollUpPossible(scope.pagerScroll, element)) {
                            ctrl.scrollUp(scope, element, rowHeight);
                        }
                        if (ctrl.isScrollDownPossible(scope.pagerScroll, element)) {
                            ctrl.scrollDown(scope, element, rowHeight);
                        }
                    });
                }
            };
            return directive;
        }

        static instance(): ng.IDirective {
            return new PagerScrollDirective();
        }
    }
}