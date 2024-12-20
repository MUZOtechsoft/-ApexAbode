import React from 'react'
import { MdOutlineBathtub, MdOutlineBed, MdOutlineGarage } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import HeartBtn from './HeartBtn'

const Items = ({property}) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`../listing/${property.id}`)} className='rounded-2xl p-5 bg-white'>
        <div className='pb-2 relative'>
            <img src={property.image} className='rounded-xl' alt={property.title} />
            {/* like Btn */}
            <div className='absolute top-4 right-6'>
                <HeartBtn/>
            </div>
            <h5 className='text-secondary bold-16 my-1'>{property.city}</h5>
            <h3 className='medium-14 line-clamp-1 overflow-hidden text-ellipsis whitespace-nowrap max-w-xs'>{property.title}</h3>
            {/* info */}
            <div className='flex gap-x-2 py-2'>
                <div className='flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]'><MdOutlineBed/>{property.facilities.bedrooms}</div>
                <div className='flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]'><MdOutlineBathtub/>{property.facilities.bathrooms}</div>
                <div className='flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]'><MdOutlineGarage/>{property.facilities.parkings}</div>
            </div>
            <p className='pt-2 mb-4 line-clamp-2'>{property.description}</p>
            <div className='flexBetween'>
              <div className='bold-18'>${property.price}.00</div>
              <Link to={'/'} className='btn-secondary rounded-xl !py-[7px] !px-5 shadow-sm'><button>View Details</button></Link>
            </div>
        </div>
    </div>
  )
}

export default Items