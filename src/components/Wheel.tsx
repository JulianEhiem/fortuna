import './Wheel.css';
import {useEffect} from "react";
import {
    getBackGroundColor, getRandomMicroSeconds,
    getWheelSelection
} from "../utils/WheelUtils.ts";
import {Status} from "../utils/types.ts";
import WheelGradient from "./WheelGradient.tsx";

const wheelResizer = (size: number) => {
    let containerHeight = 400;
    const maxSlotHeight = 17;
    const slotHeight = Math.max(containerHeight/size, maxSlotHeight);
    containerHeight = Math.max(size * slotHeight, containerHeight);
    return [containerHeight, slotHeight];
}

interface WheelProps {
    list: string[];
    state: Status;
    handleStopAnimation: () => void;
    handleSelection: (text:string) => void;
}

export const Wheel = ({ list, state, handleStopAnimation, handleSelection }: WheelProps) => {

    const listSize = list.length;
    const WHEEL_CONTAINER_HEIGHT = wheelResizer(listSize)[0];
    const WHEEL_SLOT_HEIGHT = wheelResizer(listSize)[1];
    const ARROW_SIZE = 50;

    const wheelContainer = document.getElementById('wheelContainer')
    const primaryEl: HTMLElement | null = document.getElementById("primary");
    const secondaryEl: HTMLElement | null  = document.getElementById("secondary");

    const updateSpinSpeed = (millis: number):void => {
        if(primaryEl && secondaryEl){
            primaryEl.style.animationDuration=`${millis}ms`;
            secondaryEl.style.animationDuration=`${millis}ms`;
        }
    }


    const decelerateSpin = () => {
        if(primaryEl && secondaryEl){
            primaryEl.style.animationPlayState = 'paused'
            secondaryEl.style.animationPlayState = 'paused'
        }
    }

    const animateSpin = async () => {
        const speeds = [50,100,150,200,800,1200]
        const delays = [0,1200,1300,1400,1600,1800]
        const maxDelay = delays[delays.length - 1];

        if(primaryEl && secondaryEl) {
            primaryEl.style.animationPlayState = "running";
            secondaryEl.style.animationPlayState = "running";
        }

        const sleep = (ms: number) => {
            return new Promise((resolve) => setTimeout(resolve, ms))
        };

        for(let i= 0; i<speeds.length; i++){
            const delay = i === 0 ?
                getRandomMicroSeconds(0, delays[i]) : getRandomMicroSeconds(delays[i - 1], delays[i]);
            await sleep(delay);
            updateSpinSpeed(speeds[i]);
        }

        const finalDelay = maxDelay + getRandomMicroSeconds(1000, 2500);
        await sleep(finalDelay);
        decelerateSpin();
    }

    const animationCommand = (command: "Run" | "Pause") => {
        if(primaryEl && secondaryEl) {
            primaryEl.style.animationPlayState = command === "Run" ? "running" : "paused";
            secondaryEl.style.animationPlayState = command === "Run" ? "running" : "paused";
        }
    }

    useEffect(() => {
        if(state == Status.PAUSE) animationCommand("Pause");
        if(state == Status.PLAY) {
            if(primaryEl && secondaryEl) {
                primaryEl.style.animationPlayState = "running";
                secondaryEl.style.animationPlayState = "running";
            }

            (async () => animateSpin())().then(() => {
                setTimeout(()=>{
                    if (wheelContainer) {
                        const selection: HTMLElement = getWheelSelection(wheelContainer)
                        handleStopAnimation();
                        handleSelection(selection?.innerHTML)
                    }
                }, 500)
            });
        }
    }, [animateSpin, animationCommand, handleStopAnimation, primaryEl, secondaryEl, state, wheelContainer]);

    return (
        <>
            <div style={{display: "flex"}}>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center", transform: 'rotate(180deg)'}}>
                    <img id={"arrow"} src="/src/assets/left-triangle.svg" alt="left-triangle"
                         style={{width: `${ARROW_SIZE}px`, height: `${ARROW_SIZE}px`}}/>
                </div>
                <div className="container">
                    <WheelGradient position={"bottom"} height={75} steps={30}/>
                    <WheelGradient position={"top"} height={75} steps={30}/>
                    <div id={"wheelContainer"} className="wheelContainer">
                        <div className="transitionContainer" style={{height: `${WHEEL_CONTAINER_HEIGHT}px`}}>
                            <div id="primary" className={`slotsContainer primary_animation`}>
                                {list && list.map((item, index) => {
                                        return (
                                            <div key={index} id={index.toString()} className={`wheelSlotContainer`}
                                                 style={{
                                                     backgroundColor: getBackGroundColor(index),
                                                     height: `${WHEEL_SLOT_HEIGHT}px`
                                                 }}>
                                                {item}
                                            </div>
                                        )
                                    }
                                )}
                            </div>
                            <div id="secondary" className={`slotsContainer secondary_animation`}>
                                {list && list.map((item, index) => {
                                        return (
                                            <div key={index}  id={index.toString()} className={`wheelSlotContainer`}
                                                 style={{
                                                     backgroundColor: getBackGroundColor(index),
                                                     height: `${WHEEL_SLOT_HEIGHT}px`
                                                 }}>
                                                {item}
                                            </div>
                                        )
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                    <img id={"arrow"} src="/src/assets/left-triangle.svg" alt="left-triangle"
                         style={{width: `${ARROW_SIZE}px`, height: `${ARROW_SIZE}px`}}/>
                </div>
            </div>
        </>
    )
}