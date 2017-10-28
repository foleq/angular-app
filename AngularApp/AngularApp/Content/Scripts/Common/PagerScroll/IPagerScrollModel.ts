module Common.PagerScroll {

    export interface IPagerScrollModel {
        currentPage: number;
        itemsPerPage: number;
        totalNumberOfPages: number;
        startingPosition: number;
        endingPosition: number;
    }
}