import { ApiClient } from '../shared/services/api-client.service';
import { PaginatedList, DataColumn, Query } from '../shared/core/model';
import { SpinnerOverlayService } from '../shared/core/ui-elements/spinner-overlay/spinner-overlay.service';

export class ComponentBase<T> {

    public primaryKeyField: string = '_id';
    public title: string = 'Title';
    public data: PaginatedList<T> = {
        pageNumber: 1,
        collectionSize: 10,
        items: []
    };

    public columns: DataColumn[] = [];

    public query: Query = {
        pageNumber: 1,
        pageSize: 10,
        filterItems: [],
        sortItems: [{ fieldName: this.primaryKeyField, descending: false }]
    };

    constructor(
        public api: ApiClient,
        public apiUrl: string,
        public spinnerService: SpinnerOverlayService) {
    }

    public onCreate(data: any) {
        if (data === null || data === undefined) {
            return;
        }

        const modal = data.modal;
        const value = data.value;
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

        const modal = data.modal;
        const value = data.value;
        this.spinnerService.show();
        this.api.put(this.apiUrl, value)
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

    public onDelete(id: any) {
        const item = this.data.items.find(x => x[this.primaryKeyField] === id);
        if (item === undefined) {
            return;
        }

        if (!confirm(`Are you sure you want to delete the item?`)) {
            return;
        }

        this.spinnerService.show();
        this.api.delete(`${this.apiUrl}${id}/`)
            .subscribe((response) => {
                this.getData();
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

    protected getData() {
        this.spinnerService.show();
        this.api.post<Array<T>>(`${this.apiUrl}/get`, this.query)
            .subscribe((response) => {
                this.spinnerService.hide();
                this.data.items = response;
            }, (error) => {
                this.spinnerService.hide();
                console.error(error);
            });
    }
}
