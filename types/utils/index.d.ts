import type { FormatComponent, FormatOptions, WithWorkWeek } from '@/types';
import Kenat from 'kenat';
export declare function toKenat(date: Date): Kenat;
export declare function toKenatUnit(unit: WithWorkWeek): 'days' | 'weeks' | 'months' | 'years' | 'day' | 'week' | 'month' | 'year';
export declare function gregToJSDate(kenat: Kenat): Date;
export declare function cleanEscapedString(input: string): string;
export declare function getEthiopicComponents(kenatDate: Kenat, options?: FormatOptions): FormatComponent;
export declare function kenatFlexibleFormat(date: Date, formatStr: string, options?: FormatOptions): string;
