import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormProps = {
    callBack: (title: string) => void
}

export const AddItemForm = (props: AddItemFormProps) => {
    // переносим стейт состояние инпута
    let [title, setTitle] = useState("")
    // перенесем стейт отвечающий за валидацию input
    let [error, setError] = useState<string | null>(null)

    //ф-ция отслеживает введенное значение
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    //ф-ция отслеживает нажатие кнопки
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