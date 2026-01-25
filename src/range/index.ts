import type { StartOfWeek, Unit } from "@/types";
import { startOf } from "@/src/startOf";
import { add } from "@/src/add";

export function range(start: Date, end: Date, unit: Unit = 'day', firstOfWeek: StartOfWeek = 0): Date[] {
    const dates: Date[] = [];
    let current = startOf(start, unit, firstOfWeek);
    const maxIterations = 10000;
    let i = 0;
    while (current.getTime() <= end.getTime() && i++ < maxIterations) {
        dates.push(current);
        current = add(current, 1, unit);
    }

    return dates;
}