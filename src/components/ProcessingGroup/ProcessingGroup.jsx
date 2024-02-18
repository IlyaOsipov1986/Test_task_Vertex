import React, {useRef, useState} from "react";
import useDataSelect from "/src/utils/customHooks/useDataSelect";
import optionRow from "../../assets/rowIcon.svg";
import { dataSelect } from "/src/config.jsx";
import AddGroupInput from "./AddGroupInput.jsx";
import ListGroups from "./ListGroups.jsx";

const ProcessingGroup = () => {

    const [getDataSelect, setGetDataSelect] = useDataSelect(dataSelect);
    const [nameGroup, setNameGroup] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef(null);

    function idGenerate(arr) {
        if (arr.length < 1) {
            return 1;
        } else {
            const allIdArray = arr.map((arr) => {
                return arr.id
            });
            return Math.max(...allIdArray) + 1;
        }
    }

    function addGroup() {
        const group = {
            id: idGenerate(getDataSelect),
            name: ""
        }
        setGetDataSelect([...getDataSelect, group]);
    }

    function deleteGroup(id) {
        if (getDataSelect.length !== 1) {
            const filteredArray = getDataSelect.filter(el => el.id !== id);
            setGetDataSelect(filteredArray);
        }
    }

    function handlerInputNameGroup(value) {
        setNameGroup(value.currentTarget.value)
    }

    function handleClickActiveFocus() {
        inputRef.current.focus();
    }

    return (
        <div className="processing-group-wrap">
            <div className="processing-group">
                <div className="processing-group-form">
                    <label onClick={handleClickActiveFocus} className="processing-group-form__label">Группа обработки:</label>
                    <div className="processing-group-form__select-container">
                        {getDataSelect && getDataSelect.length !== 0 ? (
                            <>
                                <AddGroupInput
                                    activeFocus={inputRef}
                                    nameGroup={nameGroup}
                                    handlerInputNameGroup={handlerInputNameGroup}
                                />
                                <img className="processing-group-form__select-arrow"
                                     onClick={() => setIsOpen(!isOpen)}
                                     src={optionRow}
                                     alt="Стрелочка открытия меню"/>
                                {isOpen && (
                                   <ListGroups
                                     groups={getDataSelect}
                                   />
                                )}
                            </>
                        ) : (
                            <>
                                <AddGroupInput
                                    activeFocus={inputRef}
                                    nameGroup={nameGroup}
                                    handlerInputNameGroup={handlerInputNameGroup}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProcessingGroup;