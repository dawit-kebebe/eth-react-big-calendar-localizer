import type { StartOfWeek, Unit } from "@/types";
import { gregToJSDate, toKenat } from "@/utils";
import { getDayOfWeek } from "../getDayOfWeek";
import { MonthGrid } from 'kenat';

export function endOf(date: Date, unit: Unit = 'day', firstOfWeek: StartOfWeek = 0): Date {
    const kenat = toKenat(date);
    const kenatUnit = unit;
    if (['day', 'week', 'month', 'year'].includes(unit)) {
        if (unit === 'week') {
            const monthGrid = new MonthGrid({ ...kenat.getEthiopian(), weekStart: firstOfWeek });
            const grid = monthGrid.generate();
            const theDay = getDayOfWeek(grid.days, kenat);
            if (!theDay) return date;
            const endWeekday = (firstOfWeek + 6) % 7;
            const offsetToEnd = ((endWeekday - theDay.weekday) + 7) % 7;
            if (offsetToEnd === 0) {
                const jsDate = gregToJSDate(kenat);
                jsDate.setHours(23, 59, 59, 999);
                return jsDate;
            }
            const jsDate = gregToJSDate(kenat.add(offsetToEnd, 'days'));
            jsDate.setHours(23, 59, 59, 999);
            return jsDate;
        }
        const jsDate = gregToJSDate(kenat.endOf(kenatUnit as 'day' | 'month' | 'year'));
        jsDate.setHours(23, 59, 59, 999);

        return jsDate;
    }
    const jsDate = new Date(date.getTime());
    if (unit === 'hours') {
        jsDate.setMinutes(59, 59, 999);
        return jsDate;
    }
    if (unit === 'minutes') {
        jsDate.setSeconds(59, 999);
        return jsDate;
    }
    if (unit === 'seconds') {
        jsDate.setMilliseconds(999);
        return jsDate;
    }
    return jsDate;
}