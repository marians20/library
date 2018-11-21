export class CommandResponse {
    public static Ok = new CommandResponse(true);
    public static Fail = new CommandResponse(false);
    public success: boolean;

    /**
     *
     */
    constructor(success: boolean = false) {
        this.success = success;
    }
}
