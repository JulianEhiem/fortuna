
const COLORS:string[] = ["#FDCBCB", "#ACEBD3", "#C2D0ED", "#F8EAD4", "#F4C9F4"];

export const getBackGroundColor = (num: number): string => {
    const index = num % 5;
    return COLORS[index] || "#FFFFFF";
}

export const getRandomMicroSeconds = (start :number, end :number):number => {
    return Math.round(Math.random() * (end - start)) + start;
}

export const getCenterOfElement = (el:HTMLElement):number[] => {
    let x = el.getBoundingClientRect().left
    let y = el.getBoundingClientRect().top
    x += el.clientWidth / 2;
    y += el.clientHeight / 2;
    return [x, y];
}

export const getWheelSelection = (wheelElement: HTMLElement):HTMLElement => {
    const centerOfWheel = getCenterOfElement(wheelElement);
    const WheelSelection = document.elementFromPoint(centerOfWheel[0], centerOfWheel[1]);
    // (WheelSelection as HTMLElement).style.backgroundColor = 'red';
    return WheelSelection as HTMLElement;
}