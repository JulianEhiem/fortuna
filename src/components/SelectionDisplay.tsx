import './SelectionDisplay.css';
import {useEffect} from "react";

const SelectionDisplay = ({selection}:{selection:string}) => {
    const selectionDiv = document.getElementById('selection-text');

    const isOverFlowing = (element: HTMLElement) => {
        return element.scrollWidth > element.clientWidth;
    }
    useEffect(() => {
        if(selectionDiv && isOverFlowing(selectionDiv)){
            selectionDiv.className += 'animate';
        }
        if(selectionDiv && !isOverFlowing(selectionDiv)) {
            selectionDiv.className = '';
        }
    }, [selection]);


    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <div id={'selection-container'} >
                <div id="selection-text">{selection}</div>
            </div>
        </div>

    )
}

export default SelectionDisplay;