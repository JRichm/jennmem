import React, { useEffect, useState } from 'react';
import './timeline.css'; // Adjust the path based on your file structure

interface Event {
  date: string;
  position?: number;
  title?: string;
  // Add other properties as needed
}

interface TimelineProps {
  startDate: Date;
  endDate: Date;
  events: Event[];
}

const Timeline: React.FC<TimelineProps> = ({ startDate, endDate, events }) => {
  const [items, setItems] = useState<Event[]>([]);

  useEffect(() => {
    const calculatePosition = (eventDate: Date) => {
      const totalDays = (endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000);
      const eventDays = (eventDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000);
      return (eventDays / totalDays) * 100;
    };

    const timelineItems = events.map((event) => ({
      ...event,
      position: calculatePosition(new Date(event.date)),
    }));

    setItems(timelineItems);
  }, [startDate, endDate, events]);

  return (
    <div className='relative'>
      <hr className='absolute border-black block border-2 self-center w-full mt-[23px]' />
      <div className={'timeline'}>
        {items.map((item) => (
          <div key={item.date} className={'timelineItem'} style={{ left: `${item.position}%`,zIndex: 2 }}>
            <div className={'itemContent'}>
              <p>{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;