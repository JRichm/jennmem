"use client"

import { usePathname  } from 'next/navigation'
 
export default function MemoryPage() {
    const pathanme = usePathname()
    return (
        <p>this is the memory page for memory {pathanme}</p>
    )
}