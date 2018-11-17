import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model';
import { ComponentBase } from '../component-base';
import { ApiClient } from 'src/app/shared';
import { SpinnerOverlayService } from 'src/app/shared/core/ui-elements/spinner-overlay/spinner-overlay.service';
import { environment } from 'src/environments/environment';
import { FieldTypes } from 'src/app/shared/core/model';

@Component({
  selector: 'ctrl-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent extends ComponentBase<Category> implements OnInit {

  constructor(
    api: ApiClient,
    spinnerService: SpinnerOverlayService) {
    super(api, `${environment.apiUrl}/api/v1/categories`, spinnerService);
    this.title = 'Categories';
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
