import {Wheel} from "./components/Wheel.tsx";
import './App.css'
import {createContext, useState} from "react";
import {Status} from "./utils/types.ts";
import SelectionDisplay from "./components/SelectionDisplay.tsx";
import OptionsDisplay from "./components/options/OptionsDisplay.tsx";
import {rowOptionsType} from "./components/options/OptionsTable.tsx";
import {randomizeOptions} from "./utils/helperFunctions.ts";

// const fruits = ["apples", "banana", "oranges", "watermelon", "pineapples", "grapes", "lemons", "limes", "guava", "mango", "durian", "pomegranate", "kiwi"]
// const fruits = ["appleslhfjdhkghdksdfdsffhgl", "bananadsdfdsfsdkfhkgldhfgkfd", "orangesdhjklfgdkfhgdfsdfdsfkhgkdfjghdf", "90sdf", "sdfsdf", "sdf8sdfs"]

const rows: rowOptionsType[] = [
    {optionLabel:'Frozen yoghurt', frequency:1},
    {optionLabel:'Ice cream sandwich', frequency:1},
    {optionLabel:'Eclair', frequency:1},
    {optionLabel:'Cupcake', frequency:1},
    {optionLabel:'Gingerbread', frequency:1},
]
export interface OptionsType {
    optionObjects: rowOptionsType[];
    updateOptions: (options: rowOptionsType[]) => void;
}

// const OptionsContext:Context<OptionsType> = createContext({labels: randomizeOptions(rows), optionObjects: rows})
export const OptionsContext = createContext<OptionsType | null>(null)

function App() {
    const [options, setOptions] = useState<rowOptionsType[]>(rows);
    const [listOptions, setListOptions] = useState<string[]>(randomizeOptions(options));
    const [animationState, setAnimationState] = useState<Status>(Status.PAUSE);
    const [selection, setSelection] = useState<string>('');

    // const list = randomizeOptions(options);

    const handleOptionsUpdate = (option: rowOptionsType[]): void => {
        setOptions(option);
        setListOptions(randomizeOptions(options));
    }

  return (
      <OptionsContext.Provider value={{optionObjects: options, updateOptions: (options: rowOptionsType[]) => handleOptionsUpdate(options)}}>
          <div className={`root mainContainer`}>
              <div className={`mainWheelContainer`}>
                  <SelectionDisplay selection={selection}/>
                  <div style={{display: "flex", gap: 50, alignItems: "center"}}>
                      <Wheel list={listOptions} state={animationState}
                             handleStopAnimation={() => setAnimationState(Status.PAUSE)}
                             handleSelection={(selection) => setSelection(selection)}/>
                      <button className="spin-button" onClick={() => setAnimationState(Status.PLAY)}>Spin</button>
                  </div>
              </div>
              <OptionsDisplay/>
          </div>
      </OptionsContext.Provider>

  )
}

export default App
