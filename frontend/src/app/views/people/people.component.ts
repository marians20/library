import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataColumn, FieldTypes } from 'src/app/shared/core/model';
import { Person } from 'src/app/model';
import { ApiClient } from 'src/app/shared';
import { SpinnerOverlayService } from 'src/app/shared/core/ui-elements/spinner-overlay/spinner-overlay.service';

@Component({
  selector: 'ctrl-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  public title: string = 'People';
  public apiUrl: string = `${environment.apiUrl}/api/v1/people/`;
  public columns: DataColumn[] = [];
  public items: Person[] = [];
  constructor(
    public api: ApiClient,
    public spinnerService: SpinnerOverlayService) {
      this.api.apiUrl = this.apiUrl;
      this.columns = [
        {
          label: 'First Name',
          fieldName: 'firstName',
          allowSorting: true,
          dataType: FieldTypes.String,
          lookupData: null,
          required: true,
          readOnly: false,
          visible: true,
        },
        {
          label: 'Last Name',
          fieldName: 'lastName',
          allowSorting: true,
          dataType: FieldTypes.String,
          lookupData: null,
          required: true,
          readOnly: false,
          visible: true,
        },
        {
          label: 'Birth Date',
          fieldName: 'birthDate',
          allowSorting: true,
          dataType: FieldTypes.Date,
          lookupData: null,
          required: true,
          readOnly: false,
          visible: true,
        },
      ];
  }

  ngOnInit() {
    this.getItems();
  }

  public getItems() {
    this.spinnerService.show();
    this.api.get(this.apiUrl).subscribe((response: Person[]) => {
      this.items = response;
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
    const value: Person = {
      _id: null,
      firstName: data.value.firstName,
      lastName: data.value.lastName,
      birthDate: data.value.birthDate
    };

    this.spinnerService.show();
    this.api.post(this.apiUrl, value)
    .subscribe((response) => {
      this.getItems();
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
      this.getItems();
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

  public onDelete(id) {
    const item = this.items.find(x => x._id === id);
    if (item === undefined) {
      return;
    }

    if (!confirm(`Are you sure you want to delete ${item.firstName} ${item.lastName}?`)) {
      return;
    }

    this.spinnerService.show();
    this.api.delete(`${this.apiUrl}${id}/`)
    .subscribe((response) => {
      this.getItems();
    },
    (error) => {
      this.spinnerService.hide();
    },
    () => {
      this.spinnerService.hide();
    });
  }

  public showDetails(item) {
    console.log('Show Details');
    console.log(item);
  }
}
