import { prop, Typegoose } from "typegoose";

export class Category extends Typegoose {
    @prop({required: true, unique: true, minlength: 2, maxlength: 256})
    public name!: string;

    @prop({required: false, maxlength: 2048})
    public description!: string;
}