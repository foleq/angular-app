module Common.Accordion {

    export class AccordionDirective implements ng.IDirective {
        constructor() {
            return {
                controller: AccordionDirective.Controller,
                bindToController: true,
                controllerAs: "vm",
                replace: true,
                restrict: "E",
                transclude: true,
                template: `
                    <div style="border: 1px #000 solid;">
                        <h3> {{vm.label}}</h3>
                        <div ng-transclude></div>
                    </div>`,
                scope: {
                    label: "@"
                }
            }
        }

        static instance(): ng.IDirective {
            return new AccordionDirective();
        }
    }

    export module AccordionDirective {

        interface IAccordionScope {
            label: string
        }

        export class Controller {

            label: string;

            constructor(scope: IAccordionScope) {
                this.label = scope.label;
            }
        }
    }
}