"use client"

import React, { useState } from 'react'
import Image from 'next/image'

import MainHeader from "@/app/components/mainHeader";

export default function NewMemoryPage() {

    const [uploadedImages, setUploadedImages] = useState<string[]>([])
    
    function getImageFromInput(event: React.ChangeEvent<HTMLInputElement>) { 
        const fileList = event.target.files;

        if (!fileList) return;

        const imagesArray = Array.from(fileList);

        const imagePromises = imagesArray.map((imageFile) => {
            return new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    resolve(e.target?.result as string); // Explicitly cast to string
                };
                
                reader.onerror = reject;
                reader.readAsDataURL(imageFile);
            });
        });

        Promise.all(imagePromises).then((imageDataURLs) => {
            setUploadedImages((prevImages) => [...prevImages, ...imageDataURLs]);
        })
        .catch((error) => {
            console.error('Error reading image files:', error)
        })
    }

    const AttachedImages = () => {
        const numImages = uploadedImages.length;
        const numCols = 4;
        let numRows = Math.ceil(numImages / numCols); // Use Math.ceil to ensure correct numRows
       
        let elements = [];
        if (numRows == 0) numRows = 1

        for (let i = 0; i < numRows * numCols; i++) {
            elements.push(
                <div key={i} className='flex aspect-square'>
                    { i < numImages ? (
                        <div className='bg-black h-full w-full'>
                            <img src={uploadedImages[i]} alt={`uploaded-${i}`} className='h-full w-full object-cover' />
                        </div>
                    ) : (
                        <div className='bg-black/10 rounded-lg h-full w-full flex items-center justify-center hover:bg-black/25 cursor-pointer transition-all'>
                            <Image src="/plus_icon.png" width={75} height={75} alt={'new'} className='opacity-[25%]' />
                        </div>
                    )}
                </div>
            );
        }

        return (
            <div className={`grid grid-cols-${numCols} gap-2`}>
                { elements }
            </div>
        );
    }

    return (
        <main>
            <MainHeader />
            <div className="flex flex-col items-center">
                <div className='bg-gray-100 flex flex-col items-center p-6'>
                    <h1 className='text-xl m-3 tracking-[5px] font-medium'>Add Pictures...</h1>
                    <form className="flex flex-col gap-2 w-[500px]">
                        <label className='mb-[-7px] mt-3' htmlFor="memoryDate">Picture Date</label>
                        <input type="date" name="memoryDate" className='p-1'></input>
                        <label htmlFor="memoryImages" className='mb-[-7px] mt-3'>Pictures</label>
                        <AttachedImages />
                        <div className='mb-[-7px] mt-3'>
                            <input type="file" accept="image/png, image/gif, image/jpeg" onChange={getImageFromInput}></input>
                        </div>
                        <span className='flex flex-row justify-end gap-4 mt-4'>
                            <input type="submit" value={"cancel"} className='bg-red-500 px-8 py-1 rounded-lg text-white font-medium self-end hover:cursor-pointer hover:bg-red-700 transition-all'></input>
                            <input type="submit" value={"add"} className='bg-blue-500 px-8 py-1 rounded-lg text-white font-medium self-end hover:cursor-pointer hover:bg-blue-700 transition-all'></input>
                        </span>
                    </form>
                </div>
            </div>
        </main>
    )
}