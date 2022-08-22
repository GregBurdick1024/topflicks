import styles from './filmList.module.css'
import { Link } from 'react-router-dom'
import { Button, List } from 'antd'
import { DeleteOutlined, EyeTwoTone, EyeInvisibleTwoTone } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { clearFilm } from '../../reducers/filmReducer'
import StarRating from './StarRating'
import { useState, useEffect } from 'react'

const PosterAvatar = ({ item }) => {
	let dispatch = useDispatch()
	return (
		<Link to={`/film/${item.filmId}`} onClick={() => dispatch(clearFilm())}>
			<img 
				className={styles.poster}
				src={`http://image.tmdb.org/t/p/w92/${item.posterPath}`}
			/>
		</Link>
	)
	
}

const Title = ({ item }) => {

	return (
		<div>
			<h1 className={styles.title}>{item.title}</h1>
			<h4>({item.releaseDate.substring(0,4)})</h4>
			<span className={styles.director}></span>{item.director}
		</div>
	)
}

const WatchedButton = ({ item, watched}) => {

	const [toggle, setToggle] = useState(item.watched)

	useEffect(() => {
		
	},[item] )
	const handleClick = () => {
		
		watched(item.id)
		setToggle(!toggle)
	}

	return (
		<div>
			{toggle 
			? <Button 
				onClick={handleClick} 
				className={styles.seenButton}>
				<EyeTwoTone twoToneColor="#08E030"/>
				Seen
			</Button>
			: <Button 
				onClick={handleClick} 
				className={styles.seenButton}>
				Want to See
			</Button>}
		</div>
	)
}


const FilmList = ({ favourites, remove, watched }) => {

	

	return (
		<div>
			<List
				bordered={true} 
				dataSource={favourites} 
				itemLayout="horizontal"
				renderItem={(item) => (
					<List.Item>
						<List.Item.Meta 
							avatar={
									<PosterAvatar item={item}/>
								}
							title={
								<Title item={item}/>
							}
						/>
						<WatchedButton item={item} watched={watched}/>
						<StarRating rating={item.rating} seen={item.watched} id={item.id}/>
						<div><Button onClick={() => remove(item.id)}><DeleteOutlined />Remove</Button></div>
					</List.Item>
				)}
			/>
		</div>	
	)
}

export default FilmList