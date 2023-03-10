'use client'

import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Alert, Grow, Snackbar } from '@mui/material'

export default function EditTodo(props) {

    const [open, setOpen] = useState(false);
    const formRef = useRef("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState("");

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`http://localhost:4000/tasks/${props.params.id}`);
            const data = await res.json();
            setTitle(data.title);
            setDescription(data.description);
            setCompleted(data.completed);
        }
        fetchData();
    }, [])

    const router = useRouter();

    const submitNewTask = async (e) => {
        e.preventDefault();
        const editTask = {
            title, description, completed
        }
        const res = await fetch(`http://localhost:4000/tasks/${props.params.id}`, {
            method: 'PATCH',
            body: JSON.stringify(editTask),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        setOpen(true);
    }

    return (
    <main>
        <h1 className='font-bold text-4xl'>New task</h1>
        <div className="mt-6">
            <form ref={formRef} className="max-w-[600px] p-16 rounded-md bg-gray-400 shadow-md w-full flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-xl font-bold" htmlFor="title">Title</label>
                    <input required autoFocus={true} className="rounded-md shadow-md outline-none p-2 transition-all focus:shadow-none border-none" name="title" id="title" type="text" value={title} onChange={(e) => {setTitle(e.target.value)}} />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xl font-bold" htmlFor="description">Description</label>
                    <textarea required className="rounded-md shadow-md outline-none p-2 min-h-[120px] transition-all focus:shadow-none border-none resize-none" name="description" id="description" value={description} onChange={(e) => {setDescription(e.target.value)}}></textarea>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <label className={`text-xl transition-all font-bold ${(completed) ? 'text-emerald-700' : 'text-red-500'}`} htmlFor="completed">Completed?</label>
                        <input required className="h-7 w-7 cursor-pointer" name="completed" id="completed" checked={completed} onChange={(e) => {setCompleted(!completed)}} type="checkbox" />
                    </div>
                    <button disabled={open} className="w-fit border-none px-4 py-2 rounded-md text-white font-bold border bg-emerald-600 transition-all hover:bg-red-600" onClick={submitNewTask}>Done</button>
                </div>
            </form>
            <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            autoHideDuration={500}
            TransitionComponent={Grow}
            onClose={() => {setOpen(false); router.push('/')}}
            action={() => {router.push('/')}}
            >
                <Alert onClose={() => {setOpen(false); router.push('/')}} severity="success" sx={{ width: '100%' }}>
                    Edited Successfully
                </Alert>
            </Snackbar>
        </div>
    </main>
    )
}