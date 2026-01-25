import { gregToJSDate, toKenat } from "@/utils"
import { startOf } from "../startOf"
import { endOf } from "../endOf"
import type { DateLocalizer } from 'react-big-calendar';

export function visibleDays(date: Date, localizer: DateLocalizer) {
    // Convert the visible anchor to Ethiopic
    const ethio = toKenat(date)

    // Ethiopian month boundaries (stay in Ethiopic logic)
    const startOfMonthEth = ethio.startOf('month')
    const endOfMonthEth = ethio.endOf('month')

    // Convert boundaries to JS Dates for React Big Calendar to render
    const first = startOf(gregToJSDate(startOfMonthEth), 'week')
    const last = endOf(gregToJSDate(endOfMonthEth), 'week')

    // Enumerate full grid days
    const days = (localizer as DateLocalizer).range
        ? (localizer as DateLocalizer).range(first, last, 'day')
        : (() => {
            const tmp: Date[] = []
            let cur = new Date(first)
            while (cur.getTime() <= last.getTime()) {
                tmp.push(new Date(cur))
                cur = localizer.add(cur, 1, 'day')
            }
            return tmp
        })()

    return days
}