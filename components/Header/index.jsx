import Link from "next/link";

export default function Header () {
    return (
        <header className="bg-indigo-500 py-8 px-6 md:px-24 flex items-center justify-between">
            <Link href="/" className="text-white font-bold text-2xl transition-all hover:text-emerald-500">MyTask</Link>
            <nav>
                <ul className="flex gap-8">
                    <li className="font-bold text-white text-xl transition-all hover:text-emerald-500">
                        <Link href="/new-todo">Add Task</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}