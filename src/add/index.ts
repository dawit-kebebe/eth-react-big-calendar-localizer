import type { WithWorkWeek } from '@/types';
import { gregToJSDate, toKenat, toKenatUnit } from '@/utils';

export function add(date: Date, amount: number, unit: WithWorkWeek): Date {
    const kenat = toKenat(date);
    const kenatUnit = toKenatUnit(unit);

    if (!kenatUnit) {
        throw new Error(`Unsupported unit: ${unit}`);
    }

    if (unit === 'hours' || unit === 'minutes' || unit === 'seconds' || unit === 'milliseconds') {
        return new Date(date.getTime() + amount * {
            'milliseconds': 1,
            'seconds': 1000,
            'minutes': 60000,
            'hours': 3600000,
        }[unit]);
    }

    if (kenatUnit === 'weeks' || kenatUnit === 'week') {
        return gregToJSDate(kenat.add(amount * 7, 'days'));
    }

    return gregToJSDate(kenat.add(amount, kenatUnit as 'days' | 'weeks' | 'months' | 'years'));
}