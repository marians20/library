import {
    Component,
    OnInit,
    Input,
    EventEmitter,
    Output,
    ViewContainerRef,
    ViewChild,
    QueryList,
    ViewChildren,
    AfterViewInit,
} from '@angular/core';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as FileSaver from 'file-saver';
import * as _ from 'lodash';
import { Query, SortItem, FilterItem } from '../../model';
import { Subscription } from 'rxjs';
import { DataColumn, FieldTypes, DataCell, PaginatedList } from '../../model';
import { ApiClient } from '../../../services';
import { AlertService } from '../alert/alert.service';
import { LoggingService } from '../../../services/logging.service';
import { DataFormComponent } from '../data-form/data-form.component';
import { DateUtils } from '../../../classes';
import { DataViewComponent } from '../data-view/data-view.component';
import { SpinnerOverlayService } from '../spinner-overlay/spinner-overlay.service';

@Component({
    selector: 'ccpv-data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, AfterViewInit {
    public currentItem: object = {};
    public busy: Subscription;
    public searchFieldsValues = [];

    private filterFieldName = '';
    private filterFieldValue = null;
    private waitingForFilterExecution;
    private getListModel: Query;
    private modal: NgbModalRef;

    public get colspan() {
        return this.columns && this.columns.length + 2;
    }

    public get pagesCount(): number {
        return Math.ceil(this.collectionSize / this.pageSize);
    }
    @Input() primaryKeyFieldName: string = 'id';
    @Input() useOwnForm: boolean = true;
    @Input() allowInlineForms: boolean = false;
    @Input() showFilterRow: boolean = false;
    @Input() title: string = 'Title';
    @Input() inlineForms: boolean = false;
    @Input() allowCreate: boolean = false;
    @Input() allowEdit: boolean = false;
    @Input() allowDelete: boolean = false;
    @Input() allowSelectRows: boolean = false;
    @Input() allowShowDetails: boolean = false;
    @Input() showMessages: boolean = false;
    @Input() columns: Array<DataColumn> = [];
    @Input() style: string = 'data-table table-striped';
    @Input() items: Array<object> = [];
    @Input() allowCsvExport: boolean = false;
    @Input() apiClient: ApiClient;
    @Input() collectionSize: number = 10;
    @Input('pageSize')
    set pageSize(value: number) {
        if (value === this.getListModel.pageSize) {
            return;
        }

        if (value < 1) {
            value = 1;
        } else if (value > 999) {
            value = 999;
        }

        localStorage.setItem('DataGridPageSize', value.toString());
        this.getListModel.pageSize = value;
    }
    get pageSize() {
        if (this.getListModel.pageSize === 0) {
            this.getListModel.pageSize = Number(localStorage.getItem('DataGridPageSize'));
            if (!this.getListModel.pageSize || this.pageSize < 1) {
                this.pageSize = 10;
            }
        }
        return this.getListModel.pageSize;
    }

    set page(value: number) {
        this.getListModel.pageNumber = value || 1;
    }

    get page(): number {
        return this.getListModel.pageNumber;
    }

    @Input('orderByColumn')
    set orderByColumn(value: string) {
        this.getListModel.sortItems[0].fieldName = value || this.primaryKeyFieldName;
    }
    get orderByColumn(): string {
        return this.getListModel.sortItems[0].fieldName;
    }

    @Input('orderDescending')
    set orderDescending(value: boolean) {
        this.getListModel.sortItems[0].descending = value || false;
    }
    get orderDescending(): boolean {
        return this.getListModel.sortItems[0].descending || false;
    }

    @Input('isCreatingNewItem')
    set isCreatingNewItem(value: boolean) {
        this._isCreatingNewItem = value || false;
        if (this._isCreatingNewItem && this.isEditingItem >= 0) {
            this.isEditingItem = -1;
        }
    }
    get isCreatingNewItem(): boolean {
        return this._isCreatingNewItem;
    }
    private _isCreatingNewItem = false;

    @Input('isEditingItem')
    public set isEditingItem(value: number) {
        this._isEditingItem = value || 0;
        if (this._isEditingItem >= 0 && this.isCreatingNewItem) {
            this.isCreatingNewItem = false;
        }
    }
    public get isEditingItem(): number {
        return this._isEditingItem;
    }
    private _isEditingItem = -1;

    @Output() create = new EventEmitter();
    @Output() created = new EventEmitter<object>();
    @Output() update = new EventEmitter<object>();
    @Output() updated = new EventEmitter<object>();
    @Output() edit = new EventEmitter<any>();
    @Output() delete = new EventEmitter<any>();
    @Output() deleted = new EventEmitter<string>();
    @Output() pageChanged = new EventEmitter<number>();
    @Output() pageSizeChanged = new EventEmitter<number>();
    @Output() sortChanged = new EventEmitter<object>();
    @Output() filterChanged = new EventEmitter<object>();
    @Output() createNewItem = new EventEmitter<object>();
    @Output() showDetails = new EventEmitter<object>();
    @Output() selectionChanged = new EventEmitter<object>();

    @ViewChild('createDataForm') createDataForm: DataFormComponent;
    @ViewChild('editDataForm') editDataForm: DataFormComponent;
    @ViewChildren(DataViewComponent) dataViews: QueryList<DataViewComponent>;

    constructor(
        private modalService: NgbModal,
        private logger: LoggingService,
        private spinnerService: SpinnerOverlayService) {
        this.getListModel = {
            pageNumber: 1,
            pageSize: 25,
            filterItems: [],
            sortItems: []
        };
        this.getListModel.sortItems.push({ fieldName: this.primaryKeyFieldName, descending: false });
    }

    ngOnInit() {
        if (this.apiClient && this.apiClient.apiUrl) {
            this.getAll();
        }
    }

    ngAfterViewInit() {
    }

    public getAll() {
        if (!this.apiClient) {
            return;
        }
        this.spinnerService.show();
        this.busy = this.apiClient.post<any>(`${this.apiClient.apiUrl}\get`, this.getListModel)
            .subscribe((response: PaginatedList<object>) => {
                this.collectionSize = response.collectionSize;
                this.items = response.items;
                this.spinnerService.hide();
            }, (error) => {
                this.logger.error(error);
                this.spinnerService.hide();
            });
    }

    public matchLookups() {
        this.dataViews.forEach((dataView: DataViewComponent) => {
            dataView.matchLookupData();
        });
    }

    getColumnsFromModel(item: object) {
        this.columns = new Array<DataColumn>();
        const fields = Object.getOwnPropertyNames(item)
            .filter(i => i.toLowerCase() !== this.primaryKeyFieldName.toLowerCase());
        fields.forEach(field => {
            const words = field.match(/[A-Z]+[^A-Z]*|[^A-Z]+/g);
            const title = words.map((word) => {
                return word[0].toUpperCase() + word.substr(1);
            }).join(' ');
            const type = typeof field;
            this.columns.push(new DataColumn(field, title, FieldTypes.String));
        });
    }

    onClickCreate(template) {
        this.create.emit();
        if (!this.useOwnForm) {
            return;
        }

        this.currentItem = {};
        if (this.inlineForms) {
            this.isCreatingNewItem = true;
        } else {
            this.openModal(template);
        }
    }

    onClickSave() {
        const currentItem = _.cloneDeep(this.currentItem);
        for (const column of this.columns) {
            if (column.dataType === FieldTypes.Date) {
                currentItem[column.fieldName] = DateUtils.fromDMYObject(currentItem[column.fieldName]);
            }
        }

        if (this.isCreatingNewItem) {
            if (this.apiClient != null) {
                this.apiClient.post(this.apiClient.apiUrl, currentItem)
                    .subscribe(result => {
                        this.isCreatingNewItem = false;
                        currentItem.Id = result;
                        this.created.emit(currentItem);
                        this.getAll();
                    }, error => {
                        this.logger.error(error);
                    });
            } else {
                this.create.emit(currentItem);
            }
        } else if (this.isEditingItem >= 0) {
            if (this.apiClient != null) {
                this.apiClient.put(this.apiClient.apiUrl, currentItem)
                    .subscribe(result => {
                        this.getAll();
                        this.updated.emit(currentItem);
                        this.isEditingItem = -1;
                    }, error => {
                        this.logger.error(error);
                    });
            } else {
                this.update.emit(currentItem);
            }
        }
    }

    onClickCancel() {
        this.isCreatingNewItem = false;
        this.isEditingItem = -1;
    }

    onClickEdit(template, id: string, rowIndex: number) {
        rowIndex = rowIndex || 0;
        this.currentItem = this.items.filter(item => item[this.primaryKeyFieldName] === id)[0];
        this.edit.emit(id);
        if (!this.useOwnForm) {
            return;
        }

        if (this.inlineForms) {
            this.isEditingItem = rowIndex;
        } else {
            this.openModal(template);
        }
    }

    onClickShowDetails(item: object) {
        this.showDetails.emit(item);
    }

    onClickDelete(id: string) {
        this.delete.emit(id);
        if (!this.useOwnForm) {
            return;
        }

        if (this.apiClient) {
            if (!confirm('Are you sure you want to delete the item?')) {
                return;
            }

            this.apiClient.delete(`${this.apiClient.apiUrl}/${id}`)
                .subscribe((response) => {
                    this.getAll();
                }, (error) => {
                    this.logger.error(error);
                });
        }
    }

    onPgChanged() {
        this.pageChanged.emit(this.page);
        if (this.isEditingItem >= 0) {
            this.isEditingItem = -1;
        }
        this.getAll();
    }

    onPgSizeChanged(event) {
        if (this.pageSize < 1) {
            this.pageSize = 1;
        }
        if (this.pageSize > 100) {
            this.pageSize = 100;
        }
        this.pageSizeChanged.emit(this.pageSize);
        this.getAll();
    }

    private setOrderByColumn(column: DataColumn) {
        if (!column.allowSorting) {
            return;
        }
        if (this.orderByColumn === column.fieldName) {
            this.orderDescending = !this.orderDescending;
        } else {
            this.orderByColumn = column.fieldName;
            this.orderDescending = false;
        }

        this.sortChanged.emit({
            orderByColumn: this.orderByColumn,
            orderDescending: this.orderDescending
        });

        this.getAll();
    }

    public onClickFilter() {
        if (this.showFilterRow) {
            this.logger.debug('Hide filters row');
        } else {
            this.logger.debug('Show filters row');
        }
        this.showFilterRow = !this.showFilterRow;
    }

    public onFilterChange(filterValue, columnName) {
        if (this.waitingForFilterExecution) {
            clearTimeout(this.waitingForFilterExecution);
        }
        this.waitingForFilterExecution = setTimeout(() => {
            const filter = this.getListModel.filterItems.find(f => f.fieldName === columnName);
            if (filter) {
                if (filterValue.toString() === '') {
                    this.getListModel.filterItems =
                        this.getListModel.filterItems.filter(f => f.fieldName !== columnName);
                } else {
                    filter.value = filterValue;
                }
            } else {
                if (filterValue !== undefined && filterValue !== '') {
                    this.getListModel.filterItems
                        .push({ fieldName: columnName, operator: '==', value: filterValue });
                }
            }
            this.filterChanged.emit(this.getListModel.filterItems);
            this.getAll();
        }, 600);
    }

    public onClickClearFilters() {

        this.getListModel.filterItems = [];
        const fields = Object.getOwnPropertyNames(this.searchFieldsValues);
        fields.forEach(field => {
            try {
                this.searchFieldsValues[field] = undefined;
            } catch (err) { }
        });
        this.filterChanged.emit(this.getListModel.filterItems);
        this.getAll();
    }

    onSelectClicked(event, id) {
        this.selectionChanged.emit({ id: id, selected: event.srcElement['checked'] });
    }

    openModal(template) {
        this.modal = this.modalService.open(template);
    }

    onCreate(value: object) {
        this.create.emit({value: value, modal: this.modal});
    }

    onUpdate(value: object) {
        this.update.emit({value: value, modal: this.modal});
    }

    onFormCreated(item: any) {
        this.created.emit(item);
        this.closeModal(true);
    }

    onFormUpdated(item: any) {
        this.updated.emit(item);
        this.closeModal(true);
    }

    closeModal(refreshGrid: boolean) {
        this.logger.debug('[data-table] closeModal invoked');
        this.modal.close();
        this.getAll();
    }

    toggleInlineEdit() {
        this.inlineForms = !this.inlineForms;
    }

    public ExportAsCsv() {

        let csvString = this.columns.map(x => x.label).join(',') + '\r\n';

        for (const item of this.items) {
            const row = [];
            for (const column of this.columns) {
                if (true) {
                    const myCell = new DataCell(column, item[column.fieldName]);
                    row.push(myCell.displayValue);
                }
            }
            csvString += row.join(',') + '\r\n';
        }

        const filename = 'Report.csv';

        const blob = new Blob([csvString], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-16le'
        });
        FileSaver.saveAs(blob, filename);
    }
}
