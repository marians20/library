import { IProducersRepository } from './interfaces';
import { Producer } from '../../domain/models';
import { Provides } from 'typescript-ioc';

@Provides(IProducersRepository)
export class ProducersRepository implements IProducersRepository {

    private ItemModel: any;

    constructor() {
        this.ItemModel = new Producer().getModelForClass(Producer);
    }

    getAll(): Promise<Producer[]> {
        return this.ItemModel.find().exec();
    }
    
    getById(id: String): Promise<Producer> {
        return this.ItemModel.findById(id).exec();
    }

    add(document: Producer): Promise<Producer> {
        const newItem = new this.ItemModel(document);
        return newItem.save();
    }

    update(id: String, document: Producer): Promise<Producer> {
        return this.ItemModel.findByIdAndUpdate(id, document, { new: true }).exec();
    }

    delete(id: String): Promise<Producer> {
        return this.ItemModel.findByIdAndRemove(id).exec();
    }
}