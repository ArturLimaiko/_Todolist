import React, {ChangeEvent} from 'react';
import Checkbox from '@mui/material/Checkbox';
import {green} from "@mui/material/colors";

type CheckboxAppType = {
    onChange: (e: boolean)=> void
    checked: boolean
}

export const SuperCheckboxApp = ({onChange, checked}: CheckboxAppType) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.checked)
    }

    return (
        <div>
            <Checkbox size={"small"} sx={{color: green}} onChange={onChangeHandler} checked={checked}/>
        </div>
    );
};