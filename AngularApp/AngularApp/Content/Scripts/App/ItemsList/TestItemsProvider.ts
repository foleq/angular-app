module App.ItemsList {

    export interface IItem {
        id: number;
        name: string;
        isCheckable: boolean;
    }

    export interface IItemsProvider {
        getItems(): IItem[];
    }

    export class TestItemsProvider implements IItemsProvider {

        private numberOfItems = 1000;

        public getItems(): IItem[] {
            var items: IItem[] = [];
            for (var i = 0; i < this.numberOfItems; i++) {
                items.push({
                    id: i,
                    name: "Item with id " + i,
                    isCheckable: i % 2 == 0
                });
            }
            return items;
        }
    }
}