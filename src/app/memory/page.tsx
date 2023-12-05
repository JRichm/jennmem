export default function AllMemoriesPage() {

    interface MemoryElementProps {
        title: string;
        date: string;
        pictures: string;
    }

    const numMemories = 30;
    let memoryElements = [];

    const MemoryElement = ({title, date, pictures}: MemoryElementProps) => {
        return (
            <div className="bg-pink-600 flex flex-col justify-center m-6 p-3 w-[250px]">
                <div className="w-full aspect-square bg-black"></div>
                <p>{title}</p>
                <p className="">{date}</p>
            </div>
        )
    }

    for (let i = 0; i < numMemories; i++) {
        memoryElements.push(<MemoryElement title={`${i}`} date={`${i}`} pictures={`${i}`} />)
    }

    return (
        <div className="flex flex-col items-center">
        </div>
    )
}