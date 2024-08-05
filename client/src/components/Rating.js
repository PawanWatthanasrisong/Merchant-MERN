import React from 'react'
import Rating from '@mui/material/Rating';

export default function Ratings(props) {
    const {rating, numReviews} = props
  return (
    <div className='rating'>
        <span>
        <Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly />
        </span>
        <span>
            {numReviews} reviews
        </span>
    </div>
  )
}
