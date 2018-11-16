import { FilterItems } from './filter-item.model';
import { SortItems } from './sort-item.model';

export class Query {
    public pageNumber: number;
    public pageSize: number;
    public filterItems: FilterItems;
    public sortItems: SortItems;
}
