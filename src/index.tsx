import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {createRoot} from 'react-dom/client';
import {AppWithReducers} from "./AppWithReducers";

const container  = document.getElementById('root') as HTMLElement
const root = createRoot(container);
root.render(<AppWithReducers />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


// 1 создадим отдельный файлик для Redux AppWithRedux, переименуем функцию так же
// 2 забросим в index tsx
// 3 Организуем файлик store.ts там у нас у будет все храниться
// 4 внутри создадим функцию rootReducer = combineReducers({ внутри наши tasksReducer, todoReducer - ключи задаем любые - можно например tasks , todolists})
// 5 создадим непосредственно export const store = legacy_createStore(RootReducer);
// 6 тип ( AppRootStateType)определим через ReturnType
// ниже пропишем еще такую фичу
// //"ts-ignore
// window.store = store - в принципе не нужна просто в консоли можем посмотреть изменение стейта
// после получения в параметрах RootReducer
// обернем компоненту нашу в Provider  и даем обязательный объект store
// в taskReducer создадим initialTasksState:TaskStateType = {}, в параметрах в state укажем = initialState
// тоже самое проделать в todolistsReducer
//
//
//
//
//
