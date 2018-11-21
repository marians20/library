import { ICategoriesRepository } from './interfaces';
import { Category } from '../../domain/models';
import { Provides } from 'typescript-ioc';

@Provides(ICategoriesRepository)
export class CategoriesRepository implements ICategoriesRepository {

    private ItemModel: any;

    constructor() {
        this.ItemModel = new Category().getModelForClass(Category);
    }

    getAll(): Promise<Category[]> {
        return this.ItemModel.find().exec();
    }
    
    getById(id: String): Promise<Category> {
        return this.ItemModel.findById(id).exec();
    }

    add(document: Category): Promise<Category> {
        const newItem = new this.ItemModel(document);
        return newItem.save();
    }

    update(id: String, document: Category): Promise<Category> {
        return this.ItemModel.findByIdAndUpdate(id, document, { new: true }).exec();
    }

    delete(id: String): Promise<Category> {
        return this.ItemModel.findByIdAndRemove(id).exec();
    }
}