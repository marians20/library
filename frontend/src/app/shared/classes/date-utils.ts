import * as _ from 'lodash';
import * as moment from 'moment';

export class DateUtils {
    static addOneDay(date: string): string {
        const theDate = date.split('-');
        let year = Number(theDate[0]);
        let month = Number(theDate[1]);
        let day = Number(theDate[2]);
        day++;
        if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
            if (day > 31) {
                day = 1;
                month++;
            }
        } else if (month === 4 || month === 6 || month === 9 || month === 11) {
            if (day > 30) {
                day = 1;
                month++;
            }
        } else if (month === 2) {
            if (year % 4 === 0 && year % 100 !== 0) {
                if (day > 29) {
                    day = 1;
                    month++;
                }
            } else {
                if (day > 28) {
                    day = 1;
                    month++;
                }
            }
        }
        if (month > 12) {
            month = 1;
            year++;
        }
        return year + '-' + month + '-' + day;
    }

    public static  formatDate(date: string): string {
        const momentDate: moment.Moment = moment(date);
        return momentDate.format('YYYY-MM-DD');
    }

    public static  formatDateDMY(date: string): string {
        const momentDate: moment.Moment = moment(date);
        return momentDate.format('DD.MM.YYYY');
    }

    public static  formatDateTime(date: string): string {
        const momentDate: moment.Moment = moment(date);
        return momentDate.format('YYYY-MM-DD HH:mm:ss');
    }

    public static  formatTime(date: string): string {
        const momentDate: moment.Moment = moment(date);
        return momentDate.format('HH:mm:ss');
    }

    public static toDMYObject(date: string) {
        const momentDate: moment.Moment = moment(date);
        const result = {
            day: +momentDate.format('DD'),
            month: +momentDate.format('MM'),
            year: +momentDate.format('YYYY')
        };
        return result;
    }

    public static fromDMYObject(date: object): string {
        return `${date['year']}` +
            `-${_.padStart(date['month'].toString(), 2, '0')}` +
            `-${_.padStart(date['day'].toString(), 2, '0')}`;
    }
}
