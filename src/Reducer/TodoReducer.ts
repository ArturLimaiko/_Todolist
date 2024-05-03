import { v1 } from "uuid";
import {FilterValuesType, TodoListType} from "../App";

export const todoReducer = (state: TodoListType[], action: TodoReducerType): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODO': {
            // //сетаем - берем все тудулисты, фитром проходимся , и оставляем всех кроме того на котором нажали удалить
            // setTodolists(todolists.filter(el => el.id !== todolistID))
            // delete tasks[todolistID]
            return state.filter(el => el.id !== action.payload.todolistID)
        }
        case 'ADD-TODO': {
            // //для начала генерим айдишки
            // const newTodoListId = v1()
            // //создаем новый тудулист
            const newTodo: TodoListType = {id:action.payload.todolistID, title: action.payload.title, filter: 'all'}
            // //сетаем старый , и добавляем новый
            // setTodolists([...todolists, newTodo])
            // setTasks({...tasks, [newTodoListId]: []})
            return [...state, newTodo]
        }
        case 'UPDATE-TODOLIST-TITLE': {
            // setTodolists(todolists.map(el => el.id === todolistID ? {...el, title: newTitle} : el))
            return state.map( t => t.id === action.payload.todolistID ? {...t, title: action.payload.newTitle}: t)
        }
        case 'CHANGE-FILTER-TODO': {
            return state.map( f => f.id === action.payload.todolistID ? {...f, filter: action.payload.value}: f)
        }
        default: return state
    }
}


//общая типизация
type TodoReducerType = RemoveTodolistAC | addTodolistAC | updateTodoListTitleACType | changeFilterACType


//Удаление todolist
type RemoveTodolistAC = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistID: string) => {

    return {
        type: 'REMOVE-TODO',
        payload: {todolistID}
    } as const
}

//добавление todolist
export type addTodolistAC = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string,todolistID: string) => {
    return {
        type: 'ADD-TODO',
        payload: {title, todolistID}
    } as const
}

//обновление todolistTitle
type updateTodoListTitleACType = ReturnType<typeof updateTodoListTitleAC>
export const updateTodoListTitleAC = (todolistID: string, newTitle: string) => {
    return {
        type: 'UPDATE-TODOLIST-TITLE',
        payload: {newTitle, todolistID}
    } as const
}

//Фильтрация тудулистов
 type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todolistID: string,value:FilterValuesType) => {
    return {
        type: 'CHANGE-FILTER-TODO',
        payload: {todolistID, value}
    } as const
}



//общая типизация
// type TodoReducerType = changeFilterACType | RemoveTodolistAC | addTodolistACType | updateTodoListTitleACType


// //Фильтрация тудулистов
// type changeFilterACType = ReturnType<typeof changeFilterAC>
// export const changeFilterAC = (todolistID: string, value: FilterValuesType) => {
//
//     return {
//         type: 'CHANGE-FILTER-TODO',
//         payload: {todolistID, value}
//     } as const
// }
//

//
// //обновление todolist
// type updateTodoListTitleACType = ReturnType<typeof updateTodoListTitleAC>
// export const updateTodoListTitleAC = (todolistID: string, newTitle: string) => {
//     return {
//         type: 'UPDATE-TODO',
//         payload: {todolistID,newTitle}
//     } as const
// }