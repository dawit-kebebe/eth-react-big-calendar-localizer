import { lt } from "@/src/lt";
import type { Unit } from "@/types";

export function gt(a: Date, b: Date, unit: Unit = 'day') {
    return lt(b, a, unit)
}
