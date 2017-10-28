module Common.PagerScroll.Tests {
    describe("PagerScrollModelFactory", () => {

        var sut: IPagerScrollModelFactory;

        beforeEach(() => {
            sut = new PagerScrollModelFactory();
        });

        describe("when creating pagerScrollModel", () => {
            
            var createdPagerScrollModel: IPagerScrollModel;           

            beforeEach(() => {
                createdPagerScrollModel = sut.create(100, 9);
            });

            it("should have current page as first page", () => {
                expect(createdPagerScrollModel.currentPage).toBe(0);
            });

            it("should have proper items per page", () => {
                expect(createdPagerScrollModel.itemsPerPage).toBe(9);
            });

            it("should have proper total number of pages", () => {
                expect(createdPagerScrollModel.totalNumberOfPages).toBe(12);
            });

            it("should start from 0", () => {
                expect(createdPagerScrollModel.startingPosition).toBe(0);
            });

            it("should ends on number of items per page", () => {
                expect(createdPagerScrollModel.endingPosition).toBe(9);
            });
        });

        describe("when checking if model has valid positions", () => {
            
            it("should be false for null", () => {
                expect(sut.hasValidPositions(null)).toBeFalsy();
            });

            it("should be false for starting position equals -1", () => {
                expect(sut.hasValidPositions({
                    currentPage: 1,
                    startingPosition: -1,
                    endingPosition: 1,
                    itemsPerPage: 10,
                    totalNumberOfPages: 20
                })).toBeFalsy();
            });

            it("should be false for ending position equals 0", () => {
                expect(sut.hasValidPositions({
                    currentPage: 1,
                    startingPosition: 0,
                    endingPosition: 0,
                    itemsPerPage: 10,
                    totalNumberOfPages: 20
                })).toBeFalsy();
            });

            it("should be true for starting position >= 0 and ending position > 0", () => {
                expect(sut.hasValidPositions({
                    currentPage: 1,
                    startingPosition: 0,
                    endingPosition: 10,
                    itemsPerPage: 10,
                    totalNumberOfPages: 20
                })).toBeTruthy();
            });
        });
    });
}