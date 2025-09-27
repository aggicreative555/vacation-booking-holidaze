import { Sparkle } from 'lucide-react';

const Stars = ({ rating = 0, max = 5 }) => {
  return (
    <div className={`flex gap-1`}>
      {[...Array(max)].map((_, index) => (
        <Sparkle
          key={index}
          size={24}
          strokeWidth={1}
          className={
            index < Math.round(rating)
              ? 'text-sand-300 fill-sand-300'
              : 'text-brown-200 fill-brown-200'
          }
        />
      ))}
    </div>
  );
};

export default Stars;
