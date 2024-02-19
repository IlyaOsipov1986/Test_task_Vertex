import React from "react";
import selectIcon from "../../assets/selectIcon.svg";

const ListGroups = (props) => {

    const {
        groups,
        handleSelectGroup
    } = props;

    return (
        <div className="processing-group-form__options-container" >
            {groups.map((item) => (
                <div key={item.id} onClick={() => handleSelectGroup(item.id)} className="processing-group-form__options-block">
                    <p className="processing-group-form__option">{item.name}</p>
                    {groups.length > 1 &&
                        <>
                            {item.isChecked && <img src={selectIcon} alt={'icon'}/>}
                        </>
                    }
                </div>
            ))}
        </div>
    )
}
export default ListGroups;