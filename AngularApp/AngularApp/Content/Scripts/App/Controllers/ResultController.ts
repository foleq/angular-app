module App.Controllers {

    export class ResultController {

        public title: string;
        public accordions: Common.Accordion.IAccordion[];

        constructor(private customAccordionsProvider: App.Providers.ICustomAccordionsProvider) {
            this.title = "Hello world!";
            this.accordions = this.customAccordionsProvider.getAccordions();
        }
    }
}