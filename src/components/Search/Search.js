import { Layout, List, Button, Tooltip } from 'antd';
import Search from 'antd/lib/input/Search';
import { useDispatch, useSelector } from 'react-redux';
import styles from './search.module.css';
import { Link } from 'react-router-dom';
import { getSearch, clearFilm, clearSearch } from '../reducers/filmReducer';
import { HeartTwoTone, HeartFilled } from '@ant-design/icons';
import { findAndPostFavourite, deleteFavourite } from '../reducers/userReducer';

const { Content } = Layout;

const Title = ({ item }) => {
	const releaseYear = item.release_date.substring(0, 4);

	return (
		<div>
			<h1 className={styles.name}>{item.title}</h1>
			<h4>({releaseYear})</h4>
		</div>
	);
};

const PosterAvatar = ({ item }) => {
	let dispatch = useDispatch();
	return (
		<Link to={`/film/${item.id}`} onClick={() => dispatch(clearFilm())}>
			<img
				className={styles.poster}
				src={`http://image.tmdb.org/t/p/w92/${item.poster_path}`}
				alt={`movie poster for ${item.title}`}
			/>
		</Link>
	);
};

const LikeButton = ({ handleAdd, handleRemove, liked, id }) => {
	return !liked ? (
		<Tooltip placement='bottom' title={'Add to favourites'}>
			<Button onClick={() => handleAdd(id)}>
				<HeartTwoTone twoToneColor='#AAAAAA' />
			</Button>
		</Tooltip>
	) : (
		<Tooltip placement='bottom' title={'Remove from favourites'}>
			<Button onClick={() => handleRemove(id)}>
				<HeartFilled style={{ color: '#CC0000' }} />
			</Button>
		</Tooltip>
	);
};

const SearchPage = () => {
	const dispatch = useDispatch();
	const searchResults = useSelector(({ films }) => films.search);
	const user = useSelector(({ user }) => user.details);
	const favourites = useSelector(({ user }) => user.favourites);

	const handleSearch = (value) => {
		dispatch(clearSearch());
		dispatch(getSearch(value));
	};

	const handleLike = (id) => {
		dispatch(findAndPostFavourite(id, user.id));
	};

	const handleRemove = (id) => {
		const film = favourites.find((fav) => fav.filmId === id);

		dispatch(deleteFavourite(film.id, user.id));
	};

	const checkLiked = (id) => {
		let liked = false;
		if (favourites)
			favourites.forEach((fav) => {
				if (fav.filmId === id) liked = true;
			});
		return liked;
	};

	return (
		<Content className={styles.container}>
			<Search
				placeholder='Search for film'
				onSearch={(value) => handleSearch(value)}
				className={styles.searchBar}
			/>
			<h1 className={styles.title}>Search Results</h1>
			{searchResults ? (
				<List
					bordered={true}
					pagination={{ pageSize: 5 }}
					className={styles.list}
					dataSource={searchResults}
					itemLayout='horizontal'
					renderItem={(item) => (
						<List.Item>
							<List.Item.Meta
								avatar={<PosterAvatar item={item} />}
								title={<Title item={item} />}
							/>
							<LikeButton
								id={item.id}
								handleAdd={handleLike}
								handleRemove={handleRemove}
								liked={checkLiked(item.id)}
							/>
						</List.Item>
					)}
				/>
			) : null}
		</Content>
	);
};

export default SearchPage;
