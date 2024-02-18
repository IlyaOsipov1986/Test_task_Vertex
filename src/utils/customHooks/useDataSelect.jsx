import {useEffect, useState} from "react";

function useDataSelect(data) {

    const [getDataSelect, setGetDataSelect] = useState([]);

    useEffect(() => {
        let isMounted = true;

        if(Array.isArray(data)) {
            isMounted && setGetDataSelect(data);
        } else {
            isMounted && setGetDataSelect([]);
        }
        return () => {
            isMounted = false;
        }
    }, [data]);

    return [getDataSelect, setGetDataSelect]

}
export default useDataSelect;