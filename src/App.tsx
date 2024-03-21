import React, {useState} from 'react';
import './App.css';
import Todolist from "./components/Todolist";
import {v1} from 'uuid';

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

function App() {
    const todoListTitle = 'Whats to learn'
    //[tasks, setTasks] схема деструктурирующего присваивания
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: false},
        {id: v1(), title: "CSS", isDone: false},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "React", isDone: true},
    ])

    // ф-ция удаления таски
    // создаем новую версию стейта + определяем тип данных в стейте Array<TaskType>
    // далее берем текущий стейт tasks. к нему применяем метод filter(), он формирует новый массив ,
    // и туда кладет те таски у которых taskid не равна параметру функции
    //далее вызываем функцию setTasks и туда передаем новую версию стейта nextState
    const removeTask = (taskId: string) => {
        //nextState !== tasks => мы сформировали новый массив
        const nextState: Array<TaskType> = tasks.filter(task => task.id !== taskId)
        setTasks(nextState)
    }
    //функция добавления таски (в параметрах получаем title типа строки)
     const addTask = (title: string) => {
        // 1. для начала создадим новую таску
        //2. далее создаем новый массив с новой таской и добавляем старые таски ...tasks
        //3. и сразу засетаем новый массив
        let newTask: TaskType =  {id: v1(), title, isDone: false}
        setTasks([newTask,...tasks])
        //тут максимально сокращенный вариант но он сложный для понимания
        // setTasks([{id: v1(), title, isDone: false},...tasks])
    }

    //функция изменения статуса чекбокса
    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        const nextState: Array<TaskType> = tasks.map(
            task=> task.id === taskId
                ? {...task, isDone}
                : task)
        setTasks(nextState)
    }

    return (
        <div className="App">
            <Todolist title={todoListTitle}
                      tasks={tasks}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
