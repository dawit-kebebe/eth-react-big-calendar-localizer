# eth-react-big-calendar-localizer

Ethiopian calendar localizer for `react-big-calendar` — a drop-in localizer that makes the calendar display and handle Ethiopian dates while remaining fully compatible with events and all built-in views.

## Features

- Drop-in `localizer` for `react-big-calendar`.
- Full support for events (start/end) and all views: `day`, `week`, `work_week`, `month`, `agenda`.
- Works as an alternative to `momentLocalizer` or other localizers.

## Installation

Install from npm:

```bash
npm install eth-react-big-calendar-localizer
# or
pnpm add eth-react-big-calendar-localizer
# or
yarn add eth-react-big-calendar-localizer
```

## Quick Example and Live Demo

- [Live Demo Here](http://eth-react-big-calendar-localizer.dawit-kebebe.github.io/)

- Below is a minimal example showing how to swap between the Gregorian (`momentLocalizer`) and the Ethiopian localizer in a React app.

```jsx
import { useState } from 'react'
import { ethLocalizer } from 'eth-react-big-calendar-localizer'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import type { View } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import moment from 'moment'

const localizer = momentLocalizer(moment)
const today = new Date()

function App() {
	const [calendar, setCalendar] = useState<'gregorian' | 'ethiopian'>('gregorian');
	const [date, setDate] = useState(today);
	const [view, setView] = useState<View>('month');
	const [events, setEvents] = useState([
		{
			title: 'Meeting',
			start: today,
			end: new Date(today.getTime() + 60 * 60 * 1000),
		},
		{
			title: 'Lunch',
			start: new Date(today.getTime() + 120 * 60 * 1000),
			end: new Date(today.getTime() + 180 * 60 * 1000),
		}
	])

	return (
		<div className='calendar-container'>
			<div className='calendar-controls'>
				<label>
					Select Calendar:
					<select value={calendar} onChange={(e) => setCalendar(e.target.value as 'gregorian' | 'ethiopian')}>
						<option value="gregorian">Gregorian</option>
						<option value="ethiopian">Ethiopian</option>
					</select>
				</label>
			</div>

			<Calendar
				localizer={calendar === 'gregorian' ? localizer : ethLocalizer}
				events={events}
				startAccessor="start"
				endAccessor="end"
				style={{ height: '80vh' }}

				date={date}
				view={view}
				onNavigate={(newDate) => setDate(newDate)}
				onView={(newView) => setView(newView)}
			/>
		</div>
	)
}

export default App
```

## Usage Notes

- Pass `ethLocalizer` to the `localizer` prop of `react-big-calendar` to enable Ethiopian date rendering and navigation.
- Events (with `start` and `end` as JS `Date` objects) are fully supported — the localizer handles display and view calculations.
- All standard calendar views are supported: `day`, `week`, `work_week`, `month`, and `agenda`.

## Contributing

Contributions, issues, and feature requests are welcome. See the repository on GitHub for source, development instructions, and to open issues or pull requests:

https://github.com/dawit-kebebe/eth-react-big-calendar-localizer

## License

See the `LICENSE` file in this repository.

---

If you need help integrating this localizer into your app or want a feature added (for example, timezone support or custom format hooks), please open an issue on the GitHub repo.

Last but not least do not forget to 🌟 star the repo. ✌️ peace!!