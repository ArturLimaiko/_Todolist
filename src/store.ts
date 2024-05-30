import {todoReducer} from "./Reducer/TodoReducer";
import {tasksReducer} from "./Reducer/tasksReducer";
import {combineReducers, legacy_createStore} from 'redux';

// когда мы запускаем срабатывает combineReducers на основе всех объектов которые мы запишем создастся объект
// который попадет в свойство state объекта store
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoReducer
})

// создание объекта store - объект у которого есть свойство state и
// там есть {task: tasksReducer - ассоциативный массив,todolist:todoReducer - массив тудулистов}
export const store = legacy_createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>