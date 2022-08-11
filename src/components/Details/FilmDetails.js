import { useEffect } from "react"
import { Layout, Button, Dropdown, Menu, Tooltip } from "antd"
import { Link, useParams, useLocation } from 'react-router-dom'
import Genres from './component/Genres'
import { TagOutlined, StarOutlined, UnorderedListOutlined } from '@ant-design/icons'
//import userService from "../services/userService"
import styles from './details.module.css'
import { useDispatch, useSelector } from "react-redux"
import { initializeDirector, initializeFilm } from "../reducers/filmReducer"
import { postFavourite } from "../reducers/userReducer"
const { Content } = Layout



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



	const handleAddFav = () => {
		let id = user.details.id
		console.log(film)
		dispatch(postFavourite(film, id))
	}

	const handleRating = () => {

	}

	
	

	

	// useEffect(() => {

	// const handleTagFilm = (watched) => {
	//   userService.addFavorite(film, director, watched)
	// }

	// const handleRating = (e) => {

	// }, [])

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

	return (
		film ? 
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
						<img className={styles.poster} src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${film.poster_path}`} />
					</div>
					<div className={styles.textContainer}>
						<div className={styles.titleYear}>
							<h1 id={styles.filmTitle}>{film.title}</h1>
							<h3>({film.release_date.substring(0,4)})</h3>
						</div>
						<div className={styles.buttonsContainer}>
							<Tooltip overlayClassName={styles.tooltip} placement='bottom' title={user ? `Tag ${film.title}` : 'Log in to Star film'} color='blue'>
								<Button className={styles.button} onClick={handleAddFav}><StarOutlined /></Button>
							</Tooltip>
							<Tooltip overlayClassName={styles.tooltip} placement='bottom' title={user ? `Rate ${film.title}` : 'Log in to rate film'} color='blue'>
								<Button className={styles.button} disabled={user ? false : true} onClick={handleRating}><StarOutlined /></Button>
							</Tooltip>
							<Dropdown trigger={['click']} overlay={listMenu}>
								<Tooltip overlayClassName={styles.tooltip} placement='bottom' title={user ? `Add to list or create new list` : 'Log in to create lists'} color='blue'>
									<Button className={styles.button} disabled={user ? false : true} ><UnorderedListOutlined /></Button>
								</Tooltip>
							</Dropdown>
						</div>
						<Genres genres={film.genres} />
						{film.director ? 
							<h3>{film.director}</h3>
						: <h3>Unknown Director</h3>}
						<p>{film.vote_average}</p>
						<p>{film.vote_count}</p>
						<h3>{film.tagline}</h3>
						<div className={styles.overviewContainer}>
							<h2 className={styles.overviewTitle}>Overview</h2>
							<p>{film.overview}</p>
						</div>
					</div>
				</div>		
			</Content > 
		: null
	)
}

export default FilmDetails