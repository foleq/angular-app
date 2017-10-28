module Common.PagerScroll.Tests {
    describe("PagerScrollController", () => {

        var sut: IPagerScrollController;
        var createJQueryElement = (scrollHeightValue: number, scrollTopValue?: number, heightValue?: number): any => {
            return {
                prop: (propertyName: string) => {
                    if (propertyName === "scrollHeight") {
                        return scrollHeightValue;
                    }
                    return null;
                },
                scrollTop: () => {
                    return scrollTopValue;
                },
                height: () => {
                    return heightValue;
                }
            };
        };
        var createPagerScrollModel = (currentPage: number, itemsPerPage: number, totalNumberOfPages: number, startingPosition: number, endingPosition: number): IPagerScrollModel => {
            return {
                currentPage: currentPage,
                itemsPerPage: itemsPerPage,
                totalNumberOfPages: totalNumberOfPages,
                startingPosition: startingPosition,
                endingPosition: endingPosition
            };
        };
        var createPagerScrollScope = (pagerScrollModel: IPagerScrollModel): IPagerScrollScope => {
            var scope = {
                pagerScroll: pagerScrollModel,
                $apply: () => {}
            };
            spyOn(scope, "$apply");
            return scope;
        };

        beforeEach(() => {
            sut = new PagerScrollController();
        });

        describe("when calculating row height", () => {

            var calculatedRowHeight: number;
            
            describe("with proper positions", () => {
                
                beforeEach(() => {
                    calculatedRowHeight = sut.calculateRowHeight(createPagerScrollModel(null, null, null, 10, 20), createJQueryElement(15));
                });

                it("should return proper row height", () => {
                    expect(calculatedRowHeight).toBe(1.5);
                });
            });

            describe("with null positions", () => {
                
                beforeEach(() => {
                    calculatedRowHeight = sut.calculateRowHeight(createPagerScrollModel(null, null, null, null, null), createJQueryElement(15));
                });

                it("should return null", () => {
                    expect(calculatedRowHeight).toBeNull();
                });
            });

            describe("with null scroll height", () => {
                
                beforeEach(() => {
                    calculatedRowHeight = sut.calculateRowHeight(createPagerScrollModel(null, null, null, 10, 20), createJQueryElement(null));
                });

                it("should return null", () => {
                    expect(calculatedRowHeight).toBeNull();
                });
            });

            describe("with start position equals end position", () => {
                
                beforeEach(() => {
                    calculatedRowHeight = sut.calculateRowHeight(createPagerScrollModel(null, null, null, 10, 10), createJQueryElement(15));
                });

                it("should return null", () => {
                    expect(calculatedRowHeight).toBeNull();
                });
            });

            describe("with start position greater than end position", () => {
                
                beforeEach(() => {
                    calculatedRowHeight = sut.calculateRowHeight(createPagerScrollModel(null, null, null, 20, 10), createJQueryElement(15));
                });

                it("should return null", () => {
                    expect(calculatedRowHeight).toBeNull();
                });
            });
        });

        describe("when checking if scroll up is possible", () => {

            var isScrollUpPossible: boolean;

            describe("with scroll position from top is null", () => {

                beforeEach(() => {
                    isScrollUpPossible = sut.isScrollUpPossible(createPagerScrollModel(10, null, null, null, null), createJQueryElement(null, null));
                });

                it("should NOT be possible", () => {
                    expect(isScrollUpPossible).toBeFalsy();
                });
            });

            describe("with scroll position from top greather or equal 10", () => {

                beforeEach(() => {
                    isScrollUpPossible = sut.isScrollUpPossible(createPagerScrollModel(10, null, null, null, null), createJQueryElement(null, 10));
                });

                it("should NOT be possible", () => {
                    expect(isScrollUpPossible).toBeFalsy();
                });
            });

            describe("with current page set to first", () => {

                beforeEach(() => {
                    isScrollUpPossible = sut.isScrollUpPossible(createPagerScrollModel(0, null, null, null, null), createJQueryElement(null, 9));
                });

                it("should NOT be possible", () => {
                    expect(isScrollUpPossible).toBeFalsy();
                });
            });

            describe("with current page greater than 0 and scroll position from top less than 10", () => {

                beforeEach(() => {
                    isScrollUpPossible = sut.isScrollUpPossible(createPagerScrollModel(1, null, null, null, null), createJQueryElement(null, 9));
                });

                it("should be possible", () => {
                    expect(isScrollUpPossible).toBeTruthy();
                });
            });
        });

        describe("when scrolling up", () => {

            var scope: IPagerScrollScope;
            var element: JQuery;

            beforeEach(() => {
                
                element = jasmine.createSpyObj("element", ["scrollTop"]);
            });

            describe("from second page", () => {

                beforeEach(() => {
                    scope = createPagerScrollScope(createPagerScrollModel(1, 20, 5, null, null));
                    sut.scrollUp(scope, element, 10);
                });

                it("should have been moved to first page", () => {
                    expect(scope.pagerScroll.currentPage).toBe(0);
                });

                it("should have proper starting position", () => {
                    expect(scope.pagerScroll.startingPosition).toBe(0);
                });

                it("should have proper ending position", () => {
                    expect(scope.pagerScroll.endingPosition).toBe(20);
                });

                it("should have move scroll to half of number of items per page from top", () => {
                    expect(element.scrollTop).toHaveBeenCalledWith(0.5 * 20 * 10);
                });

                it("should reload scope", () => {
                    expect(scope.$apply).toHaveBeenCalledWith();
                });
            });

            describe("from third page", () => {

                beforeEach(() => {
                    scope = createPagerScrollScope(createPagerScrollModel(2, 20, 5, null, null));
                    sut.scrollUp(scope, element, 10);
                });

                it("should have been moved to second page", () => {
                    expect(scope.pagerScroll.currentPage).toBe(1);
                });

                it("should have proper starting position(set to half of items on first page)", () => {
                    expect(scope.pagerScroll.startingPosition).toBe(10);
                });

                it("should have proper ending position", () => {
                    expect(scope.pagerScroll.endingPosition).toBe(40);
                });

                it("should have move scroll to number of items per page from top", () => {
                    expect(element.scrollTop).toHaveBeenCalledWith(20 * 10);
                });

                it("should reload scope", () => {
                    expect(scope.$apply).toHaveBeenCalledWith();
                });
            });
        });

        describe("when checking if scroll down is possible", () => {

            var isScrollDownPossible: boolean;

            describe("with element properties are set to null", () => {

                beforeEach(() => {
                    isScrollDownPossible = sut.isScrollDownPossible(createPagerScrollModel(10, null, null, null, null), createJQueryElement(null, null, null));
                });

                it("should NOT be possible", () => {
                    expect(isScrollDownPossible).toBeFalsy();
                });
            });

            describe("with current page is set to 4th page from 5 pages and scroll have NOT reached bottom yet", () => {

                beforeEach(() => {
                    isScrollDownPossible = sut.isScrollDownPossible(createPagerScrollModel(3, 10, 5, null, null), createJQueryElement(500, 350, 100));
                });

                it("should NOT be possible", () => {
                    expect(isScrollDownPossible).toBeFalsy();
                });
            });

            describe("with current page is set to last page", () => {

                beforeEach(() => {
                    isScrollDownPossible = sut.isScrollDownPossible(createPagerScrollModel(4, 10, 5, null, null), createJQueryElement(500, 450, 100));
                });

                it("should NOT be possible", () => {
                    expect(isScrollDownPossible).toBeFalsy();
                });
            });

            describe("with current page is set to 4th page from 5 pages and scroll have reached bottom", () => {

                beforeEach(() => {
                    isScrollDownPossible = sut.isScrollDownPossible(createPagerScrollModel(3, 10, 5, null, null), createJQueryElement(500, 450, 100));
                });

                it("should be possible", () => {
                    expect(isScrollDownPossible).toBeTruthy();
                });
            });
        });

        describe("when scrolling down", () => {

            var scope: IPagerScrollScope;
            var element: JQuery;

            beforeEach(() => {
                element = jasmine.createSpyObj("element", ["scrollTop"]);
            });

            describe("from penultimate page", () => {

                beforeEach(() => {
                    scope = createPagerScrollScope(createPagerScrollModel(3, 20, 5, null, null));
                    sut.scrollDown(scope, element, 10);
                });

                it("should have been moved to last page", () => {
                    expect(scope.pagerScroll.currentPage).toBe(4);
                });

                it("should have proper starting position", () => {
                    expect(scope.pagerScroll.startingPosition).toBe(20*4 - 0.5*20); // items_per_page*current_page - 0.5*items_per_page
                });

                it("should have proper ending position", () => {
                    expect(scope.pagerScroll.endingPosition).toBe(20*5);
                });

                it("should have move scroll to half of number of items per page from top", () => {
                    expect(element.scrollTop).toHaveBeenCalledWith(0.5*20*10); // 0.5*item_per_page*row_height
                });

                it("should reload scope", () => {
                    expect(scope.$apply).toHaveBeenCalledWith();
                });
            });

            describe("from first page", () => {

                beforeEach(() => {
                    scope = createPagerScrollScope(createPagerScrollModel(0, 20, 5, null, null));
                    sut.scrollDown(scope, element, 10);
                });

                it("should have been moved to second page", () => {
                    expect(scope.pagerScroll.currentPage).toBe(1);
                });

                it("should have proper starting position", () => {
                    expect(scope.pagerScroll.startingPosition).toBe(20 * 1 - 0.5 * 20); // items_per_page*current_page - 0.5*items_per_page
                });

                it("should have proper ending position", () => {
                    expect(scope.pagerScroll.endingPosition).toBe(20 * 2);
                });

                it("should have move scroll to half of number of items per page from top", () => {
                    expect(element.scrollTop).toHaveBeenCalledWith(0.5 * 20 * 10); // 0.5*item_per_page*row_height
                });

                it("should reload scope", () => {
                    expect(scope.$apply).toHaveBeenCalledWith();
                });
            });

            describe("from penultimate page", () => {

                beforeEach(() => {
                    scope = createPagerScrollScope(createPagerScrollModel(3, 20, 5, null, null));
                    sut.scrollDown(scope, element, 10);
                });

                it("should have been moved to last page", () => {
                    expect(scope.pagerScroll.currentPage).toBe(4);
                });

                it("should have proper starting position", () => {
                    expect(scope.pagerScroll.startingPosition).toBe(20 * 4 - 0.5 * 20); // items_per_page*current_page - 0.5*items_per_page
                });

                it("should have proper ending position", () => {
                    expect(scope.pagerScroll.endingPosition).toBe(20 * 5);
                });

                it("should have move scroll to half of number of items per page from top", () => {
                    expect(element.scrollTop).toHaveBeenCalledWith(0.5 * 20 * 10); // 0.5*item_per_page*row_height
                });

                it("should reload scope", () => {
                    expect(scope.$apply).toHaveBeenCalledWith();
                });
            });
        });
    });
}