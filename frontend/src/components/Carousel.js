import React from 'react'
import $ from 'jquery'
import "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.js"
import "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"

import "./Carousel.css"

$(document).ready(function(){
    $('.carousel').carousel();
});

function Carousel() {
  return (
    <div class="carousel">
       
        <a class="carousel-item" href=""><img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/33/Patrick_Star.svg/1200px-Patrick_Star.svg.png"/></a>
        <a class="carousel-item" href="#two!"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/33/Patrick_Star.svg/1200px-Patrick_Star.svg.png"/></a>
        <a class="carousel-item" href="#three!"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/33/Patrick_Star.svg/1200px-Patrick_Star.svg.png"/></a>
        <a class="carousel-item" href="#four!"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/33/Patrick_Star.svg/1200px-Patrick_Star.svg.png"/></a>
        <a class="carousel-item" href="#five!"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/33/Patrick_Star.svg/1200px-Patrick_Star.svg.png"/></a>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.js"></script>
  </div>




  )
}

export default Carousel