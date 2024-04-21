import { v1 } from "uuid";
import {FilterValuesType, TodoListType} from "../App";

export const todoReducer = (state: TodoListType[], action: TodoReducerType): TodoListType[] => {
    switch (action.type) {
        case 'CHANGE-FILTER-TODO': {
            // объект todolists проходим  с помощью .map и тернарного оператора, по скольку .map и так создает новую КОПИЮ этого объекта
            //{...el, filter:value } это копия нового объекта с копией нового filter:value ключ-значение
            // setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter: value} : el))
            return state.map(el => el.id === action.payload.todolistID ? {...el, filter: action.payload.value} : el)
        }

        case 'REMOVE-TODO': {
            // //сетаем - берем все тудулисты, фитром проходимся , и оставляем всех кроме того на котором нажали удалить
            // setTodolists(todolists.filter(el => el.id !== todolistID))
            // delete tasks[todolistID]
            return state.filter(el => el.id !== action.payload.todolistID)
        }

        case 'ADD-TODO': {
            // //для начала генерим айдишки
            const newTodoListId = v1()
            // //создаем новый тудулист
            const newTodo: TodoListType = {id: newTodoListId, title: action.payload.title, filter: 'all'}
            // //сетаем старый , и добавляем новый
            // setTodolists([...todolists, newTodo])
            // setTasks({...tasks, [newTodoListId]: []})
            return [...state, newTodo]
        }
        case 'UPDATE-TODO': {
        // setTodolists(todolists.map(el => el.id === todolistID ? {...el, title: newTitle} : el))
            return state.map(el => el.id === action.payload.todolistID ? {...el, title: action.payload.newTitle}: el)
        }

        default: return state
    }

}

//общая типизация
type TodoReducerType = changeFilterACType | removeTodolistACType | addTodolistACType | updateTodoListTitleACType

//Фильтрация тудулистов
type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todolistID: string, value: FilterValuesType) => {

    return {
        type: 'CHANGE-FILTER-TODO',
        payload: {todolistID, value}
    } as const
}

//Удаление todolist
type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistID: string) => {

    return {
        type: 'REMOVE-TODO',
        payload: {todolistID}
    } as const
}

type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODO',
        payload: {title}
    } as const
}

type updateTodoListTitleACType = ReturnType<typeof updateTodoListTitleAC>
export const updateTodoListTitleAC = (todolistID: string, newTitle: string) => {
    return {
        type: 'UPDATE-TODO',
        payload: {todolistID,newTitle}
    } as const
}