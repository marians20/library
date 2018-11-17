import { Producer } from './producer.model';
import { Category } from './category.model';

export class Product {
    public _id?: string;
    public name!: string;
    public description!: string;
    public producer!: Producer;
    public category!: Category;
}
