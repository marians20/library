import { IPeopleRepository } from './i-people-repository';
import { Person } from '../models';
import { Provides } from 'typescript-ioc';

@Provides(IPeopleRepository)
export class PeopleRepository implements IPeopleRepository {

    private ItemModel: any;

    /**
     *
     */
    constructor() {
        this.ItemModel = new Person().getModelForClass(Person);
    }

    getAll(): Promise<Person[]> {
        return this.ItemModel.find().exec();
    }
    
    getById(id: String): Promise<Person> {
        return this.ItemModel.findById(id).exec();
    }

    add(document: Person): Promise<Person> {
        const newItem = new this.ItemModel(document);
        return newItem.save();
    }

    update(id: String, document: Person): Promise<Person> {
        return this.ItemModel.findByIdAndUpdate(id, document, { new: true }).exec();
    }

    delete(id: String): Promise<Person> {
        return this.ItemModel.findByIdAndRemove(id).exec();
    }
}