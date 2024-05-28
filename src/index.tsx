import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {createRoot} from 'react-dom/client';
import {AppWithRedux} from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from './store'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <AppWithRedux/>
    </Provider>
);

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
// 7 после получения в параметрах RootReducer
// 8 обернем компоненту нашу в Provider  и даем обязательный объект store
// 9 в taskReducer создадим initialTasksState:TaskStateType = {}, в параметрах в state укажем = initialState
// тоже самое проделать в todolistsReducer
// 10 для того что бы достать данные нам нужен useSelector - хук
// 11 берем let todolists = и сохраняем значение которое получится из этого хука
// 12 протипизируем useSelector<AppRootStateType>()  - в store есть свойство state  у него объект будет вот такого типа AppRootStateType
// 2ым параметром отдаем тип который мы вернем из этого select - массив тудулистов
// внутри у нас колбек (state =>  возвращает нам нужны тудулисты)
// 13 такой же useSelector для тасок сделаем
// 14 далее нам необходимо что бы наша компонента реагировала на наше телодвижение - воспользуемся методом let dispatch = useDispatch()
// в AppWithReducer заменим dispatchTasks на dispatch - везде достаточно только 1 раза вызывать dispatch. по скольку иначе будет траблы - 2 компоненты будут иметь один и тот же ключ например в функции addTodolist
//  уберем v1() и переменные из App функции
//
//
//
//
//
//