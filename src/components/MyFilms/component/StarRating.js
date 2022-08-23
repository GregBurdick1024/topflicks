import styles from './starRating.module.css'
import { StarOutlined, StarFilled } from '@ant-design/icons'
import { Button } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setRating } from '../../reducers/userReducer'

const StarRating = ({ userRating, seen, id, handleRating }) => {
    const [hover, setHover] = useState(0)
    console.log(userRating)

    return (
        <div className={styles.ratingContainer}>
            <div className={styles.starContainer}>
                {[...Array(5)].map((star, index) => {
                    return (
                        <Button
                        disabled={seen ? false : true}
                        key={index}
                        className={styles.button}
                        onClick={() => handleRating(id, index)}
                        onMouseEnter={() => setHover(index + 1)}
                        onMouseLeave={() => setHover(null)}>
                        <StarFilled
                            key={index}
                            className={!seen ? styles.starOff : index < (hover || userRating) ? styles.starOn : styles.starOff}
                            
                        />
                        </Button>
                    )
                })}
            </div>
            <h5>{!seen ? null : userRating || userRating === 0 ? null : 'No rating'}</h5>
        </div>
    )


}


export default StarRating