import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiClient } from 'src/app/shared';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { interval } from 'rxjs';

@Component({
  selector: 'ctrl-temperature-widget',
  templateUrl: './temperature-widget.component.html',
  styleUrls: ['./temperature-widget.component.scss']
})
export class TemperatureWidgetComponent implements OnInit {

  @Input() autorefresh: boolean = true;
  @Input() refreshInterval: number = 5000;

  @Output() click: EventEmitter<any> = new EventEmitter();
  public temperature: number;
  public time: string;

  constructor(public apiClient: ApiClient) { }

  ngOnInit() {
    this.getTemperature();
    if (!this.autorefresh) {
      return;
    }

    interval(this.refreshInterval).subscribe(x => {
      this.getTemperature();
    });
  }

  public get thermometerClass(): string {
    if (this.temperature < 19) {
      return 'fa fa-thermometer-empty';
    }
    if (this.temperature < 20) {
      return 'fa fa-thermometer-quarter';
    }
    if (this.temperature < 22) {
      return 'fa fa-thermometer-half';
    }
    if (this.temperature < 24) {
      return 'fa fa-thermometer-three-quarters';
    }
    return 'fa fa-thermometer-full';
  }

  private getTemperature() {
    const dhtUrl = `${environment.apiUrl}/dht/`;
    this.apiClient.get(dhtUrl).subscribe(response => {
      this.temperature = response['temperature'];
      this.time = moment(response['time']).format('HH:mm');
    });
  }

  public onClick(event) {
    event.preventDefault();
    this.click.emit({
      time: this.time,
      temperature: this.temperature
    });
    return false;
  }

}
