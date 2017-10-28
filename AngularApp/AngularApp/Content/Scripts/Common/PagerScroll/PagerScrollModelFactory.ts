module Common.PagerScroll {

    export interface IPagerScrollModelFactory {
        create(numberOfRows: number, itemsPerPage: number): IPagerScrollModel;
        hasValidPositions(pagerScrollModel: IPagerScrollModel): boolean;
    }

    export class PagerScrollModelFactory implements IPagerScrollModelFactory {
        create(numberOfRows: number, itemsPerPage: number): IPagerScrollModel {
            return {
                currentPage: 0,
                itemsPerPage: itemsPerPage,
                totalNumberOfPages: Math.ceil(numberOfRows / itemsPerPage),
                startingPosition: 0,
                endingPosition: itemsPerPage
            };
        }

        hasValidPositions(pagerScrollModel: IPagerScrollModel): boolean {
            return pagerScrollModel != null &&
                pagerScrollModel.startingPosition >= 0 &&
                pagerScrollModel.endingPosition > 0;
        }
    }
}