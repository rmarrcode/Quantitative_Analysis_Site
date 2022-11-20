import React from 'react'

import "./Team.css";

function Team() {
  return (

    <div className="team__section">
       
       <div class="panel-wrapper">
        <div class="panel">
          <div>
            <img className='team__member' 
              src="https://cdn3.iconfinder.com/data/icons/developers-iconset/90/Developers_Colorai-12-512.png"
              alt=""
            />
          </div>
          <h3 class="name">Anna Houston</h3>
          <p class="position">Senior Developer</p>

          <p class="team__background">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            aliquam quam est recusandae nulla nostrum laboriosam porro maxime
            veritatis, nesciunt quibusdam molestiae rem sint blanditiis rerum
            sequi dolorum eveniet saepe.
          </p>
          <div class="soicals">
            <a href="#"><i class="fab fa-facebook"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-pinterest"></i></a>
            <a href="#"><i class="fab fa-twitter-square"></i></a>
          </div>
        </div>

        <div class="panel">
          <div>
            <img className='team__member'
              src="https://cdn3.iconfinder.com/data/icons/developers-iconset/90/Developers_Colorai-08-512.png"
              alt=""
            />
          </div>
          <h3 class="name">Colby Collins</h3>
          <p class="position">Senior Developer</p>
          <p class="team__background">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            aliquam quam est recusandae nulla nostrum laboriosam porro maxime
            veritatis, nesciunt quibusdam molestiae rem sint blanditiis rerum
            sequi dolorum eveniet saepe.
          </p>
          <div class="soicals">
            <a href="#"><i class="fab fa-facebook"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-pinterest"></i></a>
            <a href="#"><i class="fab fa-twitter-square"></i></a>
          </div>
        </div>

        <div class="panel">
          <div><img className='team__member' src="https://media-exp1.licdn.com/dms/image/C5603AQHwR6-a0Q4w9Q/profile-displayphoto-shrink_200_200/0/1651265638280?e=2147483647&v=beta&t=EAV6z-2b1rBRNWkor5FmrwtyIQhnCXNKP0Tr6skF9kM" alt="" /></div>
          <h3 class="name">Samuel Philp</h3>
          <p class="position">Mid Developer</p>
          <p class="team__background">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            aliquam quam est recusandae nulla nostrum laboriosam porro maxime
            veritatis, nesciunt quibusdam molestiae rem sint blanditiis rerum
            sequi dolorum eveniet saepe.
          </p>
          <div class="soicals">
            <a href="#"><i class="fab fa-facebook"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-pinterest"></i></a>
            <a href="#"><i class="fab fa-twitter-square"></i></a>
          </div>
        </div>

        <div class="panel">
          <div>
            <img className='team__member'
              src="https://cdn3.iconfinder.com/data/icons/developers-iconset/90/Developers_Colorai-10-512.png"
              alt=""
            />
          </div>
          <h3 class="name">Lauren Conwell</h3>
          <p class="position">Junior Developer</p>
          <p class="team__background">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            aliquam quam est recusandae nulla nostrum laboriosam porro maxime
            veritatis, nesciunt quibusdam molestiae rem sint blanditiis rerum
            sequi dolorum eveniet saepe.
          </p>
          <div class="soicals">
            <a href="#"><i class="fab fa-facebook"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-pinterest"></i></a>
            <a href="#"><i class="fab fa-twitter-square"></i></a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Team