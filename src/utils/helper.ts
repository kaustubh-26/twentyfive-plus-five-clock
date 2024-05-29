interface DisplayState {
    time: number;
    timeType: "Session" | "Break";
    timerRunning: boolean;
}

const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export default DisplayState;
export { formatTime };