"use client"
import * as exif from 'exif-js';
import React, { useState } from 'react'
import { redirect } from 'next/navigation'
import Image from 'next/image'

import MainHeader from "@/app/components/mainHeader";
import { METHODS } from 'http';

export default function NewMemoryPage() {

    interface formDataType {
        memoryName: string;
        memoryDate: Date;
        memoryDetails: string;
    }
    
    const [uploadedImages, setUploadedImages] = useState<string[]>([])  // array of images uploaded so far
    const [uploadedImageDate, setUploadedImageDate] = useState("")      // suggested date when user uploads pictures with attached date
    const [formData, setFormData] = useState<formDataType>({memoryName: "", memoryDate: new Date(), memoryDetails: ""}) // form data / user input

    // handle user input 
    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {

        // get values from changed input
        const { name, value } = e.target;

        // update formData with new input        
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    
    // handle image upload
    async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement & { target: { files: FileList } }>) {

        // get file(s) from file input
        const fileList = event.target.files;
        if (!fileList) return;
    
        // convert list to array
        const imagesArray = Array.from(fileList);
    
        // loop through file(s)
        for (const imageFile of imagesArray) {

            // get url from image
            const dataURL = await readFileAsync(imageFile);

            // add url to list of all uploaded images
            setUploadedImages((prevImages) => [...prevImages, dataURL]);
        }
    }

    async function readFileAsync(file: File): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                resolve(e.target?.result as string);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    async function saveMemory(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log('saving memory')

        // call api to add new memory to database
        try {
            const memoryResponse = await fetch('http://localhost:5000/new_memory', {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                // redirect: "follow",
                body: JSON.stringify(formData)
            })

            console.log(memoryResponse)

            if (!memoryResponse.ok) {
                throw new Error("Network response was not ok")

            }

            const data = await memoryResponse.json();
            console.log('Memory data:', data);

            // Iterate over each uploaded image
            for (const imageData of uploadedImages) {
                try {
                    // Convert the base64 image data to a Blob
                    const blobData = await (await fetch(imageData)).blob();
            
                    // Create a FormData object to send the Blob to the server
                    const formData = new FormData();
                    formData.append('memoryId', data.memoryId);
                    formData.append('imageData', blobData);
            
                    console.log("memoryid:");
                    console.log(data);
            
                    // Now, send the FormData object to the server using a FormData-compatible request
                    const pictureResponse = await fetch('http://localhost:5000/add_picture', {
                        method: 'POST',
                        body: formData,
                    });
            
                    if (!pictureResponse.ok) {
                        throw new Error('Failed to save picture');
                    }
            
                    console.log('pictureResponse');
                    console.log(pictureResponse);
            
                } catch (pictureError) {
                    console.error('Error saving picture:', pictureError);
                }
            }

            window.location.href = '/memories'
        
        // catch errors
        } catch (error) {
            console.error(error)
        }
    }

    const AttachedImages = () => {
        const numImages = uploadedImages.length;
        const numCols = 4;
        let numRows = Math.ceil(numImages / numCols);
        if (numRows == 0) numRows = 1
       
        let elements = [];

        for (let i = 0; i < numRows * numCols; i++) {
            elements.push(
                <div key={i} className='flex aspect-square'>
                    { i < numImages ? (
                        <div className='h-full w-full'>
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
                    <h1 className='text-xl m-3 tracking-[5px] font-medium'>New Memory...</h1>
                    <form className="flex flex-col gap-2 w-[500px]" onSubmit={saveMemory}>
                        <label className='mb-[-7px] mt-3' htmlFor="memoryName">Name of memory</label>
                        <input type="text" name="memoryName" className='p-1' onChange={handleInputChange}></input>
                        <label className='mb-[-7px] mt-3' htmlFor="memoryDate">Memory date</label>
                        <input type="date" name="memoryDate" className='p-1' onChange={handleInputChange}></input>
                        { uploadedImageDate &&
                            <span className='flex flex-row justify-between'>
                                <p className='text-sm'>Did this memory take place on { uploadedImageDate }?</p>
                                <div className='flex flex-row gap-3'>
                                    <input type="button" value="Set Date" className='bg-blue-500 text-white px-6 rounded hover:cursor-pointer text-sm'></input>
                                </div>
                            </span>
                        }
                        <label className='mb-[-7px] mt-3' htmlFor="memoryDetails">Memory details</label>
                        <textarea name="memoryDetails" className='p-1' onChange={handleInputChange}></textarea>
                        <label htmlFor="memoryImages" className='mb-[-7px] mt-3'>Pictures</label>
                        <AttachedImages />
                        <div className='mb-[-7px] mt-3'>
                            <input type="file" accept="image/*" onChange={handleImageUpload}></input>
                        </div>
                        <span className='flex flex-row justify-end gap-4 mt-4'>
                            <input type="button" value={"cancel"} className='bg-red-500 px-8 py-1 rounded-lg text-white font-medium self-end hover:cursor-pointer hover:bg-red-700 transition-all' onClick={e => window.location.href = '/memories'}></input>
                            <input type="submit" value={"add"} className='bg-green-500 px-8 py-1 rounded-lg text-white font-medium self-end hover:cursor-pointer hover:bg-blue-700 transition-all'></input>
                        </span>
                    </form>
                </div>
            </div>
        </main>
    )
}