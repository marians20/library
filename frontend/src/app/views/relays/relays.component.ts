import { environment } from '../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { ApiClient, LoggingService } from '../../shared/services';
import { Relays, Relay } from '../../model';

@Component({
  selector: 'ctrl-relays',
  templateUrl: './relays.component.html',
  styleUrls: ['./relays.component.scss']
})
export class RelaysComponent implements OnInit {
  public title: string = 'Relays';
  private apiUrl: string = `${environment.apiUrl}/gpio/relays/`;

  public relays: Relays;

  constructor(
    private logger: LoggingService,
    public api: ApiClient) {
    }

  ngOnInit() {
    this.getData();
    interval(5000).subscribe(() => { this.getData(); });
    // this.socket.initSocket(this.apiUrl);
    // this.socket.send({Message: 'Startup'});
  }

  private getData() {
    this.logger.debug('Getting relays...');
    this.api.get<Relays>(this.apiUrl).subscribe(response => {
      this.relays = response;
      this.logger.debug(this.relays);
    });
  }

  public onRelayChanged(relay: Relay) {
    this.relays.find(x => x.id === relay.id).value = relay.value;
  }
}
