module Common.Accordion {

    export interface IAccordion {
        Id: number;
        Label: string;
        HasDynamicContent: boolean;
        Content: string;
        DynamicContent: string;
        IsVisible?: boolean;
    } 

    export class DynamicAccordionsDirective implements ng.IDirective {
        constructor() {
            return {
                controller: DynamicAccordionsDirective.Controller,
                bindToController: true,
                controllerAs: "accordionsCtrl",
                replace: true,
                restrict: "E",
                transclude: true,
                template: `
                <div ng-repeat="accordion in accordionsCtrl.accordions">
                    <accordion label="{{accordion.Label}}" ng-if="accordion.IsVisible" data-accordion-id="{{accordion.Id}}">
                        {{accordion.Content}}
                    </accordion>
                </div>`,
                scope: {
                    accordions: "="
                },
                link: (scope, element: JQuery, attrs, ctrl: DynamicAccordionsDirective.Controller) => {
                    // Trigger when number of children changes, including by directives like ng-repeat
                    var watch = scope.$watch(() => {
                        return element.children().length;
                    }, () => {
                        // Wait for templates to render
                        scope.$evalAsync(() => {
                            // Finally, directives are evaluated and templates are renderer here
                            for (var accordion of ctrl.accordions) {
                                if (accordion.HasDynamicContent) {
                                    element.parent().find("[data-accordion-id='" + accordion.Id + "']")
                                        .append(ctrl.getCompiledDynamicContent(accordion));
                                }
                            }
                        });
                    });
                }
            }
        }
        static instance(): ng.IDirective {
            return new DynamicAccordionsDirective();
        }
    }

    export module DynamicAccordionsDirective {
        interface IAccordionsScope {
            accordions: Common.Accordion.IAccordion[];
        }

        export class Controller {

            accordions: Common.Accordion.IAccordion[] = [];

            constructor(private scope: IAccordionsScope, private $compile: any) {
                this.accordions = scope.accordions;
            }

            getCompiledDynamicContent(accordion: IAccordion) {
                return this.$compile(accordion.DynamicContent)(this.scope);
            }
        }
    }

}