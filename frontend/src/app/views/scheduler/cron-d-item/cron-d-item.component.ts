import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { CronDModel } from 'src/app/model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as Lodash from 'lodash';
import { Guid } from 'guid-typescript';

let nextId = 0;

@Component({
  selector: 'ctrl-cron-d-item',
  templateUrl: './cron-d-item.component.html',
  styleUrls: ['./cron-d-item.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CronDItemComponent),
      multi: true,
    }
  ]
})
export class CronDItemComponent implements OnInit, ControlValueAccessor {

  @Input() id: string = `crond-${++nextId}`;
  @Input() disabled = false;
  @Input('value')
  get value(): CronDModel {
    return this.getData();
  }
  set value(newVal: CronDModel) {
    this.Id = newVal.Id;
    this.formGroup = this.CreateFormGroup(newVal);
    this.onChange(newVal);
  }

  @Output() cancel: EventEmitter<Guid> = new EventEmitter<Guid>();

  private Id: Guid;
  private _initialValue: CronDModel = new CronDModel();

  public formGroup: FormGroup;

  public onTouched: any = (_) => {};
  public onChange: any = (_) => {};

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.CreateFormGroup(this._initialValue);
  }

  public reset() {
    this.formGroup = this.CreateFormGroup(this._initialValue);
    this.onChange(this._initialValue);
    this.cancel.emit(this.Id);
  }

  writeValue(obj: any): void {
    if (obj === null) {
      return;
    }
    this.Id = obj.Id;
    this.formGroup = this.CreateFormGroup(obj);
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

  onSubmit() {
    this.onChange(this.getData());
    console.log('Submitted.');
  }

  private CreateFormGroup(val: CronDModel) {
    const secondOrMinutePattern = /^(\*|([0-5][0-9]|[0-9]))$/;
    const secondOrMinutePatternExclusive = /^([0-5][0-9]|[0-9])$/;
    const hourPattern = /^(\*|([01]?[0-9]|2[0-3]))$/;
    const hourPatternExclusive = /^([01]?[0-9]|2[0-3])$/;
    const weekDayPattern = /^(\*|(0?[1-7]))$/;
    const monthDayPattern = /^(\*|(0?[1-9]|[12]\d|3[01]))$/;
    const yearPattern = /^(\*|((19[0-9]{2})|(2[0-9][0-9]{2})))$/;
    const formGroup = this.fb.group({
      Second: [val.Second, [Validators.required, Validators.pattern(secondOrMinutePattern)]],
      Minute: [val.Minute, [Validators.required, Validators.pattern(secondOrMinutePattern)]],
      Hour: [val.Hour, [Validators.required, Validators.pattern(hourPattern)]],
      WeekDay: [val.WeekDay, [Validators.required, Validators.pattern(weekDayPattern)]],
      MonthDay: [val.MonthDay, [Validators.required, Validators.pattern(monthDayPattern)]],
      Month: [val.Month, Validators.required],
      Year: [val.Year, [Validators.required, Validators.pattern(yearPattern)]],
      DurationSeconds: [val.DurationSeconds, [Validators.required, Validators.pattern(secondOrMinutePatternExclusive)]],
      DurationMinutes: [val.DurationMinutes, [Validators.required, Validators.pattern(secondOrMinutePatternExclusive)]],
      DurationHours: [val.DurationHours, [Validators.required, Validators.pattern(hourPatternExclusive)]],
    });
    return formGroup;
  }

  private getData(): CronDModel {
    const result: CronDModel = this.formGroup.value;
    result.Id = this.Id;
    return result;
  }
}
