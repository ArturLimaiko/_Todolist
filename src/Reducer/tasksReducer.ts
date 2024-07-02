import {TaskStateType} from "../AppWithRedux";
//import {v1} from "uuid";
import {addTodolistACType, removeTodolistACType} from "./TodoReducer";

//значение по умолчанию
export let initialTaskState: TaskStateType = {}

export const tasksReducer = (state = initialTaskState, action: tasksReducerType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            // копируем все таски {...tasks , потом взяли ключ [todolistID] , далее тут указываем какие именно таски - 1 или 2 tasks[todolistID1]
            // далее фильтруем как обычно
            // setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== taskID)})
            // let filteredTasks = tasks.filter(t => t.id != id);
            // setTasks(filteredTasks);
            return {...state, [action.todolistID]: state[action.todolistID]
                    .filter(t => t.id !== action.taskID)}
        }
        case 'ADD-TASK': {
            // //сетаем таски - копируем массив с тасками ...tasks, далее обращаемся к ключу [todolistID] - кладем туда копию массива [...tasks[todolistID] и добавляем туда newTask
            // setTasks({...tasks, [todolistID]: [...tasks[todolistID], newTask]})
            // let newTasks = [task, ...tasks];
            // setTasks(newTasks);
            let newTask = {id: action.todolistID, title: action.title, isDone: false};
            return {
                ...state,
                [action.todolistID]: [newTask, ...state[action.todolistID]]
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state, [action.todolistID]: state[action.todolistID]
                    .map(el => el.id === action.taskId ? {...el, isDone: action.isDone} : el)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            // setTasks({
            //     ...tasks,
            //     [todolistID]: tasks[todolistID].map(el => el.id === taskID ? {...el, title: newTitle} : el)
            // })
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(el => el.id === action.taskID ? {
                    ...el,
                    title: action.newTitle
                } : el)
            }
        }

        case 'ADD-TODO': {
            return {...state, [action.todolistID]: []}
        }
        case 'REMOVE-TODO': {
            // let copyState = {...state}
            // delete copyState[action.todolistID]
            // return copyState
            //деструктурируем
            //в старом стейте остается ключ, но с пустым массивом
            // а в новый стейт мы возвращаем все остальное кроме этого ключа с пустым массивом
            let {[action.todolistID]: aaa, ...rest} = state
            return rest
        }
        default:
            return state
    }
}

//по деструктуризации
// let object = {a: 1, b: 2, c: 3}
// let {b, ...newObject} = object
// newObject = {
//     a: 1, c: 3
// }

//общая типизация
export type tasksReducerType =
    RemoveTaskACType
    | addTaskACType
    | changeTaskStatusACType
    | updateTaskTitleACType
    | addTodolistACType
    | removeTodolistACType


//REMOVE TASK
export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistID: string, taskID: string) => {
    return {type: 'REMOVE-TASK', todolistID, taskID} as const
}

//ADD TASK
export type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistID: string, title: string) => {
    return {type: 'ADD-TASK', todolistID, title} as const
}

//CHANGE TASK STATUS
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistID: string) => {
    return {type: "CHANGE-TASK-STATUS", taskId, isDone, todolistID} as const
}

//UPDATE TASK TITLE
export type updateTaskTitleACType = ReturnType<typeof updateTaskTitleAC>
export const updateTaskTitleAC = (todolistID: string, taskID: string, newTitle: string) => {
    return {type: "CHANGE-TASK-TITLE", todolistID, taskID, newTitle} as const
}


// 1 создаем обычную функцию например tasksReducer
// 2 он принимает 2 аргумента - state , action
// 3 внури Reducer конструкция switch () { case ()}
// 4 switch - принимает  в параметрах action.type ( тип данных - объект)
// 5 далее создаем case 'тут указываем ключ'{тут case обязательно что то ретурнит - state, неважно что он что то делает до этого}
// 6 в конце switch указываем что он возвращает по дефолту - в нашем случае state/


// 13 тут протипизируем все наши action - можно собрать их в один - например назоваем его как и называется наша функ
// tasksReducerType


//7 тут пишем функция которая удаляет таски ( например removeTaskAC) и внутри возвращает объект return {}
//8 внутри return указываем type: тут нужно написать электронный ключ для функции - можно указать например 'REMOVE-TASK'
//9 типизируем функцию removeTaskAC через typeof
//10 typeof протипизует всю функцию, таким образом нужно указать что б он протипизировал только объект который ретурнит
//11 ReturnType <внутри указываем typeof и функцию>
//12  в конструкции switch у нас может быть много кейсов разных , и в типизации мы могли бы указать тип - string, но тогда
// у нас все сломается. по этому нам нужно более конкретно сказать - as const - указываем на всем объекте. но можно и на функции


// тут пишем функция которая добавляет таски ( например addTaskAC)
// доделать самому

//14 - далее перейдем в app.tsx закоментим внутренности обоих функций
//  и всю логику заберем  теперь в tasksReducer
//15 в функции removeTask addTask есть параметры - id  и title, и нам нужно так же перенести их сюда в наш редьюсер в
// функции removeTaskAC addTaskAC
// 16 теперь нам нужен новый ключ в функциях - куда складывать аргументы - например можно назвать payload: {сюда кладем id:id либо другой параметр какой принимала функция}

// 17 - перейти в app tsx и исправить хуки - заменить useState на useReducer а set - заменить на dispatch
//например let [tasks, dispatchTasks] = useReducer ( принимает 2 аргумента - сам стейт , а 2ой - тот Reducer с которым работает - функцию.)

//18 внутри функций addTask и removeTasks нужно продиспатчить наши функции и передать им внутри id и title.

//19 переходим в switch конструкцию и доделаем наши 2 case - уберем any  и правильно протипизируем state и action
//20 доделаем case removeTasks - с помощью фильтра
//21 доделаем case addTasks - с помощью

//23 каждой функции мы должны прикрывать спину типизацией(указать что он вернет)
// - в Reducer это нужно сделать обязательно - :TaskType[]
