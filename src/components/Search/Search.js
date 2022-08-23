import { Layout, List, Button, Tooltip } from 'antd'
import Search from 'antd/lib/input/Search'
import { useDispatch, useSelector } from 'react-redux'
import styles from './search.module.css'
import { Link } from 'react-router-dom'
import { getSearch, clearFilm, clearSearch } from '../reducers/filmReducer'
import { HeartTwoTone, HeartFilled } from '@ant-design/icons'
import { useEffect } from 'react'

const { Content } = Layout

const Title = ({ item }) => {
	const releaseYear = item.release_date.substring(0,4)
	
	return (
		<div>
			<h1 className={styles.name}>{item.title}</h1>
			<h4>({releaseYear})</h4>
		</div>
	)
}

const PosterAvatar = ({ item }) => {
	let dispatch = useDispatch()
	return (
		<Link to={`/film/${item.id}`} onClick={() => dispatch(clearFilm())}>
			<img 
				className={styles.poster}
				src={`http://image.tmdb.org/t/p/w92/${item.poster_path}`}
			/>
		</Link>
	)	
}

const LikeButton = () => {

	return (
		<Tooltip placement='bottom' title={'Add to favourites'}>
			<Button>
				<HeartTwoTone twoToneColor='#AAAAAA' />
			</Button>
		</Tooltip>
	)
}

const SearchPage = () => {
	const dispatch = useDispatch()
	const searchResults = useSelector(({ films }) => films.search)

	
	const handleSearch = (value) => {
		dispatch(clearSearch())
		dispatch(getSearch(value))
	}

	

	return (
	<Content className={styles.container}>
		<Search
		placeholder="Search for film"
		onSearch={(value) => handleSearch(value)}
		className={styles.searchBar}
		/>
		<h1 className={styles.title} >Search Results</h1>
		{searchResults ?
		<List
			bordered={true}
			pagination={{pageSize: 5}}
			className={styles.list}
			dataSource={searchResults} 
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
					<LikeButton />
				</List.Item>
			)}
			/>
			: null}
	</Content>
	)
}

export default SearchPage