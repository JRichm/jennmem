"use client"

import React, { useState, useEffect } from 'react'

interface Memory {
    id: number;
    name: string;
    note: string;
    date: string;
}

const MemoryContainer: React.FC<{ memory: Memory }> = ({ memory }) => {

    const [memoryPictures, setPictures] = useState<string[]>([])

    useEffect(() => {
        fetch(`http://localhost:5000/get_mem_pics/${memory.id}/`)
        .then((res) => res.json())
        .then((data) => setPictures(data))   
    })
    
    function clickMemory() {
        window.location.href = `/memories/${memory.id}`
    }

    const displayDate = new Date(memory.date).toLocaleString("default", {year: "numeric", month: "long", day: "numeric"})

    return (
        <div className='bg-pink-300 hover:cursor-pointer p-3 rounded-xl' key={memory.id} onClick={clickMemory}>
            <h3 className='text-xl font-medium tracking-wide p-1'>{memory.name}</h3>
            <p>{memory.note}</p>
            <p>poop{memoryPictures}</p>
            <p className='text-right mt-2 text-black/50'>{displayDate}</p>
        </div>
    );
}

export default MemoryContainer