import { eq } from "@/src/eq";
import type { Unit } from "@/types";

export function neq(a: Date, b: Date, unit: Unit = 'day'): boolean {
    return !eq(a, b, unit)
}