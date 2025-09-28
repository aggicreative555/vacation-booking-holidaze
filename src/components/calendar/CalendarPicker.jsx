import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import '../../styles/calendar.css';

function CalendarPicker({ onSelectRange, bookedDates = [] }) {
  const [range, setRange] = useState({ from: undefined, to: undefined });

  const handleSelect = (newRange) => {
    setRange(newRange);
    if (newRange?.from && newRange?.to) {
      onSelectRange(newRange);
    }
  };

  const bookedRanges = bookedDates.map((b) => ({
    from: new Date(b.dateFrom),
    to: new Date(b.dateTo),
  }));

  return (
    <div className="border border-brown-200 rounded-md p-4 bg-light">
      <DayPicker
        mode="range"
        selected={range}
        onSelect={handleSelect}
        disabled={{ before: new Date() }}
        modifiers={{ booked: bookedRanges }}
        modifiersClassNames={{
          booked: 'bg-brown-200 text-crimson cursor-not-allowed',
        }}
        className="calendar"
      />
      {range?.from && range?.to && (
        <p className="text-base font-garamond italic text-center mt-2 text-brown-300">
          Selected: {range.from.toLocaleDateString()} - {''}{' '}
          {range.to.toLocaleDateString()}
        </p>
      )}
    </div>
  );
}

export default CalendarPicker;
