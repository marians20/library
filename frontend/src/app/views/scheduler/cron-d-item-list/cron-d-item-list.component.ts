import {
  Component,
  OnInit,
  forwardRef,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { CronDModel } from 'src/app/model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as Lodash from 'lodash';
import { Guid } from 'guid-typescript';


@Component({
  selector: 'ctrl-cron-d-item-list',
  templateUrl: './cron-d-item-list.component.html',
  styleUrls: ['./cron-d-item-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CronDItemListComponent),
      multi: true,
    }
  ]
})
export class CronDItemListComponent implements OnInit, ControlValueAccessor {

  @Input()
  get value(): CronDModel[] {
    return this._value;
  }
  set value(val: CronDModel[]) {
    this._value = Lodash.cloneDeep(val);
    this.onChange(this._value);
  }

  @Input() disabled: boolean = false;

  @Output() save: EventEmitter<Array<CronDModel>> = new EventEmitter();
  private _value: CronDModel[] = [];

  public onTouched: any = (_) => {};
  public onChange: any = (_) => {};
  constructor() { }

  ngOnInit() {
  }

  public addItem() {
    this.value.push(new CronDModel());
    this.onChange(this._value);
  }

  public saveItem() {
    this.save.emit(this._value);
  }

  public removeItem(id: Guid) {
    console.log(`${id} canceled`);
    const tmpValue = this._value.filter((item) => item.Id !== id);
    this._value = [];
    this._value = tmpValue;
    this.onChange(this._value);
  }

  writeValue(obj: any): void {
    if (obj === null) {
      return;
    }

    this.value = obj;
  }

  public itemChanged(item: CronDModel) {
    console.log(`item ${item.Id} has been changed.`);
    const element = this._value.find((i) => i.Id === item.Id);
    element.Second = item.Second;
    element.Minute = item.Minute;
    element.Hour = item.Hour;
    element.WeekDay = item.WeekDay;
    element.MonthDay = item.MonthDay;
    element.Month = item.Month;
    element.Year = item.Year;
    this.onChange(this._value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
