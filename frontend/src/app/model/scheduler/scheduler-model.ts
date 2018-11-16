import { CronDModel } from "./crond-model";

export class SchedulerModel {
    /**
     *
     */
    constructor(
        public relayId: number,
        public schedules: CronDModel[]
    ) {}
}
