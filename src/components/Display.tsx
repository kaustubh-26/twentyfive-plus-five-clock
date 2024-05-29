import React, { useEffect } from "react";
import { formatTime } from "../utils/helper"
import { FaPlay, FaPause, FaUndo } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { startStop, defaultBreakTime, defaultSessionTime, setBreakTime, setSessionTime, setState, decrementTime, incrementCounter, setBreakCompleted } from '../features/clock/clockSlice'

interface DisplayProps {
  time: number;
}

const Display: React.FC<DisplayProps> = ({
    time ,
}) => {

  const timerRunning = useSelector((state: RootState) => state.timerRunning);
  const breakTime = useSelector((state: RootState) => state.breakTime);
  const sessionTime = useSelector((state: RootState) => state.sessionTime);
  const timeType = useSelector((state: RootState) => state.timeType);
  const counter = useSelector((state: RootState) => state.counter);
  const displayTime = useSelector((state: RootState) => state.time);
  const dispatch = useDispatch();

  const changeStartStop = () => {
    dispatch(startStop());
  }

  const reset = () => {
    dispatch(setBreakTime(defaultBreakTime));
    dispatch(setSessionTime(defaultSessionTime));
    dispatch(setState({
      time: defaultSessionTime,
      timeType: "session",
      timerRunning: false
    }))
    const audio = document.getElementById("beep") as HTMLAudioElement;
    audio.pause();
    audio.currentTime = 0;
  }

  const decrementClock = () => {
    dispatch(decrementTime())
  }


  useEffect(() => {
    let id: number;
    if(!timerRunning) return;

    if(timerRunning) {
      id = window.setInterval(decrementClock, 1000);
    }

    return () => {
      window.clearInterval(id);
    }
  },[timerRunning])

  useEffect(() => {
    if(displayTime === 0) {
      const audio = document.getElementById("beep") as HTMLAudioElement;
      audio.currentTime = 2;
      audio.play().catch(err => console.log(err));
      if(counter < 1) {
        dispatch(setState({
          timeType: timeType === "session" ? "break" : "session",
          time: timeType === "session" ? breakTime : sessionTime,
          timerRunning: true
        }))
      } else {
        dispatch(setState({
          timeType: timeType === "session" ? "break" : "session",
          time: timeType === "session" ? breakTime : sessionTime,
          timerRunning: false
        }))
        dispatch(setBreakCompleted(true))
      }
      dispatch(incrementCounter());
    }
  }, [displayTime, breakTime, sessionTime])


  return (
    <div className="display">
        <h4 id="timer-label">{(timeType == "session") ? "Session" : "Break"}</h4>
        <span id="time-left" className={`${(timeType === "break") ? "text-red-500": "text-black"}`}>{formatTime(time)}</span>
        <div>
            <button id="start_stop" onClick={changeStartStop}>
                {timerRunning ? <FaPause /> : <FaPlay />}
            </button>
            <button id="reset" onClick={reset}>
                <FaUndo />
            </button>
        </div>
    </div>
  )
}

export default Display