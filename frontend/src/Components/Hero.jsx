import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className='max-padd-container pt-[99px]'>
      <div className='max-padd-container bg-hero bg-center bg-cover bg-no-repeat h-[655px] w-full rounded-3xl'>
        <div className='relative top-30 xs:top-52'>
          <span className='medium-18'>Welcome to <span className='font-M'>m</span><span className='font-Logo'>Luxe</span></span>
          <h1 className='h1 max-w-[33rem]'>Discover Exceptional Home With <span className='font-M'>m</span><span className='font-Logo'>Luxe</span></h1>
          <p className='my-10 max-w-[33rem]'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque asperiores autem ratione provident perferendis? Eius voluptas expedita repellat, molestias vel illum! Explicabo modi sapiente delectus voluptates perspiciatis nam voluptatem exercitationem.</p>
          {/* Button */}
          <div className='inline-flex items-center justify-center gap-4 p-2 bg-white rounded-xl'>
            <div className='text-center regular-14 leading-tight pl-5'>
              <h4 className='uppercase font-bold'>10% off</h4>
              <p className='regular-14'>On Max Properties</p>
            </div>
            <Link to={'/listing'} className='btn-secondary rounded-xl flexCenter !py-5'>Book Now</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero