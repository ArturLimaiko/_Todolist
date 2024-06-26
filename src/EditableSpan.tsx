import React, {ChangeEvent, useState} from 'react';
import TextField from "@mui/material/TextField";

type EditableSpanType = {
    oldTitle: string
    callBack: (newTitle: string) => void
}

export const EditableSpan = ({oldTitle, callBack}: EditableSpanType) => {
//тут режим редактирования ( локальный стейт)
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
            ? <TextField onBlur={editHandler} value={newTitle} onChange={onChangeHandler} autoFocus size='small'/>
            : <span onDoubleClick={editHandler}>{oldTitle}</span>
    );
};