import React from "react";
import selectIcon from "../../assets/selectIcon.svg";

const ListGroups = (props) => {

    const {
        groups
    } = props;

    return (
        <div className="processing-group-form__options-container" >
            {groups.map((item) => (
                <div className="processing-group-form__options-block">
                    <p className="processing-group-form__option" key={item.id}>{item.name}</p>
                    <img src={selectIcon}/>
                </div>
            ))}
        </div>
    )
}
export default ListGroups;