import { createSlice } from "@reduxjs/toolkit";

export const defaultBreakTime = 5 * 60;
export const defaultSessionTime = 25 * 60;
// export const defaultBreakTime = 5;
// export const defaultSessionTime = 5;


const initialState = {
  breakTime: defaultBreakTime,
  sessionTime: defaultSessionTime,
  min: 60,
  max: (60 * 60),
  interval:  60,
  time: defaultSessionTime,
  timeType: "session",
  timerRunning: false,
  counter: 0,
  breakCompleted: false
};

export const clockSlice = createSlice({
  name: "clock",
  initialState,
  reducers: {
    setBreakTime: (state, action) => {
      state.breakTime = action.payload;
    },
    setSessionTime: (state, action) => {
      state.sessionTime = action.payload;
    },
    decrementBreakTime: (state) => {
      if(state.breakTime > state.min) {
        state.breakTime -= state.interval;
      }
    },
    decrementSessionTime: (state) => {
      if(state.sessionTime > state.min) {
        state.sessionTime -= state.interval;
        state.time -= state.interval;
      }
    },
    incrementBreakTime: (state) => {
      if(state.breakTime < state.max) {
        state.breakTime += state.interval;
      }
    },
    incrementSessionTime: (state) => {
      if(state.sessionTime < state.max) {
        state.sessionTime += state.interval;
        state.time += state.interval;
      }
    },
    decrementTime: (state) => {
      if(state.time > 0) {
        state.time -= 1;
      }
    },
    setBreakCompleted: (state, action) => {
      state.breakCompleted = action.payload;
    },
    startStop: (state) => {
      if(state.time === 0) {
        state.time = state.sessionTime;
        state.timerRunning = !state.timerRunning;
      } else {
        state.timerRunning = !state.timerRunning;
      }

      if(state.breakCompleted) {
        state.counter = 0;
        state.breakCompleted = false;
      }
    },
    setState: (state, action) => {
      state.time = action.payload.time,
      state.timeType = action.payload.timeType,
      state.timerRunning = action.payload.timerRunning
    },
    incrementCounter: (state) => {
      state.counter += 1;
    },
    resetCounter: (state) => {
      state.counter = 0;
    }
  },
});

export const { setBreakTime, setSessionTime, decrementBreakTime, decrementSessionTime, incrementBreakTime, incrementSessionTime, startStop, setState, decrementTime, incrementCounter, resetCounter, setBreakCompleted } = clockSlice.actions;
export default clockSlice.reducer;