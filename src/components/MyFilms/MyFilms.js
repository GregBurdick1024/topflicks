import { Layout } from 'antd'
import FilmList from './component/FilmList'
import styles from './myFilms.module.css'

const { Content } = Layout
const MyFilmsPage = () => {

  return (
	<Content className={styles.container}>
		<div className={styles.innerContainer}>
			{/* <h1 className={styles.title}>Favourites</h1> */}
			<FilmList/>
		</div>
	</Content>
  )
}

export default MyFilmsPage
