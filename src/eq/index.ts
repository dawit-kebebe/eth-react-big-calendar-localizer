import type { Unit } from "@/types"
import { toKenat } from "@/utils"

export function eq(a: Date, b: Date, unit: Unit = 'day'): boolean {
    const ea = toKenat(a)
    const eb = toKenat(b)
    switch (unit) {
        case 'year':
            return ea.ethiopian.year === eb.ethiopian.year
        case 'month':
            return ea.ethiopian.year === eb.ethiopian.year &&
                ea.ethiopian.month === eb.ethiopian.month
        case 'day':
        default:
            return ea.ethiopian.year === eb.ethiopian.year &&
                ea.ethiopian.month === eb.ethiopian.month &&
                ea.ethiopian.day === eb.ethiopian.day
    }
}