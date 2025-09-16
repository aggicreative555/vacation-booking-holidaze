import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import '../../styles/calendar.css'

function CalendarPicker ({ onSelectRange, bookedDates = [] }) {
    const [range, setRange] = useState({ from: undefined, to: undefined });

    const handleSelect = (newRange) => {
        setRange(newRange);
        if (newRange?.from && newRange?.to) {
            onSelectRange(newRange);
        }
    };

    const bookedRanges = bookedDates.map(b => ({
        from: new Date(b.dateFrom),
        to: new Date(b.dateTo),
    }))

    return (
        <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
            <DayPicker
                mode='range'
                selected={range}
                onSelect={handleSelect}
                disabled={{ before: new Date() }}
                modifiers={{ booked: bookedRanges }}
                modifiersClassNames={{ booked: 'bg-gray-200 text-red-800 cursor-not-allowed' }}
                className="calendar"
            />
            {range?.from && range?.to && (
                <p className="text-sm text-center mt-2 text-gray-600 font-caslon">
                    Selected: {range.from.toLocaleDateString()} - {''} {range.to.toLocaleDateString()} 
                </p>
            )}
        </div>
    )

}

export default CalendarPicker;