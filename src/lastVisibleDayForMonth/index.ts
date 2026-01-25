import type { StartOfWeek } from "@/types";
import { endOf } from "@/src/endOf";

export function lastVisibleDayForMonth(date: Date, weekStart: StartOfWeek = 0): Date {
    const endOfMonthEC = endOf(date, 'month', weekStart);
    return endOf(endOfMonthEC, 'week', weekStart);
}