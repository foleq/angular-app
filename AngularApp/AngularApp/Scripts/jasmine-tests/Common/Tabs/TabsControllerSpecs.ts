module Common.Tabs.Tests {

    describe("TabsController", () => {

        var tabsController: ITabsController;
        var tab1: ITab = {
            label: "tab_1",
            selected: true
        };
        var tab2: ITab = {
            label: "tab_2",
            selected: false
        };

        beforeEach(() => {
            tabsController = new TabsController();
        });

        it("should contain empty tabs", () => {
            expect(tabsController.getTabs().length).toBe(0);
        });

        describe("when adding two tabs", () => {
            beforeEach(() => {
                tabsController.addTab(tab1);
                tabsController.addTab(tab2);
            });

            it("should contain two tabs", () => {
                expect(tabsController.getTabs().length).toBe(2);
            });

            it("should contain correct first tab", () => {
                expect(tabsController.getTabs()[0]).toBe(tab1);
            });

            it("should contain correct second tab", () => {
                expect(tabsController.getTabs()[1]).toBe(tab2);
            });
        });

        describe("when selecting second tab", () => {
            beforeEach(() => {
                tabsController.addTab(tab1);
                tabsController.addTab(tab2);
                tabsController.selectTab(1);
            });

            it("should has first tab NOT selected", () => {
                expect(tabsController.getTabs()[0].selected).toBe(false);
            });

            it("should has first tab selected", () => {
                expect(tabsController.getTabs()[1].selected).toBe(true);
            });
        });
    });
}