module App {

    var common = angular.module("Common");
    common.directive("tab", Common.Tabs.TabDirective.instance);
    common.directive("tabs", Common.Tabs.TabsDirective.instance);
    common.directive("accordion", Common.Accordion.AccordionDirective.instance);
    Common.Accordion.AccordionDirective.Controller.$inject = ["$scope"];
    common.directive("dynamicAccordions", Common.Accordion.DynamicAccordionsDirective.instance);
    Common.Accordion.DynamicAccordionsDirective.Controller.$inject = ["$scope", "$compile"];
    common.directive("pagerScroll", Common.PagerScroll.PagerScrollDirective.instance);
    common.service("pagerScrollModelFactory", Common.PagerScroll.PagerScrollModelFactory);

    var app = angular.module("App");
    app.service("customAccordionsProvider", App.Providers.CustomAccordionsProvider);
    app.service("itemsProvider", App.ItemsList.TestItemsProvider);
    app.directive("itemsList", App.ItemsList.ItemsListDirective.instance);
    App.ItemsList.ItemsListController.$inject = ["itemsProvider", "pagerScrollModelFactory"];

    app.controller("resultController", ["customAccordionsProvider", Controllers.ResultController]);
}