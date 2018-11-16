import { ApiClient } from './../../../shared/services/api-client.service';
import { LoggingService } from '../../../shared';
import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { Relay } from '../../../model';
import { environment } from '../../../../environments/environment';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as lodash from 'lodash';
let nextId = 0;

@Component({
  selector: 'ctrl-controll-relay',
  templateUrl: './controll-relay.component.html',
  styleUrls: ['./controll-relay.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ControllRelayComponent),
    multi: true
  }]
})
export class ControllRelayComponent implements OnInit, ControlValueAccessor {

  private apiUrl = `${environment.apiUrl}/gpio/relays`;

  @Input() id: string = `relay-${++nextId}`;

  set relay(value: Relay) {
    if (value === undefined) {
      return;
    }
    this._relay = value;
    this.onChangeFnc(this._relay);
  }
  get relay(): Relay {
    return this._relay || new Relay();
  }

  private _relay: Relay = new Relay();

  @Input() isDisabled: boolean = false;

  @Output() setValue: EventEmitter<boolean> = new EventEmitter();

  public onChangeFnc = (_: Relay) => {};
  public onTouchedFnc = (_: any) => {};

  constructor(
    private logger: LoggingService,
    private api: ApiClient
  ) { }

  ngOnInit() {
  }

  public turnOn(relay: Relay) {
    this.setRelayStatus(relay, 1);
  }

  public turnOff(relay: Relay) {
    this.setRelayStatus(relay, 0);
  }

  private setRelayStatus(relay: Relay, status: number) {
    if (this._relay.value === status) {
      return;
    }
    this._relay.value = status;
    this.onChangeFnc(this._relay);
    const url = `${this.apiUrl}/${relay.id}`;
    this.api.patch(url, {value: status})
      .subscribe((response) => {
        this.logger.debug(response);
      });
  }

  writeValue(obj: Relay): void {
    if (obj === undefined) {
      return;
    }

    this.relay = lodash.cloneDeep(obj);
  }
  registerOnChange(fn: any): void {
    this.onChangeFnc = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedFnc = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
