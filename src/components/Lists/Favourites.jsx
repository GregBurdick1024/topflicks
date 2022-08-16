import styles from './favourites.module.css'
import { Link, useLocation } from 'react-router-dom'
import { Button, List } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { deleteFavourite } from '../reducers/userReducer'
import { clearFilm } from '../reducers/filmReducer'

const Film = ({ id, md_id, title, release, director, vote, rating, watched, poster}) => {
	let dispatch = useDispatch()
	const user = useSelector(({ user }) => user.details)
	const handleRemoveFav = () => {
		dispatch(deleteFavourite(id, user.id))	
	}

	

	const year = release.substring(0, 4)
	return (
	<div>
		<div>
			<Link to={`/film/${md_id}`} onClick={() => dispatch(clearFilm())}>
				<img
				className={styles.poster}
				src={`http://image.tmdb.org/t/p/w92/${poster}`}
				/>
			</Link>
		</div>
		<div className={styles.firstColumn}>
			<h1 className={styles.title}>{title}</h1>
			<h4>({year})</h4>
			<span className={styles.director}></span>{director}
		</div>
		<div>{vote}</div>
		<div><h3>{rating}</h3></div>
		<div><p>{watched ? 'Seen' : 'Want to See'}</p></div>
		<div><Button onClick={handleRemoveFav}><DeleteOutlined /></Button></div>
	</div>
	)
}

const Favourites = () => {

	let dispatch = useDispatch()
	
	const user = useSelector(({ user }) => user.details)
	
	const handleRemoveFav = (id) => {
		dispatch(deleteFavourite(id, user.id))	
	}


	const favourites = useSelector(({ user }) => user.favourites)
	
	return (favourites ?
		<List 
			className={styles.table} 
			dataSource={favourites} 
			itemLayout="horizontal"
			renderItem={(item) => (
				<List.Item>
				<List.Item.Meta 
					avatar={
							<Link to={`/film/${item.filmId}`} onClick={() => dispatch(clearFilm())}>
								<img
									className={styles.poster}
									src={`http://image.tmdb.org/t/p/w92/${item.posterPath}`}
								/>
							</Link>
						}
					title={<div className={styles.firstColumn}>
					<h1 className={styles.title}>{item.title}</h1>
					<h4>({item.releaseDate.substring(0,4)})</h4>
					<span className={styles.director}></span>{item.director}
				</div>}
				/>
					<div><Button onClick={handleRemoveFav}><DeleteOutlined />Remove</Button></div>
			</List.Item>
			)}
			/>
		: 
		<div className={styles.emptyTable}>
			<h4>No favourites, Star a film to add it to this list. </h4> 
		</div>	
	)
}

export default Favourites