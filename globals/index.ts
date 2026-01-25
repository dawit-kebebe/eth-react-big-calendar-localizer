export const formattingTokensRegExp =
    /[yYQqMLwIdDecihHKkmsS]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;

export const escapedStringRegExp = /^'([^]*?)'?$/;
export const doubleQuoteRegExp = /''/g;

export const amharicDays = ['እሑድ', 'ሰኞ', 'ማክሰኞ', 'ረቡዕ', 'ሐሙስ', 'ዓርብ', 'ቅዳሜ'];
export const englishDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const EthiopicCompositeFormats: Record<string, string> = {
    'p': 'h:mm a',
    'pp': 'h:mm:ss a',
    'ppp': 'h:mm:ss a',
    'pppp': 'h:mm:ss a',
    'P': 'M/d/y',
    'PP': 'MMM d, y',
    'PPP': 'MMMM d, y',
    'PPPP': 'EEEE, MMMM d, y',
    'Pp': 'M/d/y h:mm a',
    'PPp': 'MMM d, y h:mm a',
    'PPPp': 'MMMM d, y h:mm a',
    'PPPPp': 'EEEE, MMMM d, y h:mm a',
    'Ppp': 'M/d/y h:mm:ss a',
    'PPpp': 'MMM d, y h:mm:ss a',
    'PPPpp': 'MMMM d, y h:mm:ss a',
    'PPPPpp': 'EEEE, MMMM d, y h:mm:ss a',
};