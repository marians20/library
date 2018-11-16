import { ApiClient } from '../shared/services/api-client.service';
import { PaginatedList, DataColumn, Query } from '../shared/core/model';
import { SpinnerOverlayService } from '../shared/core/ui-elements/spinner-overlay/spinner-overlay.service';

export class ComponentBase<T> {

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
        sortItems: [{fieldName: 'id', descending: false}]
    };

    constructor(
        public api: ApiClient,
        public apiUrl: string,
        public spinnerService: SpinnerOverlayService) {
    }

    public onCreate(event) {
    }

    public onEdit(event) {
    }

    public onDelete(event) {
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
