import { Link } from 'react-router-dom'
import styles from "./carosel.module.css"
import { useDispatch } from "react-redux"
import { clearFilm, initializeDirector, initializeFilm } from "../reducers/filmReducer"
import ScoreCircle from '../Details/component/Score'

const Film = ({ title, voteAvg, release, poster, id }) => {
    const dispatch = useDispatch()

	const year = release.substring(0,4)

	const handleClick = (id) => {
		dispatch(clearFilm())
		dispatch(initializeFilm(id))
		dispatch(initializeDirector(id))
	}
  
  return (
	<div className={styles.film}>
		<Link to={`/film/${id}`} onClick={() => handleClick(id)}>
		<img
			className={styles.poster}
			src={`http://image.tmdb.org/t/p/w154/${poster}`}
		/>
		</Link>
		<div className={styles.detailsContainer}>
			<div className={styles.titleContainer}>
				<h3 className={styles.title}>{title}</h3>
				<p className={styles.release}>({year})</p>
			</div>
			<ScoreCircle score={voteAvg}/>
		</div>
	</div>
    )
  }
  
const FilmsCarosel = ({ films }) => {

	if (films && films.length) {
		return (
			<div className={styles.carosel}>
				{films.map((f) => (
				<Film
					key={f.id}
					id={f.id}
					title={f.title}
					voteAvg={f.vote_average}
					release={f.release_date}
					poster={f.poster_path}	
				/>
				))}
			</div>
		)
	} else {
		return "Loading data..."
	}
}
  
export default FilmsCarosel
  