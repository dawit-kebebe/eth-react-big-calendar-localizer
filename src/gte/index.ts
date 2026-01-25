import { gt } from "@/src/gt";
import { eq } from "@/src/eq";
import type { Unit } from "@/types";

export function gte(a: Date, b: Date, unit: Unit = 'day') {
    return gt(a, b, unit) || eq(a, b, unit)
}