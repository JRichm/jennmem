"use client"

import React, { useState } from 'react'

import MainHeader from "@/app/components/mainHeader";

export default function NewPicture() {

    const [uploadedImages, setUploadedImages] = useState([])

    const AttachedImages = () => {
        const numImages = uploadedImages.length
    }
    return (
        <main className="flex flex-col">
            <MainHeader />
            <div className="flex flex-col items-center">
                <form className="flex flex-col bg-gray-100 items-center">
                    <label htmlFor="imageUpload">Upload Image</label>
                    <AttachedImages />
                    <input type='file'></input>
                </form>
            </div>
        </main>
    )
}