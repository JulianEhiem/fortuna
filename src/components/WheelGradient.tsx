import './WheelGradient.css'

interface WheelGradientProps {
    position: "top" | "bottom",
    height?: number,
    steps?: number
}
interface FilterObject {
    brightness: number,
    blur: number,
}

const WheelGradient = ({position="top", height = 120, steps}: WheelGradientProps) => {
    const GRADIENT_HEIGHT = height;
    const BRIGHTNESS_START = 50;
    const MAX_BRIGHTNESS = 85;
    const MIN_BLUR = 1;
    const BLUR_END = 25;


    const buildGradient = (num=6) => {
        const gradientHeight = GRADIENT_HEIGHT / num;
        const brightnessIncrement = (MAX_BRIGHTNESS - BRIGHTNESS_START)/num;
        const blurDecrement = (BLUR_END - MIN_BLUR)/num;
        const filters: FilterObject[] = [];
        let currentFilter: FilterObject = {brightness: BRIGHTNESS_START, blur: BLUR_END};
        for(let i = 0 ; i < num + 1 ; i++) {
            filters.push(currentFilter);
            const brightness = currentFilter.brightness + brightnessIncrement;
            const blur = currentFilter.blur - blurDecrement;
            currentFilter = {brightness: Math.min(brightness, MAX_BRIGHTNESS), blur: Math.max(blur, MIN_BLUR)};
        }
        if(position === "bottom") filters.reverse();


        return (
            <>
                {filters.map(({brightness, blur}, index) => {
                    return (
                        <div
                            key={index}
                            className="blurBox"
                            style={{height: gradientHeight, backdropFilter: `blur(${blur}px) brightness(${brightness}%)`}}>
                        </div>
                    )
                })}
            </>
        )
    }

    return (
        <>
            <div className={`${position === "top" ? "overlay_top" : "overlay_bottom"}`}>
                {steps ? buildGradient(steps) : buildGradient()}
            </div>
        </>
    )
}

export default WheelGradient;