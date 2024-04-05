import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskId: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
    updateTaskTitle: (todolistID: string, taskID: string,newTitle: string) => void
}

export function Todolist(props: PropsType) {
    const onAllClickHandler = () => props.changeFilter(props.todolistID, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistID, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistID, "completed");
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistID)
    }

    //фукнция фильтрации тасок
    const filterForTasks = (tasks: Array<TaskType>, filter: FilterValuesType) => {
        if (filter === "active") {
            return tasks.filter(t => !t.isDone);
        }
        if (filter === "completed") {
            return tasks.filter(t => t.isDone);
        }
        return tasks
    }
    const filteredTask = filterForTasks(props.tasks, props.filter);

    const addTaskHandler = (newTitle: string) => {
    props.addTask(props.todolistID,newTitle)
    }

    return <div>
        <h3>
            <button onClick={removeTodolistHandler}> - del -</button>
            {props.title}
        </h3>
        <AddItemForm callBack={addTaskHandler} />

        <ul>
            {
                filteredTask.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistID, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked);
                    }

                    // создадим тут функцию с помощью которой докинем два параметра todolistID: string, taskID: string
                    const updateTaskTitleHandler = ( newTitle: string) => {
                        props.updateTaskTitle(props.todolistID, t.id, newTitle)
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableSpan oldTitle={t.title} callBack={updateTaskTitleHandler}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? "active-filter" : ""} onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === 'completed' ? "active-filter" : ""} onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
