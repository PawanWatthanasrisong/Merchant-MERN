import React from 'react'
import Rating from '@mui/material/Rating';

export default function Ratings(props) {
    const {rating, numReviews, caption} = props
  return (
    <div className='rating'>
        <span>
        <Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly />
        </span>
        <span>
            {caption ? (
              <span>{caption}</span>
            ) : (
              <span>{' ' + numReviews + ' reviews'}</span>
            )}
        </span>
    </div>
  )
}
