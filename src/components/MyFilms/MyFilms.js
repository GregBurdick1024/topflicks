import { Layout } from 'antd'
import Favourites from '../Lists/Favourites'
import styles from './myFilms.module.css'


const { Content } = Layout
const MyFilmsPage = () => {

  return (
	<Content>
		<div className={styles.container}>
			<h1>My Films</h1>
			<Favourites/>
		</div>
	</Content>
  )
}

export default MyFilmsPage
