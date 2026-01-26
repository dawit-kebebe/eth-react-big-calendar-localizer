import { amharicDays, doubleQuoteRegExp, englishDays, escapedStringRegExp, EthiopicCompositeFormats, formattingTokensRegExp, } from '@/globals';
import type { FormatComponent, FormatOptions, WithWorkWeek } from '@/types';
import Kenat from 'kenat';

export function toKenat(date: Date): Kenat {
    return new Kenat(date);
}

export function toKenatUnit(unit: WithWorkWeek): 'days' | 'weeks' | 'months' | 'years' | 'day' | 'week' | 'month' | 'year' {
    if (unit === 'day' || unit === 'week' || unit === 'month' || unit === 'year') {
        return `${unit}s` as 'days' | 'weeks' | 'months' | 'years' | 'day' | 'week' | 'month' | 'year';
    }

    if (unit === 'work_week') {
        return 'weeks';
    }

    return unit as 'days' | 'weeks' | 'months' | 'years' | 'day' | 'week' | 'month' | 'year';
}

export function gregToJSDate(kenat: Kenat): Date {
    const gregReturn = kenat.getGregorian();
    return new Date(gregReturn.year, gregReturn.month - 1, gregReturn.day, kenat.time.hour, kenat.time.minute, 0);
}

export function cleanEscapedString(input: string): string {
    const matched = input.match(escapedStringRegExp);
    if (!matched) return input;
    return matched[1].replace(doubleQuoteRegExp, "'");
}

export function getEthiopicComponents(kenatDate: Kenat, options?: FormatOptions): FormatComponent {
    const locale = options?.locale || 'amharic';
    const isAmharic = locale === 'amharic';

    const ethio = kenatDate.getEthiopian();
    const monthNum = ethio.month;
    const yearEC = ethio.year;
    const dateNum = ethio.day;
    const dayOfWeekIndex = kenatDate.weekday();

    const dayName = isAmharic ? amharicDays[dayOfWeekIndex] : englishDays[dayOfWeekIndex];


    const monthNameWide = isAmharic
        ? kenatDate.format({ lang: 'amharic' }).split(' ')[0]
        : kenatDate.format({ lang: 'english' }).split(' ')[0];

    const monthNameAbbreviated = monthNameWide.slice(0, 3) || '';
    const dayNameAbbreviated = dayName.slice(0, 3) || '';

    const dayInYear = ((monthNum - 1) * 30) + dateNum;

    const hours24 = kenatDate.time.toGregorian().hour;
    const hoursEth = kenatDate.time.hour;
    const minutes = kenatDate.time.toGregorian().minute;
    const seconds = 0;
    const period = kenatDate.time.period;

    const quarter = (
        monthNum >= 1 && monthNum <= 3 ? 1 :
            monthNum >= 4 && monthNum <= 6 ? 2 :
                monthNum >= 7 && monthNum <= 9 ? 3 :
                    4
    );

    return {
        G: isAmharic ? 'ዓ.ም.' : 'A.D.',
        y: yearEC,
        M: monthNum,
        MMM: monthNameAbbreviated,
        MMMM: monthNameWide,
        e: dayOfWeekIndex,
        EEE: dayNameAbbreviated,
        EEEE: dayName,
        d: dateNum,
        D: dayInYear,
        a: isAmharic ? (period === 'day' ? 'ቀን' : 'ማታ') : period,
        H: hours24,
        h: hoursEth, //hours % 12 === 0 ? 12 : hours % 12,
        K: hoursEth, //hours % 12,
        k: hours24 === 0 ? 24 : hours24,
        m: minutes,
        s: seconds,
        S: 0,
        Q: quarter,
    };
}

export function kenatFlexibleFormat(date: Date, formatStr: string, options?: FormatOptions): string {
    const kenatDate = toKenat(date);
    const components = getEthiopicComponents(kenatDate, options);

    function getTokenValue(token: string, originalDate: Date): string {
        const base = token[0];
        const len = token.length;

        if (base === 'P' || base === 'p') {
            const formatString = EthiopicCompositeFormats[token];
            if (formatString) {
                return kenatFlexibleFormat(originalDate, formatString, options);
            }
        }

        const numericKeyMap: Record<string, keyof FormatComponent> = {
            'y': 'y', 'M': 'M', 'd': 'd', 'e': 'e', 'D': 'D',
            'H': 'H', 'h': 'h', 'K': 'K', 'k': 'k', 'm': 'm', 's': 's', 'S': 'S',
            'c': 'e',
            'Q': 'Q',
            'L': 'M',
        };

        const stringKeys: Array<keyof FormatComponent> = ['G', 'MMM', 'MMMM', 'EEE', 'EEEE', 'a'];
        const tokenAsKey = token as keyof FormatComponent;

        if (base === 'Q' && len >= 3) {
            const quarterNames = ['ሩብ ፩', 'ሩብ ፪', 'ሩብ ፫', 'ሩብ ፬'];
            const quarterAbbr = ['ሩ፩', 'ሩ፪', 'ሩ፫', 'ሩ፬'];
            const quarterValue = components.Q;

            if (len === 3) return quarterAbbr[quarterValue - 1] || token;
            return quarterNames[quarterValue - 1] || token;
        }

        if (base === 'L' && len >= 3) {
            if (len === 3) return components.MMM;
            return components.MMMM;
        }

        // if (base === 'c' && len >= 3) {
        //     if (len === 3) return components.EEE;
        //     return components.EEEE;
        // }

        if (base === 'c' || base === 'e') {
            const dayIndex = components.e; // 0 = Sunday
            // const isAmharic = options?.locale === 'am-ET';
            // console.log('c branch', formatStr)

            // const dayNames = isAmharic ? amharicDays : englishDays;
            const abbrDayNames = amharicDays.map((d) => d.slice(0, 3)); // adjust for Amharic if needed

            switch (len) {
                case 1: return String(dayIndex + 1);        // c -> numeric 1-7
                case 2: return String(dayIndex + 1).padStart(2, '0'); // cc -> 01-07
                case 3: return abbrDayNames[dayIndex] || token;       // ccc -> abbreviated
                default: return amharicDays[dayIndex] || token;         // cccc+ -> full name
            }
        }

        if (stringKeys.includes(tokenAsKey)) {
            return String(components[tokenAsKey] ?? token);
        }

        const key = numericKeyMap[base];

        if (key && typeof components[key] === 'number') {
            const value = components[key] as number;

            if (len > 1) {
                return String(value).padStart(len, '0');
            }
            return String(value);
        }

        return token;
    }

    const parts = formatStr.match(formattingTokensRegExp);

    if (!parts) {
        return formatStr;
    }

    return parts
        .map((substring) => {
            if (substring.startsWith("'")) {
                return cleanEscapedString(substring);
            }

            if (substring === "''") {
                return "'";
            }

            const baseChar = substring[0];
            if ('GgyYQqMLwIdDecihHKkmsSaEcPp'.includes(baseChar)) {
                return getTokenValue(substring, date);
            }

            return substring;
        })
        .join("");
}