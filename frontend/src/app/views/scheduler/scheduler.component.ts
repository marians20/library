import { Component, OnInit } from '@angular/core';
import { CronDModel, Relays, Relay, SchedulerModel } from 'src/app/model';
import { environment } from 'src/environments/environment';
import { LoggingService, ApiClient } from 'src/app/shared';
import { FieldTypes, LookupData } from 'src/app/shared/core/model';

@Component({
  selector: 'ctrl-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {

  public title: string = 'Scheduler';

  public data: SchedulerModel = new SchedulerModel(null, []);

  public FieldTypes = FieldTypes; // used in template
  public relaysLookupData = new LookupData([], 'id', 'name');
  private apiRelaysUrl: string = `${environment.apiUrl}/gpio/relays/`;

  constructor(
    private logger: LoggingService,
    private api: ApiClient
  ) { }

  ngOnInit() {
    this.getRelays();
  }

  private getRelays() {
    this.logger.debug('Getting relays...');
    this.api.get<Relays>(this.apiRelaysUrl).subscribe(response => {
      this.relaysLookupData.items = response;
      this.relaysLookupData.items.unshift({id: null, name: null});
    });
  }
  public relayChanged() {
    console.log(this.data);
  }

  public scheduleChanged() {
    console.log(this.data);
  }

  public save() {
    console.log('Saving');
    console.log(this.data);
  }
}
