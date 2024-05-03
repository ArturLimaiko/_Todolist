import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import {ButtonAppButton} from "./ButtonAppBar/ButtonAppButton";
import {CheckboxApp, SuperCheckboxApp} from "./Checkbox/SuperCheckbox";

export type TaskType = {
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
    updateTaskTitle: (todolistID: string, taskID: string, newTitle: string) => void
    updateTodoListTitle: (todolistID: string, newTitle: string) => void
    onChangeHandler: () => void
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

    //функция обертка которая принимает только newTitle , и эту обертку передаем дальше как функцию, в AddItemForm
    const addTaskHandler = (newTitle: string) => {
        //фция принимает в себя тот addTask который пришел из app и в него передает newTitle и props.todolistID
        props.addTask(props.todolistID, newTitle)
    }

    // функция callBack .newTitle приходит к нам снизу , по этому нужно указать его в параметрах
    const updateTodoListTitleHandler = (newTitle: string) => {
        props.updateTodoListTitle(props.todolistID, newTitle)
    }

    //нужно перенести наверх перед ретурном
    // создадим тут функцию с помощью которой докинем два параметра todolistID: string, taskID: string
    const updateTaskTitleHandler = (tID: string, newTitle: string) => {
        props.updateTaskTitle(props.todolistID, tID, newTitle)
    }

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked);
    // }

    return <div>

        <h3>
            <EditableSpan oldTitle={props.title} callBack={updateTodoListTitleHandler}/>
            <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                <DeleteIcon/>
            </IconButton>
        </h3>
        <AddItemForm callBack={addTaskHandler}/>
        <ul>
            {
                filteredTask.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistID, t.id)
                    {/* вынести функцию над ретурном*/}


                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        {/*Вынести чекбокс в универсальную компоненту которая будет использовать material ui*/}
                        <SuperCheckboxApp onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableSpan oldTitle={t.title}
                                      callBack={(newTitle) => updateTaskTitleHandler(t.id, newTitle)}/>
                        <IconButton aria-label="delete" onClick={onClickHandler} size="small">
                            <DeleteIcon/>
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button variant={props.filter === 'all' ? "outlined" : "contained"} onClick={onAllClickHandler} color='primary'>All</Button>
            <Button variant={props.filter === 'active' ? "outlined" : "contained"} onClick={onActiveClickHandler} color='secondary'>Active</Button>
            <Button variant={props.filter === 'completed' ? "outlined" : "contained"} onClick={onCompletedClickHandler} color='success'>Completed</Button>
        </div>
    </div>
}
