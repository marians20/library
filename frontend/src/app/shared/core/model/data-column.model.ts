import { LookupData } from './lookup-data.model';
import { FieldTypes } from './field-type.model';

export class DataColumn {
    constructor(
        public fieldName: string = '',
        public label: string = '',
        public dataType: FieldTypes = FieldTypes.String,
        public lookupData: LookupData = new LookupData(),
        public required: boolean = false,
        public allowSorting: boolean = true,
        public readOnly = false,
        public visible = true
    ) {
        if (this.dataType === FieldTypes.Array) {
            this.allowSorting = false;
        }
    }
}
