const details = ["World Trade Center", "Chennai, India", "10 April"];

const ConferenceCard = () => {
  return (
    <div className="w-full bg-white flex flex-row rounded-[40px] overflow-hidden">
      <div className="w-1/3 bg-secondary"></div>
      <div className="w-2/3 flex flex-col px-10 py-10">
        <p className="text-primary font-medium text-[14px] opacity-60">
          BLOCKCHAIN
        </p>
        <h3 className="text-subheading mb-8">Conference Title</h3>
        <div className="flex flex-col gap-2">
          {details.map((detail) => (
            <div className="flex flex-row gap-3 items-center" key={detail}>
              <div className="w-[15px] h-[15px] bg-secondary opacity-70 rounded-full"></div>
              <p className="text-primary opacity-90 ">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConferenceCard;
