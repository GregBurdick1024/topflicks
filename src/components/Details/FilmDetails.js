import { useEffect, useState } from "react"
import { Layout, Button, Menu, Tooltip, Image } from "antd"
import { useLocation } from 'react-router-dom'
import Genres from './component/Genres'
import { EyeInvisibleTwoTone, EyeTwoTone, HeartFilled, 	HeartOutlined } from '@ant-design/icons'
import styles from './details.module.css'
import { useDispatch, useSelector } from "react-redux"
import { initializeDirector, initializeFilm } from "../reducers/filmReducer"
import { postFavourite, deleteFavourite, setWatched, setRating } from "../reducers/userReducer"
import StarRating from '../MyFilms/component/StarRating'

const { Content } = Layout

const ScoreCircle = () => {
	let score = useSelector(({ films }) => films.data.vote_average)
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
				{String(score)}
			</div>
		</div>
	)
}

const FilmDetails = () => {
	const location = useLocation()
	const dispatch = useDispatch()
	let filmId = location.pathname.substring(6)
	
	const user = useSelector(({ user }) => user)
	const favourites = useSelector(({ user }) => user.favourites)
	const film = useSelector(({ films }) => films.data)

	const [currentFilm, setCurrentFilm] = useState(null)

	//gets film id from path and populates film data
	useEffect(() => {
		setCurrentFilm(null)
		if(!film){
			dispatch(initializeFilm(filmId))
			dispatch(initializeDirector(filmId))
		}
		if(favourites && film){
			favourites.forEach(f => {			
				if(f.filmId === film.film_id){
					setCurrentFilm(f)
					console.log(f)
				}
			})
		}
	}, [favourites, film])

	const handleAddFav = () => {
		let id = user.details.id
		dispatch(postFavourite(film, id))
	}
	
	const handleRemoveFav = () => {
		let id = user.details.id
		dispatch(deleteFavourite(currentFilm.id, id))
	}

	const handleRating = (id, index) => {
        dispatch(setRating(id, index + 1)) 
    }

	const toggleWatched = () => {
		dispatch(setWatched(currentFilm.id))
	}
	
	return (film && user ? 
		<Content className={styles.mainContainer}>
			<div className={styles.filmDetails}>
				<div className={styles.backgroundPoster} 
					style={
						{ 
							backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${film.backdrop_path})`,
						}
				}>
				</div>
				<div className={styles.posterContainer}>
					<Image className={styles.poster} src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${film.poster_path}`} />
				</div>
				<div className={styles.textContainer}>
					<div className={styles.titleYear}>
						<h1 id={styles.title} className={styles.textStyle}>{film.title}
						<span id={styles.release}className={styles.textStyle}>({film.release_date ? film.release_date.substring(0,4) : null})</span></h1>
					</div>
						<h3 id={styles.tagline}className={styles.textStyle}>"{film.tagline}"</h3>
					<Genres genres={film.genres} />
					{film.director ? 
						<h3 className={styles.textStyle}>{film.director}</h3>
						: <h3>Unknown Director</h3>}
					<ScoreCircle />
					<div className={styles.overviewContainer}>
						<h2 className={styles.overviewTitle}>Overview</h2>
						<p>{film.overview}</p>
					</div>
					<div className={styles.buttonsContainer}>
						{currentFilm ? <Tooltip overlayClassName={styles.tooltip} placement='bottom' title={'Remove favourite'}>
							<Button className={styles.button} onClick={handleRemoveFav}><HeartFilled /></Button> 
						</Tooltip> : <Tooltip overlayClassName={styles.tooltip} placement='bottom' title={user ? `Add to favourites` : 'Log in to add film'}>
							<Button className={styles.button} onClick={handleAddFav}><HeartOutlined /></Button> 
						</Tooltip>}
						{!currentFilm 
							? <Button className={styles.button} disabled={true} ><EyeInvisibleTwoTone /></Button> 
							: !currentFilm.watched ? 
								<Tooltip overlayClassName={styles.tooltip} placement='bottom' title={'Seen'}>
									<Button onClick={toggleWatched} className={styles.button}><EyeInvisibleTwoTone /></Button>
								</Tooltip> 
								: 
								<Tooltip overlayClassName={styles.tooltip} placement='bottom' title={'Want to see'}>
									<Button onClick={toggleWatched} className={styles.button}><EyeTwoTone /></Button>
								</Tooltip> 
						}
						{currentFilm ? <StarRating userRating={currentFilm.rating} seen={currentFilm.watched} id={currentFilm.id} handleRating={handleRating}/> : <StarRating />}
					</div>
				</div>
			</div>		
		</Content > 
	: null)
}

export default FilmDetails