import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Component, Input, Output, OnInit, OnDestroy, Inject, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

import { AlertService } from '../alert';
import { ApiClient } from '../../../services';
import { DataColumn, FieldTypes } from '../../model';
import { DateUtils } from '../../../classes';
import { LoggingService } from '../../../services/logging.service';


@Component({
    selector: 'ccpv-data-form',
    templateUrl: './data-form.component.html',
    styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent implements OnInit, OnDestroy {
    private sub: any;
    private key: string;

    busy: Subscription;

    submitButtonId: string;
    backButtonId: string;

    @Input() isCreating: boolean = false;
    @Input() isEditing: boolean = false;
    @Input() isSearch: boolean = false;
    @Input() title: string = 'Title';
    @Input() apiClient: ApiClient;
    @Input('item')
    get item(): object {
        return this._item;
    }
    set item(value: object) {
        this._item = _.cloneDeep(value);
    }
    private _item: object = {};
    @Input() showMessages: boolean = true;
    @Input() columns: DataColumn[] = [];
    @Input() backRoute: string = '';

    @Output() created:  EventEmitter<object> = new EventEmitter<object>();
    @Output() updated:  EventEmitter<object> = new EventEmitter<object>();
    @Output() create: EventEmitter<object> = new EventEmitter<object>();
    @Output() update: EventEmitter<object> = new EventEmitter<object>();
    @Output() search: EventEmitter<object> = new EventEmitter<object>();

    constructor(
        private route: ActivatedRoute,
        private alertService: AlertService,
        private logger: LoggingService) {
    }

    ngOnInit() {
        this.submitButtonId = 'formSubmitBtn';
        this.backButtonId = 'formBackBtn';
        this.columns.forEach((column) => {
            if (column.dataType === FieldTypes.Date) {
                this.item[column.fieldName] =
                    DateUtils.toDMYObject(this.item[column.fieldName]);
            }
        });
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
        if (this.key) {
            localStorage.removeItem(this.key);
        }
    }

    private getDataFromRoute() {
        this.sub = this.route.params.subscribe(params => {
            const id = params['id'];
            const columns = params['columns'];

            if (columns) {
                this.columns = JSON.parse(atob(columns));
            }

            if (id) {
                this.apiClient.get(`${this.apiClient.apiUrl}/id`)
                    .subscribe(response => {
                        this.item = response;
                    }, error => {
                        this.logger.error(error);
                    });
            }
        });
    }

    private getDataFromLocalStorage() {
        this.sub = this.route.params.subscribe(params => {
            this.key = params['id'];
            if (this.key) {
                const data = JSON.parse(atob(localStorage.getItem(this.key)));
                this.columns = data['columns'];
                this.item = data['item'];
            }
        });
    }

    onClickSave() {
        const item = _.cloneDeep(this.item);
        this.columns.forEach((column) => {
            if (column.dataType === FieldTypes.Date) {
                item[column.fieldName] = DateUtils
                    .fromDMYObject(item[column.fieldName]);
            }
        });

        if (this.isEditing) {
            if (this.apiClient) {
                this.busy = this.apiClient.put(this.apiClient.apiUrl, item)
                    .subscribe(response => {
                        this.updated.emit(item);
                    }, error => {
                        this.logger.error(error);
                    });
            } else {
                this.update.emit(item);
            }
        } else if (this.isCreating) {
            if (this.apiClient) {
                this.busy = this.apiClient.post(this.apiClient.apiUrl, item)
                    .subscribe(response => {
                        item.id = response;
                        this.created.emit(item);
                    }, error => {
                        this.logger.error(error);
                    });
            } else {
                this.create.emit(item);
            }
        } else if (this.isSearch) {
            this.search.emit(item);
        }
    }
}
