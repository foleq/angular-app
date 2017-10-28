module App.ItemsList {

    export class ItemsListDirective implements ng.IDirective {

        constructor() {
            var directive: ng.IDirective = {
                restrict: "E",
                scope: {
                },
                controller: ItemsListController,
                controllerAs: "ctrl",
                template: `
                    <div pager-scroll="ctrl.pagerScrollModel" style="width: 300px; height: 400px; overflow-y: scroll">
                        <ul>
                            <li ng-repeat="item in ctrl.getItems()">
                                <input type="checkbox" ng-disabled="item.isCheckable" />
                                #{{item.id}} - {{item.name}}
                            </li>
                        </ul>
                    </div>
                `
            };
            return directive;
        }

        static instance(): ng.IDirective {
            return new ItemsListDirective();
        }
    }

    export class ItemsListController {

        private numberOfItemsPerPage = 50;
        private items: IItem[];
        pagerScrollModel: Common.PagerScroll.IPagerScrollModel;

        constructor(itemsProvider: IItemsProvider,
            private pagerScrollModelFactory: Common.PagerScroll.IPagerScrollModelFactory) {

            this.items = itemsProvider.getItems();
            this.pagerScrollModel = pagerScrollModelFactory.create(this.items.length, this.numberOfItemsPerPage);
        }

        getItems(): IItem[] {
            if (this.pagerScrollModelFactory.hasValidPositions(this.pagerScrollModel)) {
                return this.items.slice(this.pagerScrollModel.startingPosition, this.pagerScrollModel.endingPosition);
            } else {
                return this.items;
            }
        }
    }
}