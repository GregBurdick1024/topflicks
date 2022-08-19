import { Layout, List, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import Search from 'antd/lib/input/Search'
import { useDispatch, useSelector } from 'react-redux'
import styles from './search.module.css'
import { Link } from 'react-router-dom'
import { getSearch, clearFilm, clearSearch } from '../reducers/filmReducer'
import { deleteFavourite } from '../reducers/userReducer'

const { Content } = Layout

const SearchPage = () => {
	const dispatch = useDispatch()
	const user = useSelector(({ user }) => user.details)
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
							<>
								<Link to={`/film/${item.id}`} onClick={() => dispatch(clearFilm())}>
									<img 
										className={styles.poster}
										src={`http://image.tmdb.org/t/p/w92/${item.poster_path}`}
									/>
								</Link>
							</>
							}
						title={
							<div className={styles.firstColumn}>
								<h1 className={styles.title}>{item.title}</h1>
								<h4>({item.release_date.substring(0,4)})</h4>
								<span className={styles.director}></span>{item.director}
							</div>
						}
					/>
					<div><h3>{item.watched ? 'Seen' : 'Want to See'}</h3></div>
					<div><h3>{item.rating ? item.rating : 'No rating'}</h3></div>
				</List.Item>
			)}
			/>
			: null}
	</Content>
	)
}

export default SearchPage