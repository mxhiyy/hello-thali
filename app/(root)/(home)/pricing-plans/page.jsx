"use client";

import { PricingPlans, accordianData } from "@/constants";
import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import HelpIcon from "@mui/icons-material/Help";
import { MdDone } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const PricingPlanspage = () => {
  const [expanded, setExpanded] = React.useState(1);
  const route = useRouter();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    padding: theme.spacing(1),
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&::before": {
      display: "none",
    },
  }));

  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<HelpIcon className="text-2xl text-black" />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor: "white",
    border: "none",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(360deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
  }));

  return (
    <main>
      <div className="mt-20 w-[90%] m-auto">
        <h1 className="text-6xl font-semibold text-blue text-center">
          Choose Your Plan
        </h1>
        <div className="mt-10 grid grid-cols-2 grid-rows-1 place-items-center">
          {PricingPlans.map((data) => (
            <div
              key={data.heading}
              className="w-[350px] h-[570px] flex flex-col gap-2 p-5 rounded-xl relative"
              style={{ background: `${data.cardcolor}` }}
            >
              <h1 className="text-indigo text-center text-4xl font-bold">
                {data.heading}
              </h1>

              <div className="flex justify-end">
                {data.heading === "Weekly Plan" && (
                  <p className="rounded-3xl bg-[#32A3ABAD] flex justify-center items-center text-[#933562] text-[10px] font-semibold px-2 w-auto">
                    {data.main}
                  </p>
                )}
              </div>
              <h3 className="text-base font-semibold text-center">
                Starts from
              </h3>
              <h1 className="font-semibold text-3xl text-center text-[#001062]">
                {data.perThali}
              </h1>
              <div className="mt-5 flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <MdDone size={24} />{" "}
                  <h3 className="font-semibold text-lg">{data.titleone}</h3>
                </div>
                <div className="flex gap-2 items-center">
                  <MdDone size={24} />{" "}
                  <h3 className="font-semibold text-lg">{data.titletwo}</h3>
                </div>
                <div className="flex gap-2 items-center">
                  <MdDone size={24} />{" "}
                  <h3 className="font-semibold text-lg">{data.titlethird}</h3>
                </div>
                <div className="flex gap-2 items-center">
                  <MdDone size={24} />{" "}
                  <h3 className="font-semibold text-lg">{data.titlefourth}</h3>
                </div>
                <div className="flex gap-2 items-center">
                  <MdDone size={24} />{" "}
                  <h3 className="font-semibold text-lg">{data.titlefifth}</h3>
                </div>
                {data.titlesixth && (
                  <div className="flex gap-2 items-center">
                    <MdDone size={24} />{" "}
                    <h3 className="font-semibold text-xl">{data.titlesixth}</h3>
                  </div>
                )}
                {data.titleseventh && (
                  <div className="flex gap-2 items-center">
                    <MdDone size={24} />{" "}
                    <h3 className="font-semibold text-xl">
                      {data.titleseventh}
                    </h3>
                  </div>
                )}
                {data.titleeight && (
                  <div className="flex gap-2 items-center">
                    <MdDone size={24} />{" "}
                    <h3 className="font-semibold text-xl">{data.titleeight}</h3>
                  </div>
                )}
                {data.titleninth && (
                  <div className="flex gap-2 items-center">
                    <MdDone size={24} />{" "}
                    <h3 className="font-semibold text-xl">{data.titleninth}</h3>
                  </div>
                )}
              </div>

              <Button
                onClick={() => route.push(`${data.route}`)}
                className="text-center bg-green-4 opacity-65 absolute bottom-2 left-28 flex justify-center text-white font-normal text-xl hover:opacity-90 hover:bg-green-4 hover:text-white"
              >
                {data.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="w[90%] m-auto mt-20">
        <h5 className="text-center text-2xl font-normal">
          Pricing Plan{" "}
          <span className="font-semibold cursor-pointer underline">
            {" "}
            Terms & Conditions
          </span>
        </h5>
      </div>

      <div className="w-[90%] flex m-auto justify-center items-center mt-10">
        <img src="/assets/ellipse.svg" alt="ellipse" />
      </div>

      <div className="mt-20 w-[80%] m-auto ">
        <h1 className="text-4xl font-semibold ml-5">Questions ?</h1>
        <div className="mt-5">
          {accordianData.map((data) => (
            <Accordion
              key={data.id}
              expanded={expanded === data.id}
              onChange={handleChange(data.id)}
            >
              <AccordionSummary
                aria-controls={`${data.id}-content`}
                id={`${data.id}-header`}
              >
                <p className="text-xl font-medium text-black">{data.title}</p>
              </AccordionSummary>
              <AccordionDetails>
                <p className="text-base font-normal ml-6">{data.description}</p>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </main>
  );
};

export default PricingPlanspage;
