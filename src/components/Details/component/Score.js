import styles from './score.module.css'

const ScoreCircle = ({ score }) => {
	score = Math.round(score * 10)
	const result = () => {
		if(score >= 75){
			return 'green'
		} else if(score < 75 && score >= 60){
			return 'yellow'
		} else if (score < 60 && score >= 45){
			return 'orange'
		} else {
            return 'red'
        }
	}
	

	return (
		<div className={styles.scoreContainer}>
			<div style={{borderColor: result()}} className={styles.circle}>
				{score}
			</div>
		</div>
	)
}

export default ScoreCircle