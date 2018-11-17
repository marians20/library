import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataColumn, FieldTypes } from 'src/app/shared/core/model';
import { Person } from 'src/app/model';
import { ApiClient } from 'src/app/shared';
import { SpinnerOverlayService } from 'src/app/shared/core/ui-elements/spinner-overlay/spinner-overlay.service';
import { ComponentBase } from '../component-base';

@Component({
  selector: 'ctrl-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent extends ComponentBase<Person> implements OnInit {

  constructor(
    api: ApiClient,
    spinnerService: SpinnerOverlayService) {
    super(api, `${environment.apiUrl}/api/v1/people`, spinnerService);
      this.title = 'People';
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
    this.getData();
  }
}
