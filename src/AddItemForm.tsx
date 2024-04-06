import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormProps = {
    callBack: (title: string) => void
}

//создадим универсальную форму, которую будем через колбек передавать , и юзать в тасках или в тудулисте
export const AddItemForm = (props: AddItemFormProps) => {
    // переносим  локальный стейт состояние инпута
    let [title, setTitle] = useState("")
    // перенесем локальный стейт отвечающий за валидацию input, показывает или нет ошибку
    let [error, setError] = useState<string | null>(null)

    //ф-ция отслеживает введенное значение( переносим его т.к нам нужно отслеживать вводимое значение в инпут)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    //ф-ция отслеживает нажатие кнопки, тоже самое- отслеживаем нажатие
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            callBack();
        }
    }
    //функция добавления таски
    const callBack = () => {
        if (title.trim() !== "") {
            props.callBack(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={callBack}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};