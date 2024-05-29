import React from 'react';
import {FilterValuesType} from './AppWithReducers';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import {SuperCheckboxApp} from "./Checkbox/SuperCheckbox";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {TaskStateType, TodoListType} from "./AppWithRedux";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, updateTaskTitleAC} from "./Reducer/tasksReducer";
import {changeFilterAC, removeTodolistAC, updateTodoListTitleAC} from "./Reducer/TodoReducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    //отдаем сюда сам объект тудулист если мы мапимся
    todolist: TodoListType
}

export function Todolist({todolist}: PropsType) {

    const {id,filter,title} = todolist

    // let todolist = useSelector<AppRootStateType, TodoListType[]>(state => state.todolists)
    // let filteredTodos = todolist.filter(todo => todo.id === props.todolistID)[0]
    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[id])
    let dispatch = useDispatch()

    const onAllClickHandler = () => dispatch(changeFilterAC(id, "all"));
    const onActiveClickHandler = () => dispatch(changeFilterAC(id, "active"));
    const onCompletedClickHandler = () => dispatch(changeFilterAC(id, "completed"));

    const removeTodolistHandler = () => {
        dispatch(removeTodolistAC(id))
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
    const filteredTask = filterForTasks(tasks,filter);

    //функция обертка которая принимает только newTitle , и эту обертку передаем дальше как функцию, в AddItemForm
    const addTaskHandler = (newTitle: string) => {
        //фция принимает в себя тот addTask который пришел из app и в него передает newTitle и props.todolistID
        dispatch(addTaskAC(id,newTitle))
    }

    // функция callBack .newTitle приходит к нам снизу , по этому нужно указать его в параметрах
    const updateTodoListTitleHandler = (newTitle: string) => {
        dispatch (updateTodoListTitleAC(id,newTitle))
    }

    //нужно перенести наверх перед ретурном
    // создадим тут функцию с помощью которой докинем два параметра todolistID: string, taskID: string
    const updateTaskTitleHandler = (tID: string, newTitle: string) => {
        dispatch(updateTaskTitleAC(id,tID,newTitle))
    }

    const onChangeHandler = (taskId: string, isDone: boolean) => {
        // props.changeTaskStatus(taskId,isDone, props.todolistID)
        dispatch(changeTaskStatusAC(taskId,isDone,id))
    }

    return <div>
        <h3>
            <EditableSpan oldTitle={title} callBack={updateTodoListTitleHandler}/>
            <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                <DeleteIcon/>
            </IconButton>
        </h3>
        <AddItemForm callBack={addTaskHandler}/>
        <ul>
            {
                tasks.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC(id, t.id))

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <SuperCheckboxApp onChange={(isDone) => onChangeHandler(t.id, isDone)} checked={t.isDone}/>
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
            <Button variant={filter === 'all' ? "outlined" : "contained"} onClick={onAllClickHandler}
                    color='primary'>All</Button>
            <Button variant={filter === 'active' ? "outlined" : "contained"} onClick={onActiveClickHandler}
                    color='secondary'>Active</Button>
            <Button variant={filter === 'completed' ? "outlined" : "contained"} onClick={onCompletedClickHandler}
                    color='success'>Completed</Button>
        </div>
    </div>
}
