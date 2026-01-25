import type { Unit } from "@/types";
import { eq } from "../eq";
import { lt } from "../lt";

export function lte(a: Date, b: Date, unit: Unit = 'day') {
    return lt(a, b, unit) || eq(a, b, unit)
}