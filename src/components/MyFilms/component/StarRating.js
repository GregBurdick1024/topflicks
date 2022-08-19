import styles from './starRating.module.css'
import { StarOutlined, StarFilled } from '@ant-design/icons'
import { Button } from 'antd'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setRating } from '../../reducers/userReducer'

const StarRating = ({ rating }) => {
    
    
    const [hover, setHover] = useState(0)
    const dispatch = useDispatch()
    
    const handleClick = (index) => {
        dispatch(setRating(index))
    }

    return (
        <div className={styles.ratingContainer}>
            <div className={styles.starContainer}>
                {[...Array(5)].map((star, index) => {
                    return (
                        <Button
                        key={index}
                        className={styles.button}
                        onClick={() => handleClick(index)}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}>
                        <StarFilled
                            key={index}
                            className={index <= (hover || rating) ? styles.starOn : styles.starOff}
                            
                        />
                        </Button>
                    )
                })}
            </div>
            <h3>{rating || rating === 0 ? null : 'No rating'}</h3>
        </div>
    )


}


export default StarRating