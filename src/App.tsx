import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

function App() {
    // let [filter, setFilter] = useState<FilterValuesType>("all");

    let todolistID1 = v1()
    let todolistID2 = v1()

    const [todolists, setTodolists] = useState<TodoListType[]>([
        {id: todolistID1, title: "What to learn", filter: 'all'},
        {id: todolistID2, title: "What to bye", filter: 'active'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ]
        ,
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ]
    });
    //Функция удаления таски
    function removeTask(todolistID: string, taskID: string) {
        // копируем все таски {...tasks , потом взяли ключ [todolistID] , далее тут указываем какие именно таски - 1 или 2 tasks[todolistID1]
        // далее фильтруем как обычно
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== taskID)})
        // let filteredTasks = tasks.filter(t => t.id != id);
        // setTasks(filteredTasks);
    }

    //Функция добавления таски
    function addTask(todolistID: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        //сетаем таски - копируем массив с тасками ...tasks, далее обращаемся к ключу [todolistID] - кладем туда копию массива [...tasks[todolistID] и добавляем туда newTask
        setTasks({...tasks, [todolistID]: [...tasks[todolistID], newTask]})
        // let newTasks = [task, ...tasks];
        // setTasks(newTasks);
    }

    //функция статуса чекбокса
    function changeStatus(todolistID: string,taskId: string, isDone: boolean) {
        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }

        //берем таски делаем копию объекта{...tasks, добавляем  ключ [todolistID], и берем tasks[todolistID] таски с ключом,далее  нам надо обновить объект, с помощью .mapи обновить статус isDone
        setTasks({...tasks,[todolistID]: tasks[todolistID].map(el => el.id === taskId? {...el, isDone}:el)});
    }

    //Фильтрация тасок
    function changeFilter(todolistID: string, value: FilterValuesType) {
        // объект todolists проходим  с помощью .map и тернарного оператора, по скольку .map и так создает новую КОПИЮ этого объекта
        //{...el, filter:value } это копия нового объекта с копией нового filter:value ключ-значение
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter: value} : el))
    }

    //удаление таски
    const removeTodolist = (todolistID: string) => {
        //сетаем - берем все тудулисты, фитром проходимся , и оставляем всех кроме того на котором нажали удалить
        setTodolists(todolists.filter(el => el.id !== todolistID))
        //удаляем таски по айди
        delete tasks[todolistID]
    }

    return (
        <div className="App">
            {todolists.map(el => {
                // //закинуть фильтрацию тасок в тодолист> , в tasks закидываем ключи из todolists по скольку они у них одни и теже
                let tasksForTodolist = tasks[el.id]

                return (
                    <Todolist
                        //сюда передает 9 параметров   key={el.id} его не надо прокидывать дальше т.к ключ указывается как атрибут по умолчанию (для виртуального DOM).
                        key={el.id}
                        todolistID={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={el.filter}
                        removeTodolist={removeTodolist}
                    />
                )
            })}
        </div>
    );
}

export default App;
