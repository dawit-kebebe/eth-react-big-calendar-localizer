import type { GridData } from "@/types"
import Kenat from 'kenat';

export function getDayOfWeek(days: GridData[], kenat: Kenat): GridData | undefined {
    return days.find((day: GridData | undefined) =>
        Boolean(day && day.ethiopian && day.ethiopian.day === kenat.ethiopian.day)
    );
}
