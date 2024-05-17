import React from 'react';
import { blogsCard } from '@/constants/index';

const Blogspage = () => {
  return (
    <main>
      <div className='w-[88%] relative h-[200px] m-auto' style={{backgroundImage: 'url("/assets/money.jpg")', backgroundPosition: 'center', backgroundSize: 'cover' }}>
        <div className='w-full h-full absolute top-0' style={{ backdropFilter: 'blur(2px)', backgroundColor: 'white', opacity: '.7'}}></div>
        <div className='flex flex-col gap-2 relative'>
          <div className='rounded-md p-1 bg-green-4 z-50 text-white ml-5 mt-5 w-14 text-sm flex items-center justify-center'>Latest</div>
          <h1 className='text-5xl font-bold text-green-5 z-50 mt-1 ml-10 leading-11'>How GenZ's are spending too much on food online and still feels unsatisfied everyday</h1></div>
      </div>

      <div className='w-[85%] m-auto mt-5 h-40 flex justify-between items-center'>
        <h4 className='text-base font-normal'>All</h4>
        <div className='w-32 bg-gray-4 rounded-3xl flex justify-around items-center' style={{ border: '1px solid #0000001A'}}>
          <input className='w-24 p-1 bg-transparent text-base font-normal rounded-3xl text-black' style={{ outline: 'none', border: 'none' }} placeholder='Search...' />
          <div className='rounded-3xl bg-[#ced2ce] cursor-pointer flex items-center mr-1 p-1'><img src='/assets/search.svg' alt='search' width={25} height={30} /></div>
        </div>
      </div>

      <div className='w-[85%] m-auto mt-10'>
        <div className='grid grid-cols-2 grid-rows-2 place-items-center gap-20 place-content-between'>
          {blogsCard.map((data) => (
            <div key={data.id} className='w-[450px] h-[480px] p-3 flex flex-col rounded-md gap-4 cursor-pointer shadow-md' style={{ border: '1px solid #0000001A'}}>
              <img src={data.img} alt={data.id} width={430}   />
              <h5 className='font-bold text-lg pb-2'  style={{ borderBottom: '1px solid #0000001A'}}>{data.title}</h5>
              <p className='font-normal text-xs'>{data.description}</p>
              <div className='flex justify-between items-center'>
                <p className='text-xs font-normal'>{data.date}</p>
                <p className='text-xs font-normal'>{data.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Blogspage