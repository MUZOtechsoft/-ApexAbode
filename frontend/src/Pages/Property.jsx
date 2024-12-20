import React from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { MdOutlineBathtub, MdOutlineBed, MdOutlineGarage } from 'react-icons/md';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';
import HeartBtn from '../Components/HeartBtn';
import Map from '../Components/Map';
import { getProperty } from '../Utils/api';

const Property = () => {

  const { pathname } = useLocation();
  //console.log(pathname)
  const id = pathname.split("/").slice(-1)[0];
  //console.log(id);
  const { data = [], isError, isLoading } = useQuery(["resd", id], () => getProperty(id));
  //console.log(data)
  if (isLoading) {
    return (
      <div className='h-64 flexCenter'>
        <PuffLoader size={80} color='#555' aria-label='puff-loading' />
      </div>
    )
  }
  if (isError) {
    return (
      <div>
        <span>Error while fetching data</span>
      </div>
    )
  }
  return (
    <section className='max-padd-container my-[99px]'>
      <div className='pb-2 relative'>
        <img src={data?.image} className='rounded-xl max-h-[27rem] self-center w-full object-cover' alt={data?.title} />
        {/* like Btn */}
        <div className='absolute top-4 right-6'>
          <HeartBtn />
        </div>
      </div>
      {/* container */}
      <div className='xl:flexBetween'>
        {/* Left */}
        <div className='flex-1'>
          <h5 className='text-secondary bold-16 my-1'>{data?.city}</h5>
          <div className='flexBetween'>
          <h3 className='medium-14 line-clamp-1 overflow-hidden text-ellipsis whitespace-nowrap max-w-xs'>{data?.title}</h3>
          <div className='bold-18'>${data?.price}.00</div>
          </div>
          {/* info */}
          <div className='flex gap-x-4 py-2'>
            <div className='flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]'><MdOutlineBed />{data?.facilities.bedrooms}</div>
            <div className='flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]'><MdOutlineBathtub />{data?.facilities.bathrooms}</div>
            <div className='flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]'><MdOutlineGarage />{data?.facilities.parkings}</div>
          </div>
          <p className='pt-2 mb-4'>{data?.description}</p>
          <div className='flexStart gap-x-2 my-5'>
            <FaLocationDot/>
            <div >
              {data?.address} {data?.city} {data?.country}
            </div>
          </div>
          <div className='flexBetween'>
            <button className='btn-secondary rounded-xl !py-[7px] !px-5 shadow-sm'>Book the visit</button>
          </div>
        </div>
        {/* Right */}
        <div className='flex-1'>
          <Map address={data?.address} city={data?.city} country={data?.country}/>
        </div>
      </div>
    </section>
  )
}

export default Property