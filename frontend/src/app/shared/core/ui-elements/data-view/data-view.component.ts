import { Component, Input, OnInit } from '@angular/core';
import { DataCell, FieldTypes, LookupData } from '../../model';
import * as moment from 'moment';
import { DateUtils } from '../../../classes';

@Component({
    selector: 'ccpv-data-view',
    templateUrl: './data-view.component.html',
    styleUrls: ['./data-view.component.scss']
})
export class DataViewComponent implements OnInit {
    FieldTypes = FieldTypes;
    displayValue = '';
    cell: DataCell;
    lookupError = false;

    @Input('value')
    set value(val: any) {
        this._value = val;
    }
    get value(): any {
        return this._value;
    }
    private _value: any;

    @Input('dataType')
    set dataType(value: FieldTypes) {
        this._dataType = value;
    }
    get dataType(): FieldTypes {
        return this._dataType;
    }
    private _dataType: FieldTypes;

    @Input('lookupData')
    set lookupData(value: LookupData) {
        this._lookupData = value;
    }
    get lookupData(): LookupData {
        return this._lookupData;
    }
    private _lookupData: LookupData = new LookupData();

    @Input('id')
    set id(value: string) {
        this._id = value;
    }
    get id(): string {
        return this._id;
    }
    private _id: string;

    constructor() {}

    ngOnInit(): void {
        this.matchLookupData();
    }

    public matchLookupData() {
        if (this.dataType === FieldTypes.Array) {
            this.lookupError = false;
            try {
                this.displayValue = this.lookupData.items
                .find(i => i[this.lookupData.keyField] === this.value)[this.lookupData.displayField];
            } catch (err) {
                this.displayValue = this.value;
                this.lookupError = true;
            }
        } else if (this.dataType === FieldTypes.Date) {
            this.displayValue = DateUtils.formatDate(this.value);
        } else {
            this.displayValue = this.value;
        }
    }
}
