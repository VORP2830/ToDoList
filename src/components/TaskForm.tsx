import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';

import style from './TaskForm.module.css'
import { ITask } from '../interfaces/Task'

interface Props {
    btnText: string;
    taskList: ITask[];
    setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>
    task?: ITask | null
    handleUpdate?(id: number, title: string, descriptions: string): void
}

function TaskForm({btnText, taskList, setTaskList, task, handleUpdate}: Props) {

    const [id, setId] = useState<number>(0)
    const [title, setTitle] = useState<string>("")
    const [descriptions, setDescriptions] = useState<string>("")

    useEffect(() => {
        if(task){
            setId(task.id)
            setTitle(task.title)
            setDescriptions(task.descriptions)
        }
    }, [task])

    const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(handleUpdate){
            handleUpdate(id, title, descriptions)
        }else{
            const id = Math.floor(Math.random() * 1000)
            const newTask: ITask = {id, title, descriptions}
            setTaskList!([...taskList, newTask])
            setTitle("")
            setDescriptions("")
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.name == 'title'){
            setTitle(e.target.value)
        }else{
            setDescriptions(e.target.value)
        }
    }

    return (
        <form onSubmit={addTaskHandler} className={style.form}>
            <div className={style.input_container}>
                <label htmlFor="title">Titulo:</label>
                <input type='text' name='title' placeholder='Titulo da tarefa' onChange={handleChange} value={title}/>
            </div>
            <div className={style.input_container}>
                <label htmlFor="title">Descrição:</label>
                <input type='text' name='descriptions' placeholder='Descrição da tarefa' onChange={handleChange} value={descriptions}/>
            </div>
            <input type='submit' value={btnText}/>
        </form>
    )
}

export default TaskForm;