"use client"

import MainHeader from '@/app/components/mainHeader'

import React, { useState, useEffect } from 'react'
import { useParams, usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation';

interface MemoryDataType {
    id: number;
    name: string;
    note: string;
    date: Date;
    updated: Date;
    created: Date;
}

export default function MemoryPage() {
    const [memoryData, setMemoryData] = useState<MemoryDataType | undefined>();
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/memory/${id}`, {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
                const data = await response.json();
                setMemoryData(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    console.log(memoryData)

    return (
        <main className='flex flex-col'>
            <MainHeader />
                {
                    memoryData ? (
                        <div className='flex flex-row self-center max-w-[1555px]'>
                            <div className='bg-yellow-100 px-12 py-6'>
                                <div className='bg-black/20 w-[850px] h-[600px] m-8'>
                                    {loading ? <p>Loading...</p> : <p>{memoryData.id}</p>}
                                </div>
                                <div className='bg-red-500 h-36'></div>
                            </div>
                            <div className='bg-green-200 w-[555px]'>
                                <div className='m-12'>
                                    <h1 className='text-2xl font-medium p-2'>{memoryData.name}</h1>
                                    <p className='text-[18px]'>{memoryData.note}</p>
                                    <p className='text-end p-2'>{new Date(memoryData.date).toLocaleString('default', { year: "numeric", month: "long", day: "numeric" })}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <p>error loading memory data</p>
                        </div>
                    )
                }
        </main>
    );
}