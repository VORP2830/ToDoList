import { ITask } from "../interfaces/Task";
import style from './TaskList.module.css'

interface Props {
    taskList: ITask[]
    handleDelete(id: number): void
    handleEdit(task : ITask): void
}

function TaskList({ taskList, handleDelete, handleEdit }: Props) {
    return (
        <>
            {taskList.length > 0 ? (
                taskList.map((task) => (
                    <div key={task.id} className={style.task}>
                        <div className={style.details}>
                            <h4>{task.title}</h4>
                            <br></br>
                            <h4>Descrição:</h4>
                            <p>{task.descriptions}</p>
                        </div>
                        <div className={style.actions}>
                            <i className="bi bi-pencil" onClick={() => {handleEdit(task)}}></i>
                            <i className="bi bi-trash" onClick={() => {handleDelete(task.id)}}></i>
                        </div>
                    </div>
                ))
            ) : (
                <p>Não há tarefas cadastradas</p>
            )}
        </>
    )
}

export default TaskList;