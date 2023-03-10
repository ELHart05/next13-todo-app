'use client'

import Link from "next/link";
import { UilTrashAlt, UilEdit } from '@iconscout/react-unicons'
import { useRouter } from "next/navigation"
import { Alert, Grow, Snackbar } from '@mui/material';
import { useState } from "react";

export default function TodoCard ({ title, completed, id, editMode }) {
    const router = useRouter();
    const deleteTask = async () => {
        const res = await fetch(`http://localhost:4000/tasks/${id}`, {
            method: 'DELETE'
        })
        setOpen(true);
    }
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    return (
    <>
        <Link href={`/todo/${id}`} className="relative shadow-2xl cursor-pointer transition-all duration-500 hover:shadow-none w-full flex flex-col gap-4 border-transparent border-[1px] rounded-md bg-slate-400 p-4">
            <h3 className='text-white font-bold text-xl'>{`${title[0].toUpperCase()}${title.slice(2)} (${id})`}</h3>
            <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi nobis voluptatibus mollitia aliquam consectetur veniam beatae ullam distinctio est minus.</h5>
            <p>Status: <span className={`${(completed) ? 'text-green-900' : 'text-red-400'}`}>{(completed) ? 'COMPLETED' : 'NOT COMPLETED' }</span></p>
            <div className={`edit-delete ${(editMode) ? 'flex' : 'hidden'} gap-2 absolute top-1 right-1`}>
                <Link href={`/edit-todo/${id}`} className="bg-white transition-all hover:bg-emerald-500 p-1 rounded-full">
                    <UilEdit />
                </Link>
                <div onClick={deleteTask} className="bg-white transition-all hover:bg-red-500 p-1 rounded-full">
                    <UilTrashAlt />
                </div>
            </div>
        </Link>
        <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={500}
        TransitionComponent={Grow}
        onClose={() => {setOpen(false); router.push('/')}}
        action={() => {router.push('/')}}
        >
            <Alert onClose={() => {setOpen(false); router.push('/');}} severity="error" sx={{ width: '100%' }}>
                Deleted Successfully
            </Alert>
        </Snackbar>
    </>
    )
}