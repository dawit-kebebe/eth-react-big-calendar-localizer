import type { Unit } from '@/types'
import { toKenat, gregToJSDate, toKenatUnit } from '@/utils'

export function add(date: Date, amount: number, unit: Unit): Date {
    const kenat = toKenat(date);
    const kenatUnit = toKenatUnit(unit);
    if (unit === 'hours' || unit === 'minutes' || unit === 'seconds' || unit === 'milliseconds') {
        return new Date(date.getTime() + amount * {
            'milliseconds': 1,
            'seconds': 1000,
            'minutes': 60000,
            'hours': 3600000,
        }[unit]);
    }
    return gregToJSDate(kenat.add(amount, kenatUnit as 'days' | 'weeks' | 'months' | 'years'));
}