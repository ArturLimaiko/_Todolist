import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
    oldTitle: string
    callBack: (newTitle: string) => void
}

export const EditableSpan = ({oldTitle, callBack}: EditableSpanType) => {

    const [edit, setEdit] = useState(false)
    let [newTitle, setNewTitle] = useState(oldTitle)

    const editHandler = () => {
        setEdit(!edit)
        if (edit) {
            callBack(newTitle)
        }
    }

    //ф-ция отслеживает введенное значение
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return (
        edit
            ? <input onBlur={editHandler} value={newTitle} onChange={onChangeHandler} autoFocus/>
            : <span onDoubleClick={editHandler}>{oldTitle}</span>
    );
};