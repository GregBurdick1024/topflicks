import { Layout } from 'antd'
import FilmList from './component/FilmList'
import styles from './myFilms.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { deleteFavourite, setWatched, setRating } from '../reducers/userReducer'

const { Content } = Layout

const MyFilmsPage = () => {

	let dispatch = useDispatch()
	
	const user = useSelector(({ user }) => user.details)
	const favourites = useSelector(({ user }) => user.favourites)

	const handleRemoveFav = (id) => {
		dispatch(deleteFavourite(id, user.id))	
	}

	const toggleWatched = (id) => {
		dispatch(setWatched(id))
	}

    const handleRating = (id, index) => {
        dispatch(setRating(id, index + 1)) 
    }

	return (
	<Content className={styles.container}>
		<div className={styles.innerContainer}>
			{favourites ? 
			<FilmList remove={handleRemoveFav} favourites={favourites} watched={toggleWatched} handleRating={handleRating}/>
			: 
			<div className={styles.emptyTable}>
				<h4>No favourites, Star a film to add it to this list. </h4> 
			</div>}
		</div>
	</Content>
	)
}

export default MyFilmsPage
