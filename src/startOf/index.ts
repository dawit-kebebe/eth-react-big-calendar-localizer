import { getDayOfWeek } from '@/src/getDayOfWeek';
import type { StartOfWeek, Unit } from '@/types';
import { gregToJSDate, toKenat } from '@/utils';
import { MonthGrid } from 'kenat';


export function startOf(date: Date, unit: Unit = 'day', firstOfWeek: StartOfWeek = 0): Date {
    const kenat = toKenat(date);
    const kenatUnit = unit;
    if (['day', 'week', 'month', 'year'].includes(unit)) {
        if (unit === 'week') {
            const monthGrid = new MonthGrid({ ...kenat.getEthiopian(), weekStart: firstOfWeek });
            const grid = monthGrid.generate();
            const theDay = getDayOfWeek(grid.days, kenat);
            if (!theDay) return date;
            const offset = ((theDay.weekday - firstOfWeek) + 7) % 7;
            if (offset === 0) {
                return gregToJSDate(kenat);
            }
            return gregToJSDate(kenat.subtract(offset, 'days'));
        }

        const jsDate = gregToJSDate(kenat.startOf(kenatUnit as 'day' | 'month' | 'year'));
        jsDate.setHours(0, 0, 0, 0);
        return jsDate;
    }
    const jsDate = new Date(date?.getTime());
    if (unit === 'hours') jsDate.setMinutes(0, 0, 0);
    if (unit === 'minutes') jsDate.setSeconds(0, 0);
    if (unit === 'seconds') jsDate.setMilliseconds(0);
    return jsDate;
}