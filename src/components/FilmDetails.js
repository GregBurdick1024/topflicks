import { useEffect } from "react"
import { Layout, Button, Dropdown, Menu, Tooltip } from "antd"
import { Link, useParams } from 'react-router-dom'
import filmService from '../services/filmService'
import Genres from '../components/Genres'
import { TagOutlined, StarOutlined, UnorderedListOutlined } from '@ant-design/icons'
//import userService from "../services/userService"
import styles from './details.module.css'
import { useSelector } from "react-redux"
const { Content } = Layout



const FilmDetails = () => {

	let director = true
	let user = true

	const handleTagFilm = () => {

	}

	const handleRating = () => {

	}

	const film = useSelector(({ films }) => films.data)
	
	useEffect(() => {

	}, [])

	useEffect(() => {

	// const handleTagFilm = (watched) => {
	//   userService.addFavorite(film, director, watched)
	// }

	// const handleRating = (e) => {

	}, [])

	const watchMenu = (
	<Menu>
		<Menu.Item onClick={() => handleTagFilm(0)}>
		Want to Watch
		</Menu.Item>
		<Menu.Item onClick={() => handleTagFilm(1)}>
		Watched
		</Menu.Item>
	</Menu>
	)

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
				
				<div 
					className={styles.filmDetails} 
					style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${film.backdrop_path})` }}>
					<img className={styles.poster} src={`https://image.tmdb.org/t/p/w342/${film.poster_path}`} />
					<h1>{film.title}</h1>
					<h3>{film.director}</h3>
					{/* <Dropdown trigger={['click']} overlay={watchMenu}>
						<Tooltip overlayClassName={styles.tooltip} placement='bottom' title={user ? `Tag ${film.title}` : 'Log in to Tag film'} color='blue'>
						<Button><TagOutlined /></Button>
						</Tooltip>
					</Dropdown>
					<Tooltip overlayClassName={styles.tooltip} placement='bottom' title={user ? `Rate ${film.title}` : 'Log in to rate film'} color='blue'>
						<Button disabled={user ? false : true} onClick={handleRating}><StarOutlined /></Button>
					</Tooltip>
					<Dropdown trigger={['click']} overlay={listMenu}>
						<Tooltip overlayClassName={styles.tooltip} placement='bottom' title={user ? `Add to list or create new list` : 'Log in to create lists'} color='blue'>
						<Button disabled={user ? false : true} ><UnorderedListOutlined /></Button>
						</Tooltip>
					</Dropdown> */}
					<h3>{film.release_date}</h3>
					<Genres genres={film.genres} />
					<p>{film.vote_average}</p>
					<p>{film.vote_count}</p>
					<h2>{film.tagline}</h2>
					<p>{film.overview}</p>
				</div>
			</Content > 
		: null
	)
}

export default FilmDetails