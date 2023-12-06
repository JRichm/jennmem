"use client"

import React, { useState, useEffect } from 'react'
import MainHeader from "../components/mainHeader"

interface Memory {
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

    const MemoryContainer: React.FC<{ memory: Memory }> = ({ memory }) => {
        return (
            <div>
                <h3 className='text-xl'>{memory.name}</h3>
                <p>{memory.note}</p>
                <p>{memory.date}</p>
            </div>
        )
    }

    const MemoryColumn: React.FC = () => {
        return (
          <div className="flex flex-col">
            {memories.map((memory: Memory, index: number) => (
                <MemoryContainer key={index} memory={memory} />
            ))}
          </div>
        );
      };

    return (
        <main className='flex flex-col'>
            <MainHeader />
            <MemoryColumn />
        </main>
    )
}