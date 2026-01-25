import type { Unit } from "@/types";
import { gte } from "@/src/gte";
import { lte } from "@/src/lte";

export function inRange(day: Date, min: Date, max: Date, unit: Unit = 'day') {
    return gte(day, min, unit) && lte(day, max, unit)
}