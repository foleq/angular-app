module App.Controllers.Tests {

    describe("ResultController", () => {

        var resultController: ResultController;

        beforeEach(() => {
            resultController = new ResultController();
        });

        it("should contain correct title", () => {
            expect(resultController.title).toBe("Hello world!");
        });
    });
}