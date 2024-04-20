import React, {useEffect, useRef, useState} from "react";
import optionRowIcon from "../../assets/rowIcon.svg";
import removeIcon from "../../assets/removeIcon.svg";
import AddGroupInput from "./AddGroupInput.jsx";
import ListGroups from "./ListGroups.jsx";

const ProcessingGroup = (props) => {

    const {
        dataGroups,
        setDataGroups
    } = props;

    const [nameGroup, setNameGroup] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
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

    function addGroup(nameGroup) {
        const group = {
            id: idGenerate(dataGroups),
            name: nameGroup,
            isChecked: false
        }
        setDataGroups([...dataGroups, group]);
    }

    function handleSelectGroup(id) {
        if(dataGroups.length === 1) {
            return;
        }
        const currentGroup = dataGroups.find(el => el.id === id)
        if (currentGroup.isChecked === false) {
            const changedGroup = {...currentGroup, isChecked: true}
            const updatedGroup = dataGroups.map(el => el.id === changedGroup.id ? changedGroup : el)
            setDataGroups(updatedGroup)
        } else if (currentGroup.isChecked === true) {
            const changedGroup = {...currentGroup, isChecked: false}
            const updatedGroup = dataGroups.map(el => el.id === changedGroup.id ? changedGroup : el)
            setDataGroups(updatedGroup)
        }
    }

    function handleDeleteGroup() {
        const filteredIsCheckedGroup = dataGroups.filter((el) => el.isChecked === true);
        if (filteredIsCheckedGroup.length === 0) {
            setErrorMessage('Не выбрана ни одна группа для удаления!');
        } else if(filteredIsCheckedGroup.length === dataGroups.length) {
            setErrorMessage('Хотя бы одна группа должна остаться в списке!');
        } else {
            setDataGroups(dataGroups.filter(el => el.isChecked === false));
            setErrorMessage('');
        }
    }

    function onValidateNameGroup(nameGroup) {
        if (nameGroup === '') {
            setErrorMessage('Необходимо ввести название группы!')
        } else if(dataGroups.length !== 0) {
            if(dataGroups.find(el => el.name === nameGroup)) {
                setErrorMessage('Необходимо ввести уникальное название группы!')
            } else {
                setErrorMessage('');
                addGroup(nameGroup)
            }
        } else {
            setErrorMessage('');
            addGroup(nameGroup)
        }
    }

    const checkKeyPress = (e) => {
        const { keyCode } = e;
        if (keyCode === 13) {
            onValidateNameGroup(nameGroup);
        }
    };

    function handlerInputNameGroup(value) {
        setNameGroup(value.currentTarget.value)
    }

    function handleClickActiveFocus() {
        inputRef.current.focus();
    }

    useEffect(() => {
        let isMounted = true;

        if(nameGroup === '') {
            isMounted && setErrorMessage('');
        }

        return () => {
            isMounted = false;
        }
    },[nameGroup])

    return (
        <div className="processing-group-wrap">
            <div className="processing-group">
                <div className="processing-group-form">
                    <div className="processing-group-form__label-error">
                        <label onClick={handleClickActiveFocus} className="processing-group-form__label">
                            Группа
                            обработки:
                        </label>
                        <p className="processing-group-form__error-message">{errorMessage}</p>
                    </div>
                    <div className="processing-group-form__select-container">
                        {dataGroups && dataGroups.length !== 0 ? (
                            <>
                                <AddGroupInput
                                    activeFocus={inputRef}
                                    nameGroup={nameGroup}
                                    handlerInputNameGroup={handlerInputNameGroup}
                                    checkKeyPress={checkKeyPress}
                                />
                                {dataGroups.length > 1 && <img className="processing-group-form__select-arrow"
                                     onClick={handleDeleteGroup}
                                     src={removeIcon}
                                     alt="иконка удалить"/>}
                                <img className="processing-group-form__select-arrow"
                                     onClick={() => setIsOpen(!isOpen)}
                                     src={optionRowIcon}
                                     alt="стрелочка"/>
                                {isOpen && (
                                    <ListGroups
                                        groups={dataGroups}
                                        handleSelectGroup={handleSelectGroup}
                                    />
                                )}
                            </>
                        ) : (
                            <>
                                <AddGroupInput
                                    activeFocus={inputRef}
                                    nameGroup={nameGroup}
                                    handlerInputNameGroup={handlerInputNameGroup}
                                    checkKeyPress={checkKeyPress}
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