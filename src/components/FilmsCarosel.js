import Carousel from "antd"
import { Link } from 'react-router-dom'
import styles from "./carosel.module.css"
import { useDispatch } from "react-redux"
import { initializeFilm } from "../reducers/filmReducer"

const Film = ({ title, voteAvg, release, poster, id }) => {
    const dispatch = useDispatch()

	const handleClick = (id) => {
		
		dispatch(initializeFilm(id))
	}
  

  
  return (
	<div className={styles.film} onClick={() => handleClick(id)}>
		<img
			className={styles.poster}
			src={`http://image.tmdb.org/t/p/w154/${poster}`}
		/>
		
		<p className={styles.rating}>{voteAvg}</p>
		<h3 className={styles.title}>{title}</h3>
		<p className={styles.release}>{release}</p>
	</div>
    )
  }
  
const FilmsCarosel = ({ films }) => {

	

	


	if (films && films.length) {
		return (
			<div className={styles.carosel}>
				
				{films.map((f) => (
				<Link key={f.id} to={`/film/${f.id}`}>
				<Film

					id={f.id}
					title={f.title}
					voteAvg={f.vote_average}
					release={f.release_date}
					poster={f.poster_path}
					
				/>
				</Link>
				))}
			</div>
		)
	} else {
		return "Loading data..."
	}
}
  
  export default FilmsCarosel
  