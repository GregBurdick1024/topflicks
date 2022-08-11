import styles from './table.module.css'
import { Link, useLocation } from 'react-router-dom'
import { Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { deleteFavourite } from '../reducers/userReducer'

const Film = ({ id, title, release, director, vote, rating, watched, poster}) => {
	let dispatch = useDispatch()
	const user = useSelector(({ user }) => user.details)
	const handleRemoveFav = () => {
		dispatch(deleteFavourite(id, user.id))
	}

	const year = release.substring(0, 4)
	return (
	<tr>
		<td>
		<Link to={`/film/${id}`}>
			<img
			className={styles.poster}
			src={`http://image.tmdb.org/t/p/w92/${poster}`}
			/>
		</Link>
		</td>
		<td>
		<h1>{title}</h1>
		<h4>({year})</h4>
		<span className={styles.director}></span>Directed by: {director}
		</td>
		<td></td>
		
		<td>{vote}</td>
		<td><h3>{rating}</h3></td>
		<td><p>{watched ? 'Seen' : 'Want to See'}</p></td>
		<td><Button onClick={handleRemoveFav}><CloseOutlined /></Button></td>
	</tr>
	)
}

const TaggedTable = () => {

	const favourites = useSelector(({ user }) => user.favourites)
	console.log(favourites)
	return (
		favourites[0] ?
		<table className={styles.table}>
			<tbody>
				{favourites.map(d =>
					<Film 
						key={d.id} 
						vote={d.voteAverage} 
						director={d.director} 
						poster={d.posterPath} 
						title={d.title} 
						watched={d.watched} 
						rating={d.rating}
						release={d.releaseDate} 
						id={d.id}  
					/>
				)}
			</tbody>
		</table>
		: <h4>No favourites, Star a film to add it to this list. </h4> 
	)
}

export default TaggedTable