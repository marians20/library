import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';

import * as moment from 'moment';
import * as Lodash from 'lodash';

import { LookupData, FieldTypes } from '../../model';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

let nextId = 0;

@Component({
    selector: 'ccpv-data-input',
    templateUrl: './data-input.component.html',
    styleUrls: ['./data-input.component.scss'],
    providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => DataInputComponent),
          multi: true,
        }
      ]
})
export class DataInputComponent implements OnInit, ControlValueAccessor {

    FieldTypes = FieldTypes;

    @Input() dataType: FieldTypes = FieldTypes.String;
    @Input()
    set value(obj: any) {
        this._value = Lodash.cloneDeep(obj);
        this.onChange(this._value);
    }

    get value(): any {
        return this._value;
    }

    @Input() lookupData: LookupData = new LookupData();
    @Input() id: string = `input-${++nextId}`;
    @Input() name: string = this.id;
    @Input() isReadOnly: boolean = false;

    @Output() valueChange = new EventEmitter<any>();

    private _value: any;

    public onChange = (_) => {};
    public onTouched = (_) => {};

    constructor() {
    }

    ngOnInit(): void {
    }

    public valueChanged(event) {
        this.valueChange.emit(event);
    }

    writeValue(obj: any): void {
        this.value = obj;
    }

    registerOnChange(fn: any): void {
        if (fn === undefined) {
            return;
        }

        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        if (fn === undefined) {
            return;
        }

        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.isReadOnly = isDisabled;
    }
}
