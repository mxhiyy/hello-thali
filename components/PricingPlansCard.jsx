

const PricingPlansCard = ({ data }) => {
  const color = data.cardcolor;

  return (
    <div className="w-[300px] h-[390px] border-2 border-gray-3 rounded-md">
        <div style={{ backgroundColor: color, borderTopLeftRadius: '5px', borderTopRightRadius: '5px', color: `${data.headingColor}`}} className={`text-center w-full h-[40px] border-b-2 border-zinc-300 flex justify-center items-center`}><h2 className="text-xl font-semibold">{data.heading}</h2></div>
        <div style={{ backgroundColor: `${data.priceColor}`}} className="w-full border-b-2 border-gray-3">
            <div className="flex justify-center items-center gap-2 p-1">
               <h1 className="font-semibold text-3xl">INR</h1>
               <h1 className="font-semibold text-4xl mt-5">{data.price}</h1>
            </div>
            <div className="text-center text-base">{data.plans} <p className="text-sm font-medium mb-2">{data.perThali}</p></div>
        </div>

        <div>
        <p className="w-full border-b-2 border-gray-3 text-sm font-medium text-center p-2">{data.titleone}</p>
        <p className="w-full border-b-2 border-gray-3 text-sm font-medium text-center p-2">{data.titletwo}</p>
        <p className="w-full border-b-2 border-gray-3 text-sm font-medium text-center p-2">{data.titlethird}</p>
        <p className="w-full border-b-2 border-gray-3 text-sm font-medium text-center p-2">{data.titlefourth}</p>
        </div>
        <div className="flex justify-center items-center w-full h-[4.7rem]" style={{backgroundColor: color, borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px'}}><button className="bg-green-1 p-2 text-white font-light text-base rounded-sm">{data.buttonText}</button></div>
    </div>
  )
}

export default PricingPlansCard;