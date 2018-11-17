import { Component, OnInit } from '@angular/core';
import { Producer } from 'src/app/model';
import { ComponentBase } from '../component-base';
import { SpinnerOverlayService } from 'src/app/shared/core/ui-elements/spinner-overlay/spinner-overlay.service';
import { ApiClient } from 'src/app/shared';
import { environment } from 'src/environments/environment';
import { FieldTypes } from 'src/app/shared/core/model';

@Component({
  selector: 'ctrl-producers',
  templateUrl: './producers.component.html',
  styleUrls: ['./producers.component.scss']
})
export class ProducersComponent extends ComponentBase<Producer> implements OnInit {

  constructor(
    api: ApiClient,
    spinnerService: SpinnerOverlayService) {
    super(api, `${environment.apiUrl}/api/v1/producers`, spinnerService);
    this.title = 'Producers';
    this.columns = [
      {
        label: 'Name',
        fieldName: 'name',
        allowSorting: true,
        dataType: FieldTypes.String,
        lookupData: null,
        required: true,
        readOnly: false,
        visible: true,
      },
      {
        label: 'Description',
        fieldName: 'description',
        allowSorting: true,
        dataType: FieldTypes.String,
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
