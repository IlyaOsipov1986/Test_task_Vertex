import React,{ useEffect } from "react";

const AddGroupInput = (props) => {

    const {
        activeFocus,
        nameGroup,
        handlerInputNameGroup,
        checkKeyPress
    } = props;

    return (
        <>
            <input
                className="processing-group-form__select-value"
                placeholder="укажите название"
                ref={activeFocus}
                value={nameGroup}
                onChange={(e) => handlerInputNameGroup(e)}
                onKeyDown={checkKeyPress}
            />
        </>
    )
}
export default AddGroupInput