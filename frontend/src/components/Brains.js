import React from 'react'

import './Brains.css';

function Brains() {
  return (
    <div class="brains__card">
        <div class="brains__img-box">
            <img src="https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_auto/c_scale,w_400/ncom/en_US/games/switch/s/spongebob-krusty-cook-off-switch/description-image" alt="spongebob" />
        </div>
        <div class="brains__content">
            <div>
                <h3>Spongebob <br/> <span>Founder</span></h3>
                <ul class="brains__sci">
                    <li><i class="brains__fa-brands fa-facebook-f"></i></li>
                    <li><i class="brains__fa-brands fa-instagram"></i></li>
                    <li><i class="brains__fa-brands fa-twitter"></i></li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Brains