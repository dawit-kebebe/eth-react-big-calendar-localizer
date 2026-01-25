export function getDay(date: Date) {
    if (date instanceof Date)
        return date.getDay();
}