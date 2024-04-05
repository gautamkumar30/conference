import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ConferenceCard = ({ id, theme, title, organizer, venue, date }) => {
  return (
    <Link to={"/conference/" + id}>
      <div className="w-full bg-white flex flex-row rounded-[40px] overflow-hidden">
        <div className="w-1/3 bg-secondary"></div>
        <div className="w-2/3 flex flex-col px-10 py-10">
          <p className="text-primary font-medium text-[14px] opacity-60">
            {theme ? theme : "BLOCKCHAIN"}
          </p>
          <h3 className="text-subheading mb-8">
            {title ? title : "Conference Title"}
          </h3>
          <div className="flex flex-col gap-4">
            {[organizer, venue, date].map((detail) => (
              <div className="flex flex-row gap-3 items-center" key={detail}>
                <div className="w-[10px] h-[10px] bg-secondary opacity-70 rounded-full"></div>
                <p className="text-primary opacity-90 ">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ConferenceCard;
