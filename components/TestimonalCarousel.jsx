import React, { useState } from 'react';
import { FaCaretLeft } from "react-icons/fa6";
import { FaCaretRight } from "react-icons/fa6";

const TestimonalCarousel = ({ children : testimonal }) => {
  const [ curr, setCurr ] = useState(0);

  const prev = () => setCurr((curr) => (curr === 0 ? testimonal.length - 1 : curr - 1));
  const next = () => setCurr((curr) => (curr === testimonal.length - 1 ? 0 : curr + 1));

  return (
    <div className='overflow-hidden relative'>
        <div className='flex justify-between items-center transition-transform ease-out duration-500 p-5' style={{ transform: `translateX(-${curr*100}%)`}}>{testimonal}</div>
        <div className='absolute inset-0 flex items-center justify-between'>
            <button onClick={prev}><FaCaretLeft size={20} /></button>
            <button onClick={next}><FaCaretRight size={20} /></button>
        </div>

        <div className='absolute -bottom-1 left-0 right-0'>
            <div className='flex items-center justify-center gap-2'>
                {testimonal.map((_, i) => (
                    <div className={`transition-all w-3 h-3 bg-green-4 rounded-full ${curr === i ? "p-2" : "bg-opacity-50"}`} />
                ))}
            </div>
        </div>
    </div>
  )
}

export default TestimonalCarousel