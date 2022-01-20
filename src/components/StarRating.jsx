import React, {useState} from 'react';

import StarRatings from 'react-star-ratings';

function StarRating({rate}) {

  return (
    <StarRatings
      rating={rate}
      starRatedColor="yellow"
      numberOfStars={10}
      name='rating'
      starDimension="25px" 
    />
  );
}
export default StarRating
