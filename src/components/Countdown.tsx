import { useContext, useEffect, useState } from 'react';
import { ChallengesContext } from '../contexts/ChagellesContext';
import styles from '../styles/components/Countdown.module.css'

let countdownTimeout: NodeJS.Timeout;
let initialTime = 0.1 * 60

export function Countdown() {
    
    const { startNewChallenge } = useContext(ChallengesContext)

    const [time, setTime] = useState(initialTime)
    const [isActive, setIsActive] = useState(false)
    const [hasFinished, sethasFinished] = useState(false)


    const minutes = Math.floor(time / initialTime)
    const seconds = time % 60

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

    const startCountDown = () => {
        setIsActive(true)
    }

    const resetCountDown = () => {
        clearTimeout(countdownTimeout)
        setIsActive(false)
        setTime(initialTime)
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => setTime(time - 1), 1000)
        } else if (isActive && time === 0) {
            sethasFinished(true)
            setIsActive(false)
            startNewChallenge();
        }
    }, [isActive, time])

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>
            {hasFinished ? (
                <button type="button"
                    disabled
                    className={styles.countDownButton}>
                    Ciclo encerrado
                </button>
            ) : (
                    <>
                        {isActive ? (
                            <button type="button"
                                className={`${styles.countDownButton} ${styles.countdownButtonActive}`}
                                onClick={resetCountDown}>
                                Abandonar ciclo
                            </button>
                        ) : (
                                <button type="button"
                                    className={styles.countDownButton}
                                    onClick={startCountDown}>
                                    Iniciar ciclo
                                </button>

                            )}
                    </>
                )}
        </div>
    );
}