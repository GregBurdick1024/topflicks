import styles from './starRating.module.css'
import { StarOutlined, StarFilled } from '@ant-design/icons'
import { Button } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setRating } from '../../reducers/userReducer'

const StarRating = ({ userRating, seen, id }) => {
    
    
    const [hover, setHover] = useState(0)
    const [rating, setRating] = useState(userRating)
    const dispatch = useDispatch()
    
    useEffect(() => {

    }, [rating])

    const handleClick = (index) => {
        dispatch(setRating(id, index + 1)) 
    }

    return (
        <div className={styles.ratingContainer}>
            <div className={styles.starContainer}>
                {[...Array(5)].map((star, index) => {
                    return (
                        <Button
                        disabled={seen ? false : true}
                        key={index}
                        className={styles.button}
                        onClick={() => handleClick(index)}
                        onMouseEnter={() => setHover(index + 1)}
                        onMouseLeave={() => setHover(null)}>
                        <StarFilled
                            key={index}
                            className={index < (hover || rating) ? styles.starOn : styles.starOff}
                            
                        />
                        </Button>
                    )
                })}
            </div>
            <h5>{rating || rating === 0 ? null : 'No rating'}</h5>
        </div>
    )


}


export default StarRating