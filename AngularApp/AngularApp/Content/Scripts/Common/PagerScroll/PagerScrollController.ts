module Common.PagerScroll {

    export interface IPagerScrollController {
        calculateRowHeight(pagerScrollModel: IPagerScrollModel, element: JQuery): number;
        isScrollUpPossible(pagerScrollModel: IPagerScrollModel, element: JQuery): boolean;
        scrollUp(scope: IPagerScrollScope, element: JQuery, rowHeight: number): void;
        isScrollDownPossible(pagerScrollModel: IPagerScrollModel, element: JQuery): boolean;
        scrollDown(scope: IPagerScrollScope, element: JQuery, rowHeight: number): void;
    }

    export class PagerScrollController implements IPagerScrollController {

        threshold = 10;

        calculateRowHeight(pagerScrollModel: IPagerScrollModel, element: JQuery): number {
            const scrollHeight = element.prop("scrollHeight");
            const numberOfRows = pagerScrollModel.endingPosition - pagerScrollModel.startingPosition;
            if (scrollHeight > 0 && numberOfRows > 0) {
                return scrollHeight / numberOfRows;
            } else {
                return null;
            }
        }

        isScrollUpPossible(pagerScrollModel: IPagerScrollModel, element: JQuery): boolean {
            const scrollPositionFromTop = element.scrollTop();
            return scrollPositionFromTop != null
                && scrollPositionFromTop < this.threshold
                && pagerScrollModel.currentPage > 0;
        }

        scrollUp(scope: IPagerScrollScope, element: JQuery, rowHeight: number): void {
            scope.pagerScroll.startingPosition = scope.pagerScroll.itemsPerPage * scope.pagerScroll.currentPage - 1.5 * scope.pagerScroll.itemsPerPage;
            if (scope.pagerScroll.startingPosition < 0) {
                scope.pagerScroll.startingPosition = 0;
            }
            scope.pagerScroll.endingPosition = scope.pagerScroll.startingPosition + scope.pagerScroll.itemsPerPage;
            if (scope.pagerScroll.startingPosition !== 0) {
                scope.pagerScroll.endingPosition += this.getAdditionalNumberOfItemsOnPage(scope);
            }
            scope.pagerScroll.currentPage--;
            this.reloadDirective(scope);

            if (scope.pagerScroll.startingPosition !== 0) {
                element.scrollTop(rowHeight * scope.pagerScroll.itemsPerPage);
            } else {
                element.scrollTop(rowHeight * this.getAdditionalNumberOfItemsOnPage(scope));
            }
        }

        isScrollDownPossible(pagerScrollModel: IPagerScrollModel, element: JQuery): boolean {
            return element.scrollTop() + element.height() >= element.prop("scrollHeight")
                && pagerScrollModel.currentPage + 1 < pagerScrollModel.totalNumberOfPages;
        }

        scrollDown(scope: IPagerScrollScope, element: JQuery, rowHeight: number): void {
            scope.pagerScroll.currentPage++;
            scope.pagerScroll.startingPosition = scope.pagerScroll.itemsPerPage * scope.pagerScroll.currentPage
                - this.getAdditionalNumberOfItemsOnPage(scope);
            scope.pagerScroll.endingPosition = scope.pagerScroll.itemsPerPage * scope.pagerScroll.currentPage
                + scope.pagerScroll.itemsPerPage;
            this.reloadDirective(scope);

            if (scope.pagerScroll.currentPage < scope.pagerScroll.totalNumberOfPages) {
                element.scrollTop(rowHeight * this.getAdditionalNumberOfItemsOnPage(scope));
            }
        }

        private getAdditionalNumberOfItemsOnPage(scope: IPagerScrollScope): number {
            return 0.5 * scope.pagerScroll.itemsPerPage;
        }

        private reloadDirective(scope: IPagerScrollScope) {
            scope.$apply();
        }
    }
}