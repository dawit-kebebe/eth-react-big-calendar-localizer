import type { Unit } from "@/types"
import { toKenat } from "@/utils"

export function lt(a: Date, b: Date, unit: Unit = 'day') {
    const ea = toKenat(a)
    const eb = toKenat(b)
    if (unit === 'year') return ea.ethiopian.year < eb.ethiopian.year
    if (unit === 'month')
        return ea.ethiopian.year < eb.ethiopian.year ||
            (ea.ethiopian.year === eb.ethiopian.year &&
                ea.ethiopian.month < eb.ethiopian.month)
    return ea.ethiopian.year < eb.ethiopian.year ||
        (ea.ethiopian.year === eb.ethiopian.year &&
            (ea.ethiopian.month < eb.ethiopian.month ||
                (ea.ethiopian.month === eb.ethiopian.month &&
                    ea.ethiopian.day < eb.ethiopian.day)))
}