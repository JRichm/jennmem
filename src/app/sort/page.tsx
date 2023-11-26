"use client"

import React, { useState } from 'react'

export default function Sort() {
    const [selectedPictures, setSelectedPictures] = useState<number[]>([]);
  
    const fakePictures = Array.from({ length: 31 }, (_, index) => index);

    return (
        <div className='bg-white min-h-screen flex flex-col'>
          <div className='bg-header min-h-[150px] bg-red-300 fixed w-full block'>
          </div>
          <div className='flex flex-row justify-between mt-[150px]'>
            <div className='content-container w-full bg-blue-500'>
              <div className='grid grid-cols-4 m-12'>
                {fakePictures.map((image) => (
                  <ImageContainer key={image} />
                ))}
              </div>
            </div>
            <div className='form-container w-[45%] min-h-[90vh] bg-green-500'>
              <NewMemoryForm selectedPictures={selectedPictures} />
            </div>
          </div>
        </div>
      );
    }
    
    interface NewMemoryFormProps {
      selectedPictures: number[];
    }
    
    function NewMemoryForm({ selectedPictures }: NewMemoryFormProps) {
      return (
        <div className='fixed flex flex-col w-full'>
            <form className='flex flex-col w-full'>
                <input type='text' placeholder='Memory Title'></input>
                <div>
                    <p>selected images</p>
                    <div className='min-h-[400px] bg-black/25 w-full'>
                        
                    </div>
                </div>
                <input type='textbox' placeholder='Memory Note'></input>
            </form>
        </div>
      );
    }
    
    function ImageContainer() {
      return (
        <div className='image-container p-5 w-fit m-6 bg-black/25'>
          <div className='image-preview h-[200px] w-[200px] bg-black'></div>
          <div className='mt-3'>
            <p>Main info</p>
            <p>More info</p>
            <p>S'more info</p>
          </div>
        </div>
      );
    }