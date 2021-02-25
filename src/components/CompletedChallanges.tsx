import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChagellesContext';
import styles from '../styles/components/CompletedChangelles.module.css';

export function CompletedChallenges() {
    const { challengesCompleted } = useContext(ChallengesContext)
    return (
        <div className={styles.completeChangelleContainer}>
            <span>Desafios completos</span>
            <span>{challengesCompleted}</span>
        </div>
    );
}