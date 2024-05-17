"use client"

import { PricingPlans, accordianData } from '@/constants'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import { MdDone } from "react-icons/md";
import { Button } from '@/components/ui/button';



const PricingPlanspage = () => {

  const [expanded, setExpanded] = React.useState(1);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  
  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&::before': {
      display: 'none',
    },
  }));
  
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
    expandIcon={<ArrowDropDownCircleIcon className='text-base' />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:"white",
    color: "#0F5132",
    border: "none",
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));
  
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
  }));
  
  
  return (
    <main>
      <div className='mt-20 w-[90%] m-auto'>
        <h1 className='text-6xl font-semibold text-blue text-center'>Choose Your Plan</h1>
        <div className='mt-10 grid grid-cols-2 grid-rows-1 border-2 border-black place-items-center '>
          {PricingPlans.map((data) => (
            <div className='border-2 border-black w-[350px] h-[570px] flex flex-col gap-2 p-5 rounded-xl relative'>
              <h1 className='text-indigo text-center text-4xl font-semibold' style={{ textShadow: "1px 3px 4px #00000040"}}>{data.heading}</h1>
              <div className='flex justify-end'>
              {data.heading === "Weekly Plan" && (<p className='rounded-3xl bg-[#32A3ABAD] text-[#933562] text-[6px] font-semibold p-1 w-[54px]'>{data.main}</p>)}
              </div>
              <h3 className='text-base font-semibold text-center'>Starts from</h3>
              <h1 className='font-semibold text-3xl text-center text-[#001062]'>{data.perThali}</h1>
              <div className='mt-5 flex flex-col gap-2'>
                <div className='flex gap-2 items-center'><MdDone size={25} /> <h3 className='font-semibold text-lg'>{data.titleone}</h3></div>
                <div className='flex gap-2 items-center'><MdDone size={25} /> <h3 className='font-semibold text-lg'>{data.titletwo}</h3></div>
                <div className='flex gap-2 items-center'><MdDone size={25} /> <h3 className='font-semibold text-lg'>{data.titlethird}</h3></div>
                <div className='flex gap-2 items-center'><MdDone size={25} /> <h3 className='font-semibold text-lg'>{data.titlefourth}</h3></div>
                <div className='flex gap-2 items-center'><MdDone size={25} /> <h3 className='font-semibold text-lg'>{data.titlefifth}</h3></div>
                {data.titlesixth && ( <div className='flex gap-2 items-center'><MdDone size={25} /> <h3 className='font-semibold text-lg'>{data.titlesixth}</h3></div> )}
                {data.titleseventh && ( <div className='flex gap-2 items-center'><MdDone size={25} /> <h3 className='font-semibold text-lg'>{data.titleseventh}</h3></div>)}
                {data.titleeight && ( <div className='flex gap-2 items-center'><MdDone size={25} /> <h3 className='font-semibold text-lg'>{data.titleeight}</h3></div>)}
                {data.titleninth && ( <div className='flex gap-2 items-center'><MdDone size={25} /> <h3 className='font-semibold text-lg'>{data.titleninth}</h3></div> )}
              </div>

              <Button className='text-center bg-green-4 opacity-65 absolute bottom-0 flex justify-center text-white font-normal text-xl hover:opacity-90 hover:bg-green-4 hover:text-white' >{data.buttonText}</Button>
            </div>
          ))}

        </div>
      </div>

      {/* <div className='mt-20 w-[80vw] m-auto '>
        <h1 className='text-2xl ml-5'>Questions ?</h1>
        <div className='mt-5'>
          {accordianData.map((data) => (
            <Accordion key={data.id} expanded={expanded === data.id} onChange={handleChange(data.id)}>
            <AccordionSummary aria-controls={`${data.id}-content`} id={`${data.id}-header`}>
               <p className='text-sm font-medium'>{data.title}</p>
            </AccordionSummary>
            <AccordionDetails>
              <p className='text-sm ml-6'>
                 {data.description}
              </p>
            </AccordionDetails>
          </Accordion>
          ))}
        </div>
      </div> */}
    </main>
  )
}

export default PricingPlanspage