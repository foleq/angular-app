module App {

    var common = angular.module("Common");
    common.directive("tab", Common.Tabs.TabDirective.instance);
    common.directive("tabs", Common.Tabs.TabsDirective.instance);


    var app = angular.module("App");
    app.controller("resultController", Controllers.ResultController);
}