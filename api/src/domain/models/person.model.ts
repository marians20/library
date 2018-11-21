import { prop, Typegoose } from 'typegoose';

export class Person extends Typegoose {

    @prop({required: true})
    public firstName!: string;

    @prop({required: true})
    public lastName!: string;

    @prop({required: true})
    public birthDate!: Date;
}