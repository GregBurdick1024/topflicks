import styles from './filmList.module.css'
import { Link } from 'react-router-dom'
import { Button, List } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { deleteFavourite } from '../../reducers/userReducer'
import { clearFilm } from '../../reducers/filmReducer'
import StarRating from './StarRating'

const FilmList = () => {

	let dispatch = useDispatch()
	
	const user = useSelector(({ user }) => user.details)
	const favourites = useSelector(({ user }) => user.favourites)


	const handleRemoveFav = (id) => {
		dispatch(deleteFavourite(id, user.id))	
	}

	return (favourites ?
		<div>
			<List
				bordered={true} 
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
							title={
								<div>
									<h1 className={styles.title}>{item.title}</h1>
									<h4>({item.releaseDate.substring(0,4)})</h4>
									<span className={styles.director}></span>{item.director}
								</div>
							}
						/>
						<div>
							<h3>{item.watched ? 'Seen' : 'Want to See'}</h3>
						</div>
						<div className={styles.ratingContainer}>
							
						</div>
						<StarRating rating={item.rating}/>
						<div><Button onClick={() => handleRemoveFav(item.id)}><DeleteOutlined />Remove</Button></div>
					</List.Item>
				)}
			/>
		</div>
		
		: 
		<div className={styles.emptyTable}>
			<h4>No favourites, Star a film to add it to this list. </h4> 
		</div>	
	)
}

export default FilmList