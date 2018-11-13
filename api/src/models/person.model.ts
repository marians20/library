import { prop, Typegoose } from 'typegoose';

export class Person extends Typegoose {

    @prop({required: true})
    public firstName: string | undefined;

    @prop({required: true})
    public lastName: string | undefined;

    @prop({required: true})
    public birthDate: Date | undefined;
}