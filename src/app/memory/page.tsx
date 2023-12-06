"use client"

import React, { useState, useEffect } from 'react'
import MainHeader from "../components/mainHeader"


export default function AllMemoriesPage() {
    interface Memory {
        name: string;
        note: string;
        date: Date;
        created: Date;
        updated: Date;
    }

    interface MemoryList {
        memories: Memory[]
    }
    
    const [memories, setMemories] = useState<MemoryList>();
    const [isLoading, setLoading] = useState(true);

    // fetch memories
    useEffect(() => {
        fetch('http://localhost:5000/get_memories')
            .then((res) => res.json())
            .then((data) => {
                setMemories(data)
                setLoading(false)
            })
    }, [])

    const ImageColumn = () => {
        return (
            <div className="flex flex-col">
                
            </div>
        )
    }

    return (
        <main className='flex flex-col'>
            <MainHeader />
            <div>
                <p></p>
            </div>
            <div className="flex flex-row">
                <ImageColumn />
                <ImageColumn />
            </div>
        </main>
    )
}