import React from "react";

const AddGroupInput = (props) => {

    const {
        activeFocus,
        nameGroup,
        handlerInputNameGroup
    } = props;

    return (
        <>
            <input
                className="processing-group-form__select-value"
                placeholder="укажите название"
                ref={activeFocus}
                value={nameGroup}
                onChange={(e) => handlerInputNameGroup(e)}
            />
        </>
    )
}
export default AddGroupInput