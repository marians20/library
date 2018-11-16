import {FieldTypes} from './field-type.model';
import {LookupData} from './lookup-data.model';
import {DataColumn} from './data-column.model';

export class DataCell extends DataColumn {
    constructor(dataColumn: DataColumn,
        public value: object) {
        super(dataColumn.fieldName, dataColumn.label, dataColumn.dataType, dataColumn.lookupData);
    }

    get displayValue(): any {
        if (this.dataType === FieldTypes.Array) {
            return this.lookupData.items
                .find(i => i[this.lookupData.keyField] === this.value)[this.lookupData.displayField];

        } else {
            return this.value;
        }
    }
}
