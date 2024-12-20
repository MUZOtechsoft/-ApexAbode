import React from 'react';
import { PuffLoader } from 'react-spinners';
import Items from '../Components/Items';
import Searchbar from '../Components/SearchBar';
import UseProperties from '../Hooks/UseProperties';

const Listing = () => {
  const { data = [], isError, isLoading } = UseProperties();
  //console.log(data)
  if (isError) {
    return (
      <div>
        <span>Error while fetching data</span>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className='h-64 flexCenter'>
        <PuffLoader size={80} color='#555' aria-label='puff-loading' />
      </div>
    )
  }
  return (
    <main className='max-padd-container my-[99px]'>
      <div className='max-padd-container py-10 xl:py-22 bg-primary rounded-3xl'>
        <div>
          <Searchbar />
          {/* Container */}
          <div className='grid gap-6 grid-col-1 sm:grid-cols-2 xl:grid-cols-3 mt-10'>
            {data.map((property) => (
              <Items key={property.id || property.title} property={property} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Listing