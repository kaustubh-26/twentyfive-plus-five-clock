import { useSelector } from 'react-redux'
import AlarmSound from './assets/AlarmSound.mp3'
import './App.css'
import { RootState } from './app/store'
import Display from './components/Display';
import TimeSetter from './components/TimeSetter'


function App() {

  const breakTime = useSelector((state: RootState) => state.breakTime);
  const sessionTime = useSelector((state: RootState) => state.sessionTime);
  const time = useSelector((state: RootState) => state.time);

  return (
    <div id="app-container">
      <div id="clock-container">
        <div id="title">
          <h1>Twenty Five Plus Five Clock</h1>
        </div>
        <div className="clock">
          <div className="setters">
            <div className="break">
              <h4 id="break-label">Break Length</h4>
              <TimeSetter
                time={breakTime}
                type="break"
                />
            </div>
            <div className="session">
              <h4 id="session-label">Session Length</h4>
              <TimeSetter
                time={sessionTime}
                type="session"
              />
            </div>
          </div>
          <Display
            time={time}
          />
          <audio id='beep' src={AlarmSound} />
        </div>
      </div>
    </div>
  )
}

export default App
