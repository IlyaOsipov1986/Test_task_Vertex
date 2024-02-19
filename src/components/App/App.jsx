import './App.css'
import ProcessingGroup from "../ProcessingGroup/ProcessingGroup.jsx";
import useLocalstorage from "../../utils/customHooks/useLocalstorage.jsx";

function App() {

  const [dataGroups, setDataGroups] = useLocalstorage([], "groups");

  return (
      <div className="app">
        <ProcessingGroup
            dataGroups={dataGroups}
            setDataGroups={setDataGroups}
        />
      </div>
  )
}

export default App
