import React from 'react'

const Genres = ({ genres }) => {
  if (genres) {
    return (
      <ul>
        {genres.map(g =>
          <li key={g.id}>{g.name}</li>
        )}
      </ul>
    )
  } else {
    return <div></div>
  }
}

export default Genres