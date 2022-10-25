import React, { useState } from "react";
import { useReducer } from "react";
import ReactSpeedometer from "react-d3-speedometer";

export default function Car() {
  const reducer = (state, action) => {
    switch (action.type) {
      case "accelerate":
        if (state >= 240) {
          return 240;
        } else {
          return state + 5;
        }
      case "brake":
        if (state <= 0) {
          return 0;
        } else {
          return state - 5;
        }
      default:
        return 0;
    }
  };
  const [state, dispatchState] = useReducer(reducer, 0);
  const [turnOn, setTurnOn] = useState(false);

  if (turnOn === false) {
    return (
      <div className="car">
        <h2>Turned Off</h2>

        <button className="on" onClick={() => setTurnOn(!turnOn)}>Turn On</button>
      </div>
    );
  } else {
    return (
      <div className="car">
        <ReactSpeedometer
          needleHeightRatio={0.7}
          maxValue={240}
          maxSegmentLabels={5}
          segments={3}
          customSegmentStops={[0, 48, 96, 144, 192, 240]}
          segmentColors={["firebrick", "tomato", "gold", "limegreen", "green"]}
          currentValueText={`${state} km/h`}
          value={parseInt(state)}
        />

        {state > 0 ? null : (
          <button className="off" onClick={() => setTurnOn(!turnOn)}>Turn Off</button>
        )}
        <button className="go" onClick={() => dispatchState({ type: "accelerate" })}>
          Accelerate
        </button>
        <button className="brake" onClick={() => dispatchState({ type: "brake" })}>Brake</button>
      </div>
    );
  }
}
