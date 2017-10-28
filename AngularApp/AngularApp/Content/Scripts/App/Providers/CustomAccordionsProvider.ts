module App.Providers {

    export interface ICustomAccordionsProvider {
        getAccordions(): Common.Accordion.IAccordion[];
    }

    enum CustomAccordions {
        Dynamic1 = 1,
        Static1 = 2,
        Dynamic2 = 3,
    }

    export class CustomAccordionsProvider implements ICustomAccordionsProvider {

        getAccordions(): Common.Accordion.IAccordion[] {
            //TODO: it could be taken from server side
            var accordions: Common.Accordion.IAccordion[] = [
                {
                    Id: CustomAccordions.Dynamic1,
                    Content: "",
                    HasDynamicContent: true,
                    IsVisible: true,
                    Label: "Dynamic 1",
                    DynamicContent: "",
                },
                {
                    Id: CustomAccordions.Static1,
                    Content: "some static",
                    HasDynamicContent: false,
                    IsVisible: true,
                    Label: "Static 1",
                    DynamicContent: "",
                },
                {
                    Id: CustomAccordions.Dynamic2,
                    Content: "",
                    HasDynamicContent: true,
                    IsVisible: true,
                    Label: "Dynamic 2",
                    DynamicContent: "",
                }
            ];

            accordions.forEach(x => {
                if (x.HasDynamicContent) {
                    switch (x.Id) {
                        case CustomAccordions.Dynamic1:
                            x.DynamicContent = `
                                <tabs active="0">
                                    <tab label="Tab 1 in Accordion">
                                        Example of dynamic compiled content in accordion
                                    </tab>
                                    <tab label="Tab 2 in Accordion">
                                        Another tab in accordion
                                    </tab>
                                </tabs>
                            `;
                            break;
                        case CustomAccordions.Dynamic2:
                            x.DynamicContent = "<span style='color: red'>Some simple dynamic content</span>";
                    }
                }
            });

            return accordions;
        }
    }
}