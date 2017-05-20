module Common.Tabs {

    export interface ITabsController {
        getTabs(): ITab[];
        addTab(tab: ITab): void;
        selectTab(index: number): void;
    }

    export class TabsController implements ITabsController {

        private tabs: ITab[];

        constructor() {
            this.tabs = [];
        }

        getTabs(): ITab[] {
            return this.tabs;
        }

        addTab(tab: ITab): void {
            this.tabs.push(tab);
        }

        selectTab(index: number): void {
            for (let tab of this.tabs) {
                tab.selected = false;
            }
            this.tabs[index].selected = true;
        }
    }
}