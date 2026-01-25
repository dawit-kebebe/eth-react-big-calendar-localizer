interface StartOfWeekOptions {
    weekStartsOn?: number;
}

type DateRange = { start: Date; end: Date }
type FormatInput = number | string | Date | DateRange;

interface FormatOptions extends StartOfWeekOptions {
    locale?: 'amharic' | 'english';
}

type Unit =
    "milliseconds"
    | "seconds"
    | "minutes"
    | "hours"
    | "day"
    | "week"
    | "month"
    | "year"
    | "decade"
    | "century";

type StartOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6

type FormatComponent = {
    G: string;
    y: number;
    M: number;
    MMM: string;
    MMMM: string;
    e: number;
    EEE: string;
    EEEE: string;
    d: number;
    D: number;
    a: string;
    H: number;
    h: number;
    K: number;
    k: number;
    m: number;
    s: number;
    S: number;
    Q: number;
};

interface GridData {
    ethiopian: {
        year: number,
        month: number,
        day: number,
    },
    gregorian?: {
        year: number,
        month: number,
        day: number,
        display?: string,
    },
    weekday: number,
    weekdayName?: string,
    isToday?: boolean,
    holidays?: unknown[],
}

export type { StartOfWeekOptions, DateRange, FormatInput, FormatOptions, Unit, StartOfWeek, FormatComponent, GridData }