export class LookupData {
    constructor(
        public items: Array<object> = [],
        public keyField: string = 'id',
        public displayField: string = 'name'
    ) {}
}
