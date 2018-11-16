import { prop, Typegoose } from "typegoose";
import { Category } from "./category.model";
import { Producer } from "./producer.model";

export class Product extends Typegoose {
    @prop({required: true, unique: true, minlength: 2, maxlength: 256})
    public name!: string;

    @prop({required: false, maxlength: 2048})
    public description!: string;

    @prop({required: true})
    public category!: Category;

    @prop({required: true})
    public producer!: Producer;
}