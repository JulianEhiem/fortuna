import {rowOptionsType} from "../components/options/OptionsTable.tsx";

const getAllOptions = (rowOptions: rowOptionsType[]):string[] => {
    const options: string[] = [];
    for (const rowOption of rowOptions) {
        const frequency:number = rowOption.frequency;
        for(let i=frequency; i>0; i--) {
            options.push(rowOption.optionLabel)
        }
    }
    return options;
}

export const randomizeOptions = (rowOptions: rowOptionsType[]):string[] => {
    const options = getAllOptions(rowOptions);
    let currentIndex = options.length;

    while (currentIndex != 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [options[currentIndex], options[randomIndex]] = [options[randomIndex], options[currentIndex]];
    }
    return options;
}