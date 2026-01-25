import type { DateRange, FormatInput, FormatOptions } from "@/types";
import { kenatFlexibleFormat } from "@/utils";

export function format(date: FormatInput, formatStr: string, options?: FormatOptions): string {
    // If a DateRange is provided, format both ends
    if (typeof date === 'object' && date !== null && 'start' in date && 'end' in date &&
        (date as DateRange).start instanceof Date && (date as DateRange).end instanceof Date) {
        const range = date as DateRange;
        return `${format(range.start, formatStr, options)} - ${format(range.end, formatStr, options)}`;
    }

    if (typeof date === 'number' || typeof date === 'string') {
        date = new Date(date);
    }

    return kenatFlexibleFormat(date as Date, formatStr, options);
}