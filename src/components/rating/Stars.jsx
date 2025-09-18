import { Sparkle } from 'lucide-react';

const Stars = ({ rating = 0, max = 5 }) => {
  return (
    <div className={`flex gap-1`}>
      {[...Array(max)].map((_, index) => (
        <Sparkle
          key={index}
          size={16}
          strokeWidth={1}
          className={
            index < Math.round(rating)
              ? 'text-amber-800 fill-amber-800'
              : 'text-gray-300'
          }
        />
      ))}
    </div>
  );
};

export default Stars;
