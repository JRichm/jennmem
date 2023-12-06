"use client"

import React, { useState, useEffect } from 'react'
import MainHeader from "../components/mainHeader"
import MemoryContainer from './components/memoryContainer';
import Image from 'next/image'

interface Memory {
    id: number;
    name: string;
    note: string;
    date: string;
}

export default function AllMemoriesPage() {
    const [memories, setMemories] = useState<Memory[]>([]);
    const [isLoading, setLoading] = useState(true);

    // fetch memories
    useEffect(() => {
        fetch('http://localhost:5000/get_memories')
            .then((res) => res.json())
            .then((data) => {
                console.log('typeof(data)')
                console.log(typeof(data))
                console.log(data)
                setMemories(data)
                setLoading(false)
            })
    }, [])

    const splitMemories = () => {
        // Check if there are memories and split them into two arrays
        if (memories.length > 0) {
            const halfIndex = Math.ceil(memories.length / 2);
            const firstHalf = memories.slice(0, halfIndex);
            const secondHalf = memories.slice(halfIndex);
            return [firstHalf, secondHalf];
        }
        return [[], []]; // Return empty arrays if no memories
    };

    const [firstColumnMemories, secondColumnMemories] = splitMemories();

    const MemoryContainer: React.FC<{ memory: Memory }> = ({ memory }) => {

        const [memoryPictures, setPictures] = useState<string[]>([])

        let imageURL;

        useEffect(() => {
            fetch(`http://localhost:5000/get_mem_pics/${memory.id}`)
            .then((res) => res.json())
            .then((data) => setPictures(data))   
        }, [])
        
        function clickMemory() {
            window.location.href = `/memories/${memory.id}`
        }
    
        const displayDate = new Date(memory.date).toLocaleString("default", {year: "numeric", month: "long", day: "numeric"})
    
        if (memoryPictures.length > 0) {
            imageURL = memoryPictures[0]['data'].replace(/\\/g, '/');
        }
        
        return (
            <div className='bg-pink-300 hover:cursor-pointer p-3 rounded-xl' key={memory.id} onClick={clickMemory}>
                <h3 className='text-xl font-medium tracking-wide p-1'>{memory.name}</h3>
                <p>{memory.note}</p>
                {
                    imageURL ? (
                        <div>
                            <p>{`${imageURL.replace(/public/g, '')}`}</p>
                            <Image src={`${imageURL.replace(/public/g, '')}`} width={100} height={100} alt={'new'} className='w-full' />
                        </div>
                    ) : (
                        <div></div>
                    )
                }
                
                <p className='text-right mt-2 text-black/50'>{displayDate}</p>
            </div>
        );
    }

    const MemoryColumn: React.FC<{ memories: Memory[] }> = ({ memories }) => {
        return (
            <div className="flex flex-col gap-6">
                {memories.map((memory: Memory, index: number) => (
                    <MemoryContainer key={index} memory={memory} />
                ))}
            </div>
        );
    };

    return (
        <main className='flex flex-col'>
            <MainHeader />
            <div className='flex justify-center'>
                <div className='grid grid-cols-2 p-6 gap-6 max-w-[1000px] bg-gray-100'>
                    <MemoryColumn memories={firstColumnMemories} />
                    <MemoryColumn memories={secondColumnMemories} />
                </div>
            </div>
        </main>
    );
}