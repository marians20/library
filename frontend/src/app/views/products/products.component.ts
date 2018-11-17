import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '../component-base';
import { Product, Category, Producer } from 'src/app/model';
import { ApiClient } from 'src/app/shared';
import { SpinnerOverlayService } from 'src/app/shared/core/ui-elements/spinner-overlay/spinner-overlay.service';
import { environment } from 'src/environments/environment';
import { FieldTypes, LookupData } from 'src/app/shared/core/model';

@Component({
  selector: 'ctrl-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends ComponentBase<Product> implements OnInit {

  public producersLookupData: LookupData = new LookupData([], this.primaryKeyField, 'name');
  public categoriesLookupData: LookupData = new LookupData([], this.primaryKeyField, 'name');

  constructor(
    api: ApiClient,
    spinnerService: SpinnerOverlayService) {
    super(api, `${environment.apiUrl}/api/v1/products`, spinnerService);
    this.title = 'Products';
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
      {
        label: 'Category',
        fieldName: 'category',
        allowSorting: true,
        dataType: FieldTypes.Array,
        lookupData: this.categoriesLookupData,
        required: true,
        readOnly: false,
        visible: true,
      },
      {
        label: 'Producer',
        fieldName: 'producer',
        allowSorting: true,
        dataType: FieldTypes.Array,
        lookupData: this.producersLookupData,
        required: true,
        readOnly: false,
        visible: true,
      },
    ];
  }

  ngOnInit() {
    this.getData();
    this.getProducersLookupData();
    this.getCategoriesLookupData();
  }

  public onCreate(data: any) {
    if (data === null || data === undefined) {
      return;
    }

    const modal = data.modal;
    const value: Product = {
      name: data.value.name,
      description: data.value.description,
      category: this.categoriesLookupData.items.find(x => x[this.primaryKeyField] === data.value.category) as Category,
      producer: this.producersLookupData.items.find(x => x[this.primaryKeyField] === data.value.producer) as Producer
    };

    this.spinnerService.show();
    this.api.post(this.apiUrl, value)
      .subscribe((response) => {
        this.getData();
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
    console.log(data);
    const modal = data.modal;
    const value: Product = {
      _id: data.value._id,
      name: data.value.name,
      description: data.value.description,
      category: this.categoriesLookupData.items.find(x => x[this.primaryKeyField] === data.value.category) as Category,
      producer: this.producersLookupData.items.find(x => x[this.primaryKeyField] === data.value.producer) as Producer
    };

    this.spinnerService.show();
    this.api.put(`${this.apiUrl}`, value)
        .subscribe((response) => {
            this.getData();
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

  private getProducersLookupData() {
    this.spinnerService.show();
    this.api.get(`${environment.apiUrl}/api/v1/producers`)
      .subscribe((result: object[]) => {
        if (result === null || result === undefined) {
          return;
        }
        this.producersLookupData.items = result;
        this.grid.matchLookups();
        console.log(this.producersLookupData.items);
      },
        (error) => {
          this.spinnerService.hide();
          console.error(error);
        },
        () => {
          this.spinnerService.hide();
        });
  }

  private getCategoriesLookupData() {
    this.spinnerService.show();
    this.api.get(`${environment.apiUrl}/api/v1/categories`)
      .subscribe((result: object[]) => {
        if (result === null || result === undefined) {
          return;
        }
        this.categoriesLookupData.items = result;
        this.grid.matchLookups();
        console.log(this.categoriesLookupData.items);
      },
        (error) => {
          this.spinnerService.hide();
          console.error(error);
        },
        () => {
          this.spinnerService.hide();
        });
  }
}
