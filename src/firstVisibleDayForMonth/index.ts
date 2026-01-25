import type { StartOfWeek } from "@/types";
import { startOf } from "@/src/startOf";

export function firstVisibleDayForMonth(date: Date, weekStart: StartOfWeek = 0): Date {
    const startOfMonthEC = startOf(date, 'month', weekStart);
    return startOf(startOfMonthEC, 'week', weekStart);
}