import React from 'react'
import bannerImg from '../assets/banner.png'
import Hero from '../Components/Hero'
import Properties from '../Components/Properties'
import About from './About'

const Home = () => {
  return (
    <main>
      <Hero/>
      <About/>
      <Properties/>
      <div className='max-padd-container py-16 overflow-x-hidden'>
        <img src={bannerImg} alt="" />
      </div>
    </main>
  )
}

export default Home