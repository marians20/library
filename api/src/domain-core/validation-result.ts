import { ValidationFailure } from './validation-failure';

export class ValidationResult {
    public isValid!: boolean;
    public validationFailures: ValidationFailure[];

    /**
     *
     */
    constructor() {
        this.isValid = true;
        this.validationFailures = [];
    }
}
