import React from 'react'
import './Hero.css';

function Hero() {
  return (
    <section class="hero">
      <div class="hero-center">
        <article class="hero-info">
          <h1>
            payments infrastructure <br />
            for the internet
          </h1>
          <p>
            Millions of businesses of all sizes—from startups to large
            enterprises—use Stripe’s software and APIs to accept payments, send
            payouts, and manage their businesses online.
          </p>
          <button class="btn">Start now</button>
        </article>
      </div>
    </section>
  )
}

export default Hero