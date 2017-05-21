module App {

    var common = angular.module("Common");
    common.directive("tab", Common.Tabs.TabDirective.instance);
    common.directive("tabs", Common.Tabs.TabsDirective.instance);
    common.directive("accordion", Common.Accordion.AccordionDirective.instance);
    common.directive("dynamicAccordions", Common.Accordion.DynamicAccordionsDirective.instance);

    Common.Accordion.AccordionDirective.Controller.$inject = ["$scope"];
    Common.Accordion.DynamicAccordionsDirective.Controller.$inject = ["$scope", "$compile"];

    var app = angular.module("App");
    app.service("customAccordionsProvider", App.Providers.CustomAccordionsProvider);
    app.controller("resultController", ["customAccordionsProvider", Controllers.ResultController]);
}