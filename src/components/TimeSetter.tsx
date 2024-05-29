import React from 'react'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { decrementBreakTime, decrementSessionTime, incrementBreakTime, incrementSessionTime } from '../features/clock/clockSlice'

interface TimeSetterProps {
    time: number;
    type: "break" | "session";
}

const TimeSetter: React.FC<TimeSetterProps> = ({
    time,
    type
}) => {
    const interval = useSelector((state: RootState) => state.interval);
    const dispatch = useDispatch();

    const decrementTime = () => {
        if(type === "break") {
            dispatch(decrementBreakTime());
        } else {
            dispatch(decrementSessionTime());
        }
    }
    
    const incrementTime = () => {
        if(type === "break") {
            dispatch(incrementBreakTime());
        } else {
            dispatch(incrementSessionTime());
        }
    }


  return (
    <div>
        <button id={`${type}-decrement`}
        onClick={decrementTime}>
            <FaArrowDown />
        </button>
        <span id={`${type}-length`}>{(time / interval)}</span>
        <button id={`${type}-increment`}
        onClick={incrementTime}>
            <FaArrowUp />
        </button>
    </div>
  )
}

export default TimeSetter