import React, { useEffect, useState } from 'react'
import { Line, Circle } from 'rc-progress';
import './Workout.css'

const sInMin = 10

const Workout = (props) => {
    const [timer, setTimer] = useState('')
    const [time, setTime] = useState(-1)
    const [reps, setReps] = useState(0)
    const [set, setSet] = useState(0)
    const [done, setDone] = useState([])
    const [doneReps, setDoneReps] = useState(0)
    const [doneTime, setDoneTime] = useState(0)

    useEffect(() => {
        setTime(props.exercise.sets[0].time * sInMin)
        setReps(props.exercise.sets[0].reps)
        setSet(0)

        setTimer(setInterval(() => {
            setTime(time => time - 1)
            setDoneTime(doneTime => doneTime + 1)
        }, 1000))
    }, [])

    useEffect(() => {
        if (time === 0) {
            const newSet = set + 1
            const newDone = done
            newDone[set] = !!newDone[set]

            if (newSet === props.exercise.sets.length) {
                props.endWorkout(newDone)
                clearInterval(timer)
                return
            }
            setTime(props.exercise.sets[newSet].time * sInMin)
            setReps(props.exercise.sets[newSet].reps)
            setSet(newSet)
            setDone(newDone)

        }
    }, [time])

    const getTimeStr = () => {
        const minutes = Math.floor(time / sInMin)
        const seconds = time % sInMin

        return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds
    }

    const getClassName = (i) => {
        if (i < set) {
            return done[i] ? 'finished' : 'unfinished'
        }
        if (i == set) {
            return 'active'
        }
    }

    const setSetDone = () => {
        const newDone = [...done]
        newDone[set] = true
        setDone(newDone)
        setDoneReps(doneReps => doneReps + props.exercise.sets[set].reps)
    }

    return (
        <div className="Workout">
            <h2 className="instructions">Set #{set + 1} / {props.exercise.sets.length}: &nbsp;&nbsp; {reps} &nbsp; reps</h2>
            <Line className="progressBar" percent={doneTime / props.exercise.time * sInMin} strokeWidth="2" strokeColor="#23ce6b" />

            <div className="time">{getTimeStr()}</div>

            <div className="doneButtonContainer">
                {done[set]
                    ? <div className="exerciseInfoText"> Set #{set+1} finished! </div>
                    : <button onClick={setSetDone}>Done!</button>
                }

            </div>

            <div>
                <div>
                    Finished {doneReps} / {props.exercise.reps} reps
                </div>
            </div>

            <table>
                <tbody>
                    <tr>
                        <th>Set #</th>
                        {props.exercise.sets.map((set, i) => <th key={i} className={getClassName(i)}>{i + 1}</th>)}
                    </tr>
                    <tr>
                        <td>Reps</td>
                        {props.exercise.sets.map((set, i) => <td key={i} className={getClassName(i)}>{set.reps}</td>)}
                    </tr>
                    <tr>
                        <td>Time</td>
                        {props.exercise.sets.map((set, i) => <td key={i} className={getClassName(i)}>{set.time}</td>)}
                    </tr>

                </tbody>
            </table>
        </div>
    )
}

export default Workout