// import { enUS } from "date-fns/locale";
import { dateFnsLocalizer } from "react-big-calendar";
import { format } from "@/src/format";
import { startOf } from "@/src/startOf";
import { endOf } from "@/src/endOf";
import { add } from "@/src/add";
import { range } from "@/src/range";
import { getDay } from "@/src/getDay";
import { visibleDays } from "@/src/visibleDays";
import { firstVisibleDayForMonth } from "@/src/firstVisibleDayForMonth";
import { lastVisibleDayForMonth } from "@/src/lastVisibleDayForMonth";
import { eq } from "@/src/eq";
import { lt } from "@/src/lt";
import { lte } from "@/src/lte";
import { gt } from "@/src/gt";
import { gte } from "@/src/gte";
import { neq } from "@/src/neq";
import { inRange } from "@/src/inRange";
import { toKenat, gregToJSDate } from "@/utils";

// const locales = {
//     "en-US": enUS,
// };

function startOfWeek() {
    return 0
}

const ethLocalizer = dateFnsLocalizer({
    // locales: locales,
    format,
    startOf,
    endOf,
    add,
    range,
    getDay,
    startOfWeek
});

ethLocalizer.startOf = startOf;
ethLocalizer.endOf = endOf;
ethLocalizer.add = add;
ethLocalizer.range = range;
ethLocalizer.visibleDays = visibleDays
ethLocalizer.firstVisibleDay = firstVisibleDayForMonth;
ethLocalizer.lastVisibleDay = lastVisibleDayForMonth;
ethLocalizer.eq = eq
ethLocalizer.lt = lt
ethLocalizer.lte = lte
ethLocalizer.gt = gt
ethLocalizer.gte = gte
ethLocalizer.neq = neq
ethLocalizer.inRange = inRange

export {
    startOf,
    endOf,
    add,
    range,
    visibleDays,
    firstVisibleDayForMonth,
    lastVisibleDayForMonth,
    eq,
    lt,
    lte,
    gt,
    gte,
    neq,
    inRange,

    toKenat,
    gregToJSDate,

    ethLocalizer
}