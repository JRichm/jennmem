"use client"

import React, { useState } from 'react'

import MainHeader from "@/app/components/mainHeader";

export default function NewMemoryPage() {

    const [uploadedImages, setUploadedImages] = useState([])

    const AttachedImages = () => {
        const numImages = uploadedImages.length

        
    }

    return (
        <main>
            <MainHeader />
            <div className="flex flex-col items-center m-3">
                <form className="bg-gray-100 flex flex-col gap-2 m-2">
                    <label htmlFor="memoryName">Name of memory</label>
                    <input type="text" name="memoryName"></input>
                    <label htmlFor="memoryName">Memory date</label>
                    <input type="text" name="memoryName"></input>
                    <label htmlFor="memoryDetails">Memory details</label>
                    <input type="textbox" name="memoryDetails"></input>
                    <label htmlFor="memoryImages">Pictures</label>
                    <AttachedImages />
                    <div>
                        <input type="file"></input>
                    </div>
                    <p>{uploadedImages.length}</p>
                </form>
            </div>
        </main>
    )
}