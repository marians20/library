import { Guid } from 'guid-typescript';

export class CronDModel {
    /**
     *
     */
    constructor(
        public Id: Guid = Guid.create(),
        public Second: string = '*',
        public Minute: string = '*',
        public Hour: string = '*',
        public WeekDay: string = '*',
        public MonthDay: string = '*',
        public Month: string = '*',
        public Year: string = '*',
        public DurationSeconds: number = 0,
        public DurationMinutes = 0,
        public DurationHours = 0) {
    }
}
