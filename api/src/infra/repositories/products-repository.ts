import { IProductsRepository } from './interfaces';
import { Product } from '../../domain/models';
import { Provides } from 'typescript-ioc';

@Provides(IProductsRepository)
export class ProductsRepository implements IProductsRepository {

    private ItemModel: any;

    constructor() {
        this.ItemModel = new Product().getModelForClass(Product);
    }

    getAll(): Promise<Product[]> {
        return this.ItemModel.find().exec();
    }
    
    getById(id: String): Promise<Product> {
        return this.ItemModel.findById(id).exec();
    }

    add(document: Product): Promise<Product> {
        const newItem = new this.ItemModel(document);
        return newItem.save();
    }

    update(id: String, document: Product): Promise<Product> {
        return this.ItemModel.findByIdAndUpdate(id, document, { new: true }).exec();
    }

    delete(id: String): Promise<Product> {
        return this.ItemModel.findByIdAndRemove(id).exec();
    }
}