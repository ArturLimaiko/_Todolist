import React, {ChangeEvent} from 'react';
import Checkbox from '@mui/material/Checkbox';
import {green} from "@mui/material/colors";

type CheckboxAppType = {
    onChange: ()=> void
    checked: boolean
}

export const SuperCheckboxApp = ({onChange, checked}: CheckboxAppType) => {

    return (
        <div>
            <Checkbox size={"small"} sx={{color: green}}/>
        </div>
    );
};