const HomeCard = ({ data }) => {
  return (
    <div className="w-[250px] h-full">
      <div className="h-1/2" style={{ backgroundImage: `url(${data.img})`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
      <h1 className="text-xl font-semibold mt-2">{data.title}</h1>
      <p className="text-sm font-medium mt-1">{data.description}</p>
    </div>
  )
}

export default HomeCard