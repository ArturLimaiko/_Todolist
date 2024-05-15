import {addTodolistAC, changeFilterAC, removeTodolistAC, todoReducer, updateTodoListTitleAC} from './TodoReducer'
import { v1 } from 'uuid'
import {FilterValuesType, TaskStateType, TodoListType} from '../App'
import {tasksReducer} from "./tasksReducer";

//removeTodo
test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    // 1. Стартовый state
    const startState: TodoListType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]

    // 2. Действие
    const action = {
        type: 'REMOVE-TODOLIST',
        payload: {
            id: todolistId1,
        },
    }
    //const endState = todolistsReducer(startState, action)
    const endState = todoReducer(startState, removeTodolistAC(todolistId1) )

    // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
    // в массиве останется один тудулист
    // expect(endState.length).toBe(1)
    // // удалится нужный тудулист, а не любой
    // expect(endState[0].id).toBe(todolistId2)
})

//addtodo
test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let todolistID = v1()
    let newTodolistTitle = 'New Todolist'

    const startState: TodoListType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]

    const action = {
        type: 'ADD-TODOLIST',
        payload: {
            title: 'New Todolist',
        },
    }
    const endState = todoReducer(startState, addTodolistAC(newTodolistTitle,todolistID))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(action.payload.title)
})

//тесты изменения title у todolist
test('correct todolist should be change its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let todolistID = v1()
    let newTodolistTitle = 'New Todolist'

    const startState: TodoListType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]

    const action = {
        type: 'ADD-TODOLIST',
        payload: {
            id: todolistID,
            title: 'New Todolist',
        },
    }
    const endState = todoReducer(startState, updateTodoListTitleAC(newTodolistTitle,todolistID))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('What to buy')

})

//изменение фильтров в todolists
test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let todolistID = v1()
    let newFilter : FilterValuesType = 'completed'

    const startState: TodoListType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'completed' },
    ]

    const action = {
        type: 'CHANGE-FILTER-TODO',
        payload: {
            id: todolistId2,
            value: newFilter,
        },
    }
    const endState = todoReducer(startState,changeFilterAC (todolistID,newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)

})

//
test('new array should be added when new todolist is added', () => {
    const startState: TaskStateType  = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ],
    }

    const action = addTodolistAC('new todolist', 'todolistId1')

    const endState = tasksReducer(startState, action)


    // Object.keys - вернет ключи нашего объекта в виде массивов - строковые значения
    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
