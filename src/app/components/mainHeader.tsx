export default function MainHeader() {
    return (
        <div className="flex flex-col bg-pink-600 h-36">
            <span className="flex flex-row gap-3 m-3">
                <a className="text-white hover:bg-white/10 hover:shadow-md hover:shadow-pink-800/50 w-36 py-1 text-center rounded-md transition-all" href="/pictures">pictures</a>
                <a className="text-white hover:bg-white/10 hover:shadow-md hover:shadow-pink-800/50 w-36 py-1 text-center rounded-md transition-all" href="/pictures/new">add picture</a>
                <a className="text-white hover:bg-white/10 hover:shadow-md hover:shadow-pink-800/50 w-36 py-1 text-center rounded-md transition-all" href="/memories">memories</a>
                <a className="text-white hover:bg-white/10 hover:shadow-md hover:shadow-pink-800/50 w-36 py-1 text-center rounded-md transition-all" href="/memories/new">new memory</a>
                {/* <a className="text-white hover:bg-white/10 hover:shadow-md hover:shadow-pink-800/50 w-36 py-1 text-center rounded-md transition-all" href="/discrepancies">discrepancies</a> */}
            </span>
            <div className="flex flex-row self-center text-2xl text-white gap-6 align-center tracking-widest">
                <p className="mt-3"></p>
            </div>
        </div>
    )
}