import styles from './genres.module.css'

const Genres = ({ genres }) => {
  if (genres) {
    return (
      <div className={styles.genres}>
        {genres.map(g =>
          <div className={styles.genre} key={g.id}>{g.name}</div>
        )}
      </div>
    )
  } else {
    return null
  }
}

export default Genres