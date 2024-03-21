import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import Button from "../Button";
import {TaskType} from "../App";

//значение фильтра
export type FilterValuesType = 'all' | 'active' | 'completed'

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}


export const Todolist: FC<TodolistPropsType> = ({title, tasks, removeTask, addTask, changeTaskStatus}) => {
    const [filter, setFilter] = useState<FilterValuesType>('all')
    //тут локальный стейт для связи с инпутом(хранилище)
    const [taskTitle, setTaskTitle] = useState('')
    //тут локальный стейт с ошибкой
    const [error,setError] = useState(false)
    //стейт от кнопки которая скрывает / раскрывает таску
    const [isHide, setIsHide] = useState(false)

    //фукнция добавления таски и тут же условие проверки при пустом инпуте - красная рамка и ошибка
    //метод trim() обрезает пробелы по бокам строки
    const addNewTaskHandler = () => {
        const TrimmedTaskTitle = taskTitle.trim()
        if(TrimmedTaskTitle) {
            addTask(TrimmedTaskTitle)
        } else {
            setError(true)
        }
        setTaskTitle('')
    }
    //функция фильтрации тасок
    const changeTodoListFilter = (filter: FilterValuesType) => {
        //сетаем в стейт  и далее надо передать ее в кнопку
        setFilter(filter)
    }
    //функция скрытия тодолиста
    const hideTodoList = () => setIsHide(!isHide)

    //тут обработчики
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTaskTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addNewTaskHandler()
    const changeFilterHandlerCreator = (filter: FilterValuesType) => {
        return () => changeTodoListFilter(filter)
    }


    //вводим новую переменную т.к не всегда будут показываться все таски и типизируем ее
    //и дальше делаем фильтр тасок
    // const tasksForTodoList: Array<TaskType> =
    //     filter === 'active' ? tasks.filter(t => !t.isDone)
    //         //если completed = true то покажи
    //         : filter === "completed"
    //             ? tasks.filter(t => t.isDone)
    //             // если не active и не completed то  покажи all
    //             : tasks

    const getFilteredTasks = (allTasks: Array<TaskType>, filterValue: FilterValuesType) => {
        switch (filterValue) {
            case "active":
                return allTasks.filter(t => !t.isDone)
            case "completed":
                return allTasks.filter(t => t.isDone)
            default:
                return allTasks;
        }
    }

    const tasksForTodoList: Array<TaskType> = getFilteredTasks(tasks, filter)

    //функция показа активных тасок когда всё скрыто
    const countActiveTasksForHideMode  = isHide
        ? getFilteredTasks(tasks, 'active').length
        : null

        //тут проверяем если длина массива с тасками не равно 0 то мапимся по массиву
    const tasksItems: JSX.Element = tasks.length !== 0
        ? <ul>
            {tasksForTodoList.map(task => {
                const removeTaskHandler = () => removeTask(task.id)
                //кликаем по чекбоксу создается объект события , в нем читаем свойство checked, берем id у таски
                const changeTaskStatusHandler = (e:ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked)
                return (
                    <li key={task.id}>
                        <input type="checkbox"
                               onChange={changeTaskStatusHandler}
                               checked={task.isDone}/>
                        <span className={task.isDone === true ? 'task-done': 'task'}>{task.title}</span>
                        <Button title={'x'} onClickHandler={removeTaskHandler}/>
                    </li>
                )
            })}
        </ul>
        : <span>Давай, досвидания</span>

    return (
        <div>
            <h3>{title}
            <Button title={isHide ? 'Show' : 'Hide'} onClickHandler={hideTodoList}/>
            </h3>
            {isHide && <div>{`Задач не выполнено: ${countActiveTasksForHideMode}`}</div> }
            {!isHide &&
            <>
                <div>
                    <input
                        value={taskTitle}
                        onChange={onChangeHandler}
                        onKeyDown={onKeyDownHandler}
                        className={error ? 'task-input-error': ''}
                    />
                    <Button title=' + ' onClickHandler={addNewTaskHandler} isDisabled={!taskTitle}/>
                    {taskTitle.length > 20 && <div style={{color: 'red'}}>Сделай покороче название</div>}
                    {error && <div style={{color: 'red'}}>Введите название таски</div>}
                </div>
                <ul>
                    {tasksItems}
                </ul>
                <div className={'btns-filter-block'}>
                    <Button classes={filter === 'all' ? 'btn-filter-active' : 'btn-filter' } title={"All"} onClickHandler={changeFilterHandlerCreator('all')}/>
                    <Button classes={filter === 'active' ? 'btn-filter-active' : 'btn-filter' } title={"Active"} onClickHandler={changeFilterHandlerCreator('active')}/>
                    <Button classes={filter === 'completed' ? 'btn-filter-active' : 'btn-filter'} title={"Completed"} onClickHandler={changeFilterHandlerCreator('completed')}/>
                </div>
            </>
            }
        </div>
    );
};

export default Todolist;