export default function MainHeader() {
    return (
        <div className="flex flex-col bg-pink-600 h-36">
            <span className="flex flex-row gap-3 m-3">
                <a className="text-white hover:bg-white/10 hover:shadow-md hover:shadow-pink-800/50 w-36 py-1 text-center rounded-md transition-all" href="/picture/new">add picture</a>
                <a className="text-white hover:bg-white/10 hover:shadow-md hover:shadow-pink-800/50 w-36 py-1 text-center rounded-md transition-all" href="/memory/new">new memory</a>
            </span>
            <div className="flex flex-row self-center text-2xl text-white gap-6 align-center tracking-widest">
                <p className="mt-3">J</p>
                <p className="text-5xl">♥</p>
                <p className="mt-3">J</p>
            </div>
        </div>
    )
}