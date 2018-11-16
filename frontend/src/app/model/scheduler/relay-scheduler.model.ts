import { CronDModel } from './crond-model';

export class RelaySchedulerModel {
    /**
     *
     */
    constructor(
        public relayId: number = null,
        public schedules: CronDModel[] = []
    ) { }
}
