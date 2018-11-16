import { Component, OnInit } from '@angular/core';
import { Relay, Relays } from 'src/app/model';
import { ApiClient } from 'src/app/shared';
import { SpinnerOverlayService } from 'src/app/shared/core/ui-elements/spinner-overlay/spinner-overlay.service';
import { environment } from 'src/environments/environment';
import { DataColumn, FieldTypes } from 'src/app/shared/core/model';

@Component({
  selector: 'ctrl-relays-crud',
  templateUrl: './relays-crud.component.html',
  styleUrls: ['./relays-crud.component.scss']
})
export class RelaysCrudComponent implements OnInit {
  public title: string = 'Relays';
  public apiUrl: string = `${environment.apiUrl}/gpio/relays/`;
  public columns: DataColumn[] = [];
  public relays: Relays = [];
  constructor(
    public api: ApiClient,
    public spinnerService: SpinnerOverlayService) {
      this.api.apiUrl = this.apiUrl;
      this.columns = [
        {
          label: 'Name',
          fieldName: 'name',
          allowSorting: true,
          dataType: FieldTypes.String,
          lookupData: null,
          required: false,
          readOnly: false,
          visible: true,
        },
        {
          label: 'Pin',
          fieldName: 'pin',
          allowSorting: true,
          dataType: FieldTypes.Number,
          lookupData: null,
          required: false,
          readOnly: false,
          visible: true,
        },
      ];
  }

  ngOnInit() {
    this.getRelays();
  }

  public getRelays() {
    this.spinnerService.show();
    this.api.get(this.apiUrl).subscribe((response: Relays) => {
      this.relays = response;
    },
    (error) => {},
    () => {
      this.spinnerService.hide();
    });
  }

  public onCreate(data: any) {
    if (data === null || data === undefined) {
      return;
    }

    const modal = data.modal;
    const value: Relay = {
      id: null,
      name: data.value.name,
      pin: data.value.pin,
      value: 0
    };

    this.spinnerService.show();
    this.api.post(this.apiUrl, value)
    .subscribe((response) => {
      this.getRelays();
      if (modal !== undefined) {
        modal.close();
      }
    },
    (error) => {
      this.spinnerService.hide();
    },
    () => {
      this.spinnerService.hide();
    });
  }

  public onEdit(data: any) {
    if (data === null || data === undefined) {
      return;
    }

    const modal = data.modal;
    const value = data.value;
    this.spinnerService.show();
    this.api.put(this.apiUrl, value)
    .subscribe((response) => {
      this.getRelays();
      if (modal !== undefined) {
        modal.close();
      }
    },
    (error) => {
      this.spinnerService.hide();
    },
    () => {
      this.spinnerService.hide();
    });
  }

  public onDelete(relayId) {
    const relay = this.relays.find(x => x.id === relayId);
    if (!confirm(`Are you sure you want to delete ${relay.name}?`)) {
      return;
    }

    this.spinnerService.show();
    this.api.delete(`${this.apiUrl}${relayId}/`)
    .subscribe((response) => {
      this.getRelays();
    },
    (error) => {
      this.spinnerService.hide();
    },
    () => {
      this.spinnerService.hide();
    });
  }

  public showDetails(relay) {
    console.log('Show Details');
    console.log(relay);
  }

}
