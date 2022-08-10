import styles from './list.module.css'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'

const Film = () => {


	const handleRemove = async () => {

	}

	//const year = release.substring(0, 4)
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
		<p>{tagline}</p>
		</td>
		<td><h2>{year}</h2></td>
		<td>{director}</td>
		<td>{vote}</td>
		<td><h3>{rating}</h3></td>
		<td><p>{watched ? 'Seen' : 'Want to See'}</p></td>
		<td><Button onClick={handleRemove}><CloseOutlined /></Button></td>
	</tr>
	)
}

const TaggedTable = () => {

	const favourites = useSelector(({ user }) => user.favourites)

	return (
	<table>
		<tbody>
		{
			favourites.map(d =>
			<Film key={d.film_id} vote={d.vote_average} director={d.director} poster={d.poster_path} title={d.title} tagline={d.tagline} watched={d.watched} rating={d.rating} id={d.md_id} release={d.release_date} />
			)
		}
		</tbody>
	</table>
	)
}

export default TaggedTable