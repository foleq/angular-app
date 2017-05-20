module Common.Tabs.Tests {

    describe("TabsDirective", () => {
        var directiveElem;
        var tabsDirective = {
            name: "tabs",
            factory: Tabs.TabsDirective.instance,
            instance: Tabs.TabsDirective.instance()
        };
        var tabDirective = {
            name: "tab",
            factory: Tabs.TabDirective.instance,
            instance: Tabs.TabDirective.instance()
        };

        beforeEach(() => {
            var directives: DirectiveTests.IAngularDirective[] = [];
            directives.push(tabsDirective);
            directives.push(tabDirective);
            var directiveTestsHelper = new DirectiveTests.AngularDirectiveTest("DirectivesTests", directives);

            directiveElem = directiveTestsHelper.getCompiledElement(`
                <tabs>
                    <tab label='Tab 1'>Tab 1 contents!</tab>
                    <tab label='Tab 2'>Tab 2 contents!</tab>
                </tabs>
            `);
        });

        it("should have correct tabs", function () {
            var tabsList = directiveElem.find(".tabs-list > li > a");
            expect(tabsList).toBeDefined();
            expect(tabsList.length).toBe(2);
            expect(tabsList[0].text).toEqual("Tab 1");
            expect(tabsList[1].text).toEqual("Tab 2");
        });

        it("should restrict to element", () => {
            expect(tabsDirective.instance.restrict).toBe("E");
        });
    });
}