import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {ButtonAppButton} from "./ButtonAppBar/ButtonAppButton";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {addTaskAC, changeTaskStatusAC, removeTaskAC, updateTaskTitleAC} from "./Reducer/tasksReducer";
import {addTodolistAC, changeFilterAC, removeTodolistAC, updateTodoListTitleAC} from "./Reducer/TodoReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: TaskType[]
}

export function AppWithRedux() {
    // для того что бы достать данные нам нужен useSelector - хук
    // берем todolists = и сохраняем значение которое получится из этого хука
   // внутри у нас колбек (state =>  возвращает нам нужны тудулисты)
    let todolists = useSelector<AppRootStateType, TodoListType[]>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    // нам необходимо что бы наша компонента реагировала на наше телодвижение - воспользуемся методом let dispatch = useDispatch()
    const dispatch = useDispatch()

    //TASKS
    //Функция удаления таски ON REDUCER
    function removeTask(todolistID: string, taskID: string) {
        // копируем все таски {...tasks , потом взяли ключ [todolistID] , далее тут указываем какие именно таски - 1 или 2 tasks[todolistID1]
        // далее фильтруем как обычно
        // setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== taskID)})
        // let filteredTasks = tasks.filter(t => t.id != id);
        // setTasks(filteredTasks);
        dispatch(removeTaskAC(taskID,todolistID))
    }

    //Функция добавления таски ON REDUCER
    function addTask(todolistID: string, title: string) {
        // let newTask = {id: v1(), title: title, isDone: false};
        // //сетаем таски - копируем массив с тасками ...tasks, далее обращаемся к ключу [todolistID] - кладем туда копию массива [...tasks[todolistID] и добавляем туда newTask
        // setTasks({...tasks, [todolistID]: [...tasks[todolistID], newTask]})
        // let newTasks = [task, ...tasks];
        // setTasks(newTasks);
        dispatch(addTaskAC(todolistID,title))
    }

    //функция статуса чекбокса ON REDUCER
    function changeTaskStatus(taskId: string, isDone: boolean, todolistID: string) {
        //берем таски делаем копию объекта{...tasks, добавляем  ключ [todolistID], и берем tasks[todolistID] таски с ключом,далее  нам надо обновить объект,
        // с помощью .map и обновить статус isDone
        // setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, isDone} : el)});
        dispatch(changeTaskStatusAC(taskId,isDone,todolistID ))
    }

    // функция изменения названия таски , и которая передаст все в глобальный стейт ON REDUCER
    const updateTaskTitle = (todolistID: string, taskID: string, newTitle: string) => {
        // setTasks({...tasks,[todolistID]: tasks[todolistID].map(el => el.id === taskID ? {...el, title: newTitle} : el)
        // })
        dispatch(updateTaskTitleAC(todolistID,taskID,newTitle))
    }

    //TODOLISTS
    //Фильтрация тудулистов  ON TODOREDUCER
    function changeFilter(todolistID: string, value: FilterValuesType) {
        // объект todolists проходим  с помощью .map и тернарного оператора, по скольку .map и так создает новую КОПИЮ этого объекта
        //{...el, filter:value } это копия нового объекта с копией нового filter:value ключ-значение
        // setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter: value} : el))
        dispatch(changeFilterAC(todolistID,value))
    }

    //удаление todolist ON TODOREDUCER
    const removeTodolist = (todolistID: string) => {
        // //сетаем - берем все тудулисты, фитром проходимся , и оставляем всех кроме того на котором нажали удалить
        // setTodolists(todolists.filter(el => el.id !== todolistID))
        // //удаляем таски по айди
        // delete tasks[todolistID]
        dispatch(removeTodolistAC(todolistID))
    }

    //добавление todolist
    const addTodolist = (title: string) => {
        // для начала генерим айдишки - именно тут потому что она должна быть ОБЩАЯ!
        const newTodoListId = v1()
        // создаем новый тудулист
        // const newTodo: TodoListType = {id: newTodoListId, title, filter: 'all'}
        // сетаем старый , и добавляем новый
        // setTodolists([...todolists, newTodo])
        // сетаем объект старых тасок и обращаемся по ключу[newTodoListId]: ( айдишка в качестве свойства) и кладем новый пустой массив(значение)( тасок там нет т.к он новый) [newTodoListId]: []
        // setTasks({...tasks, [newTodoListId]: []})
        dispatch(addTodolistAC(title,newTodoListId))
    }

    // функция изменения названия заголовка Todolist и  которая передаст все в глобальный стейт
    //прокинем ее вниз через пропсы в тудулист
    const updateTodoListTitle = (todolistID: string, newTitle: string) => {
        // setTodolists(todolists.map(el => el.id === todolistID ? {...el, title: newTitle} : el))
        dispatch(updateTodoListTitleAC(todolistID, newTitle))
    }

    return (
        <div className="App">
            <ButtonAppButton/>
            <Container fixed>

                <Grid container style={{margin: '30px'}}>
                    {/*сюда передадим компоненту для добавления новых тасок*/}
                    <AddItemForm callBack={addTodolist}/>
                </Grid>

                <Grid container spacing={5}>
                    {todolists.map(el => {
                        // //закинуть фильтрацию тасок в тодолист> , в tasks закидываем ключи из todolists по скольку они у них одни и теже
                        let tasksForTodolist = tasks[el.id]

                        return (
                            <Grid item>
                                <Paper elevation={8} style={{padding: '20px', backgroundColor: '#cdcdcd'}}>
                                    <Todolist
                                        //сюда передаем 9 параметров  key={el.id} его не надо прокидывать дальше т.к ключ указывается как атрибут по умолчанию (для виртуального DOM).
                                        key={el.id}
                                        todolistID={el.id}
                                        title={el.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={el.filter}
                                        removeTodolist={removeTodolist}
                                        updateTaskTitle={updateTaskTitle}
                                        updateTodoListTitle={updateTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}


