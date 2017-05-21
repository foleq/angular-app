module App.Controllers.Tests {

    describe("ResultController", () => {

        var resultController: ResultController;
        var accordionsFromProvider: Common.Accordion.IAccordion[] = [];

        beforeEach(() => {
            var customAccordionsProvider = jasmine.createSpyObj('customAccordionsProvider', ['getAccordions']); // App.Providers.ICustomAccordionsProvider
            customAccordionsProvider.getAccordions.and.returnValue(accordionsFromProvider);
            resultController = new ResultController(customAccordionsProvider);
        });

        it("should contain correct title", () => {
            expect(resultController.title).toBe("Hello world!");
        });

        it("should contain correct accordions", () => {
            expect(resultController.accordions).toBe(accordionsFromProvider);
        });
    });
}