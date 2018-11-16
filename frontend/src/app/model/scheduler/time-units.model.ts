import { TimeUnitItem } from './time-unit-item.model';

export class TimeUnits {
    public static readonly Second: TimeUnitItem = {
        Name: 'second',
        Plural: 'seconds',
        Adverb: 'secondly'
    };

    public static readonly Minute: TimeUnitItem = {
        Name: 'minute',
        Plural: 'minutes',
        Adverb: 'minutely'
    };

    public static readonly Hour: TimeUnitItem = {
        Name: 'hour',
        Plural: 'hours',
        Adverb: 'hourly'
    };

    public static readonly Day: TimeUnitItem = {
        Name: 'day',
        Plural: 'days',
        Adverb: 'daily'
    };

    public static readonly Week: TimeUnitItem = {
        Name: 'week',
        Plural: 'weeks',
        Adverb: 'weekly'
    };

    public static readonly Month: TimeUnitItem = {
        Name: 'month',
        Plural: 'months',
        Adverb: 'monthly'
    };

    public static readonly Year: TimeUnitItem = {
        Name: 'year',
        Plural: 'years',
        Adverb: 'yearly'
    };

    public get all(): TimeUnitItem[] {
        return [
            TimeUnits.Second,
            TimeUnits.Minute,
            TimeUnits.Hour,
            TimeUnits.Day,
            TimeUnits.Week,
            TimeUnits.Month,
            TimeUnits.Year,
        ];
    }
}
