import React from 'react';

interface ItemType {
  dateID: number;
  date: string;
  title: string;
  location: string;
}

interface TimelineItemProps {
  item: ItemType | undefined;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  isHovered: boolean;
}


export default function TimelineItem({ item, handleMouseEnter, handleMouseLeave, isHovered, }: TimelineItemProps) {
  return (
    <div
      className={`timeline-item ${isHovered ? 'hovered' : ''} `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="timeline-item-info">
        <div>{item?.date}</div>
        <div>{item?.title}</div>
        <div>{item?.location}</div>
        {/* Add logic to display pictures or other information */}
      </div>
    </div>
  );
};