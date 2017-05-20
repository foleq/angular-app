module DirectiveTests {

    export interface IAngularDirective {
        name: string;
        factory: ng.IDirectiveFactory;
        instance: ng.IDirective;
    }

    export class AngularDirectiveTest {
        private app: ng.IModule;

        constructor(appName: string, directives: IAngularDirective[]) {
            this.app = angular.module(appName, []);

            for (let directive of directives) {
                this.app.directive(directive.name, directive.factory);
            }

            this.app.run(function ($templateCache) {
                for (let directive of directives) {
                    if (directive.instance.templateUrl == null)
                        continue;

                    let templateUrl = directive.instance.templateUrl.toString();
                    let directiveTemplate = null;

                    var req = new XMLHttpRequest();
                    req.onload = function () {
                        directiveTemplate = this.responseText;
                    };
                    req.open("get", templateUrl, false);
                    req.send();

                    $templateCache.put(templateUrl, directiveTemplate);
                }
            });
        }

        getCompiledElement(element: string) {
            var compiledElement;

            var $injector = angular.injector(['ng', this.app.name]);
            $injector.invoke(function ($rootScope, $compile) {
                var $scope = $rootScope.$new();
                compiledElement = $compile(element)($scope);
                $scope.$digest();
            });
            return compiledElement;
        }
    }
}