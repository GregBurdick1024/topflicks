import { useEffect } from "react"
import { Layout, Button, Dropdown, Menu, Tooltip, Image } from "antd"
import { Link, useLocation } from 'react-router-dom'
import Genres from './component/Genres'
import { HeartFilled, 	HeartOutlined, StarOutlined, UnorderedListOutlined } from '@ant-design/icons'
import styles from './details.module.css'
import { useDispatch, useSelector } from "react-redux"
import { initializeDirector, initializeFilm } from "../reducers/filmReducer"
import { postFavourite, deleteFavourite } from "../reducers/userReducer"
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
				{score}
			</div>
		</div>
	)
}

const FilmDetails = () => {
	const location = useLocation()
	const dispatch = useDispatch()
	let filmId = location.pathname.substring(6)
	
	const user = useSelector(({ user }) => user)
	const film = useSelector(({ films }) => films.data)

	//gets film id from path and populates film data
	useEffect(() => {
		
		if(!film) {
			dispatch(initializeFilm(filmId))
			dispatch(initializeDirector(filmId))
		}
	}, [])
	
	const isFav = () => {
		let isFav = false
		user.favourites.forEach(f => {
			if(f.filmId === film.film_id){
				isFav = true
			}
				
		})
		
		return isFav
	}

	const handleAddFav = () => {
		let id = user.details.id
		dispatch(postFavourite(film, id))
	}
	
	const handleRemoveFav = () => {
		let id = user.details.id
		dispatch(deleteFavourite(filmId, id))
		console.log()
	}

	const handleRating = () => {

	}

	// const watchMenu = (
	// <Menu>
	// 	<Menu.Item onClick={() => handleTagFilm(0)}>
	// 	Want to Watch
	// 	</Menu.Item>
	// 	<Menu.Item onClick={() => handleTagFilm(1)}>
	// 	Watched
	// 	</Menu.Item>
	// </Menu>
	// )
	
	const listMenu = (
	<Menu>
		<Menu.Item>
		<Link to={`/newlist`}>
			Create List
		</Link>
		</Menu.Item>
		<Menu.Item>
		Add to List
		</Menu.Item>
	</Menu>
	)

	return (film && user ? 
		<Content>
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
						<h1 id={styles.title} className={styles.textStyle}>{film.title}</h1>
						<h3 id={styles.release}className={styles.textStyle}>({film.release_date ? film.release_date.substring(0,4) : null})</h3>
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
						{user.favourites && isFav() ? <Tooltip overlayClassName={styles.tooltip} placement='bottom' title={user ? null : 'Log in to add film'} color='blue'>
							<Button className={styles.button} onClick={handleRemoveFav}><HeartFilled /></Button> 
						</Tooltip> : <Tooltip overlayClassName={styles.tooltip} placement='bottom' title={user ? `Add to favourites` : 'Log in to add film'} color='blue'>
							<Button className={styles.button} onClick={handleAddFav}><HeartOutlined /></Button> 
						</Tooltip>}
						<Tooltip overlayClassName={styles.tooltip} placement='bottom' title={user ? `Rate ${film.title}` : 'Log in to rate film'} color='blue'>
							<Button className={styles.button} disabled={user ? false : true} onClick={handleRating}><StarOutlined/></Button>
						</Tooltip>
						<Dropdown trigger={['click']} overlay={listMenu}>
							<Tooltip overlayClassName={styles.tooltip} placement='bottom' title={user ? `Add to list or create new list` : 'Log in to create lists'} color='blue'>
								<Button className={styles.button} disabled={user ? false : true} ><UnorderedListOutlined /></Button>
							</Tooltip>
						</Dropdown>
					</div>
				</div>
			</div>		
		</Content > 
	: null)
}

export default FilmDetails