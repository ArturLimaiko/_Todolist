import {tasksReducer} from "./tasksReducer";
import {addTodolistAC, todoReducer} from "./TodoReducer";
import {TaskStateType, TodoListType} from "../AppWithReducers";

test('ids should be equals', () => {
    //стартовое значение тасок - пустой объект
    const startTasksState: TaskStateType = {}
    //стартовое значение тудулиста - пустой массив
    const startTodolistsState: Array<TodoListType> = []

    // action сформировал нам addTodolistAC , там 3 свойства type title todolistID
    const action = addTodolistAC('new todolist','todolistID')

    // endTasksState тут лежит объект , с 1им свойством , потому что пустой. ключ - action.todolistID , значение - пустой массив []
    const endTasksState = tasksReducer(startTasksState, action)
    // тут будет массив [] с 1 элементом ,  объект {} (типаTodoListType[]) внутри лежат {id, title, filter}
    const endTodolistsState = todoReducer(startTodolistsState, action)

    //массив из объекта с 1 элементом( значение id будет - sting)
    const keys = Object.keys(endTasksState)
    // строковое значение из массива под индексом 0
    const idFromTasks = keys[0]
        // значение ключа которое в объекте есть Todolist
    const idFromTodolists = endTodolistsState[0].id

    //сравниваем соответствуют ли они той id которая в объекте action
    expect(idFromTasks).toBe(action.todolistID)
    expect(idFromTodolists).toBe(action.todolistID)
})
