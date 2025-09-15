import { useState } from "react";
import { DayPicker } from "react-day-picker";

function CalendarPicker ({ onSelectRange }) {
    const [range, setRange] = useState({ from: undefined, to: undefined });

    const handleSelect = (newRange) => {
        setRange(newRange);
        if (newRange?.from && newRange?.to) {
            onSelectRange(newRange);
        }
    };

    return (
        <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
            <DayPicker
                mode='range'
                selected={range}
                onSelect={handleSelect}
                disabled={{ before: new Date() }}
                className="flex justify-center"
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