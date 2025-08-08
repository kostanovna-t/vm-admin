import "./Slider.scss";

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  isVirtualized?: boolean;
  max?: number;
}

export default function Slider({ value, onChange, isVirtualized = true, max = 50 }: SliderProps): React.JSX.Element {
    return (
        <div className="ram-slider">
        <div className="slider-container">
          <input
            id="ram"
            type="range"
            min={0}
            max={max}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className={`slider ${isVirtualized ? "with-thumb" : "no-thumb"}`}
          />
        </div>
      <div className="slider-highlight"></div>
      <div className="ram-labels">
        <span>0 GB</span>
        <span>16 GB</span>    
        <span>32 GB</span>
        <span>{max} GB</span>
      </div>
      <div className="recommended-line">
        <span className="recommended-text">Recommended</span>
      </div>
    </div>
      );
  }
  
