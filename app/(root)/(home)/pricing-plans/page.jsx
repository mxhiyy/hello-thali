"use client"

import PricingPlansCard from '@/components/PricingPlansCard'
import { PricingPlans, accordianData } from '@/constants'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';


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
      <div className='text-center text-2xl mt-10'><h1>Pricing Plans</h1></div>
      <div className='flex flex-col xl:flex-row justify-center items-center mt-10 gap-5'>
        {PricingPlans.map((data) => (
          <PricingPlansCard data={data} key={data.heading} />
        ))}
      </div>

      <div className='flex justify-center items-center w-[80vw] m-auto border-t-2 border-b-2 border-gray-3 p-6 mt-20'>
        <h6 className='text-sm font-medium'>HelloThali Subscription <span className='text-green-1'>Terms & Conditions</span></h6>
      </div>

      <div className='mt-20 w-[80vw] m-auto '>
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
      </div>

      <div className='mt-20 flex flex-col gap-4 p-3 bg-gray-2'>
        <h2 className='text-base font-normal mt-2'>We are single and always free to get in touch with you. <br /> Feel free to message us or give a missed call</h2>
        <div className='w-40'>
        <button className='bg-green-1 text-sm font-normal p-2 rounded-md text-white'>Contact us</button>
        </div>
      </div>
    </main>
  )
}

export default PricingPlanspage