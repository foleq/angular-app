module Common.Tabs.Tests {

    describe("TabsDirective", () => {
        var tabsDirective: ng.IDirective;

        beforeEach(() => {
            tabsDirective = TabsDirective.instance();
        });

        it("should restrict to element", () => {
            expect(tabsDirective.restrict).toBe("E");
        });
    });
}