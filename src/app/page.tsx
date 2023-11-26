"use client"

import React, { useEffect, useState } from 'react';
import Timeline from './components/timeline';
import MainHeader from './components/mainHeader';
import '../../public/usDates.json';

const Home = () => {
  const [eventsData, setEventsData] = useState([]);
  const [visiblePictureCount, setVisiblePictureCount] = useState(4);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch('/usDates.json'); // Assuming the file is in the public directory
        const data = await response.json();
        setEventsData(data.dates);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchEventData();

    // Event listener to update visiblePictureCount based on screen width
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth < 768) {
        setVisiblePictureCount(2); // Show 2 pictures for small screens
      } else if (screenWidth < 1024) {
        setVisiblePictureCount(3); // Show 3 pictures for medium screens
      } else {
        setVisiblePictureCount(4); // Show 4 pictures for larger screens
      }
    };

    // Attach the event listener
    window.addEventListener('resize', handleResize);

    // Remove the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array means this effect runs once on component mount

  return (
    <main className='flex flex-col'>
      <MainHeader />
      <div className='max-w-[1000px] w-full self-center'>
        <div className='bg-blue-100 p-5'>
          <Timeline startDate={new Date('2021-01-01')} endDate={new Date('2023-12-31')} events={eventsData} />
        </div>
        <div className='bg-blue-100 h-[275px] flex flex-row gap-5 p-5'>
          {/* Render only the visible number of picture divs */}
          {[...Array(visiblePictureCount)].map((_, index) => (
            <div key={index} className='bg-black/10 w-full h-full'>
              {/* Your picture content */}
            </div>
          ))}
        </div>
        <div className='bg-green-100 p-5'>
          <h1 className='text-3xl'>Our Spots</h1>
        </div>
        <div className='bg-yellow-100 p-5'>
          <h1 className='text-3xl'>Crossword</h1>
          <div className='bg-black/10 h-[300px]'>
            <p>crossword content box</p>
          </div>
        </div>
      </div>
    </main>
  ); 
};

export default Home;