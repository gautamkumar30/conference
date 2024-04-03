import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const PaperCard = () => {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row gap-7">
        <div className="w-[70px] h-[70px] bg-secondary rounded-xl"></div>
        <div>
          <p className="text-primary font-semibold text-[20px]">
            Paper on Green Energy Sustainability{" "}
          </p>
          <p className="text-primary font-medium text-[18px] mt-1">
            John Mishra
          </p>
        </div>
      </div>
      <div>
        <p className="text-[30px] font-semibold text-primary">4.5</p>
      </div>
    </div>
  );
};

const templateData = {
  id: "Couldn't fetch id",
  title: "Couldn't fetch title",
  organizer: "Couldn't fetch title",
  theme: "Couldn't fetch title",
  date: "Couldn't fetch title",
  venue: "Couldn't fetch title",
  description: "Couldn't fetch description",
};

const ConferenceDetails = () => {
  const { id } = useParams();
  // console.log(id);

  const [conferenceDoc, setConferenceDoc] = useState(templateData);

  useEffect(() => {
    fetch("http://localhost:4000/conference/" + id).then((res) => {
      res.json().then((res) => {
        // console.log(res);
        setConferenceDoc(res);
      });
    });
  }, []);

  return (
    <div className="page-wrapper">
      <div className="bg-secondary w-full h-[200px] rounded-t-3xl"></div>
      <div className="flex flex-col gap-3">
        <p className="text-primary font-medium text-[18px] opacity-60">
          {conferenceDoc.theme || templateData.theme}
        </p>
        <h1 className="text-heading">
          {conferenceDoc.title || templateData.title}
        </h1>
        <p className="text-primary font-semibold text-[18px] opacity-60">
          {conferenceDoc.organizer?.username || templateData.organizer}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-primary font-medium text-[18px] opacity-60">
          <span className="text-primary font-bold text-[18px] opacity-90">
            Location:{" "}
          </span>
          {conferenceDoc.venue || templateData.venue}
        </p>
        <p className="text-primary font-medium text-[18px] opacity-60">
          <span className="text-primary font-bold text-[18px] opacity-90">
            Date:{" "}
          </span>
          {conferenceDoc.date || templateData.date}
        </p>
        <p className="text-primary font-medium text-[18px] opacity-60">
          <span className="text-primary font-bold text-[18px] opacity-90">
            Description:{" "}
          </span>
          {conferenceDoc.description || templateData.description}
        </p>
        <p className="text-primary font-medium text-[18px] opacity-60">
          <span className="text-primary font-bold text-[18px] opacity-90">
            Chairperson:{" "}
          </span>
          Harish Chopra, Neeraj Shah
        </p>
      </div>
      {/* Wrapper for top papers */}
      <div className="flex flex-col gap-10">
        <h1 className="text-subheading">Top Papers</h1>
        <div className="flex flex-col gap-10 justify-center">
          <PaperCard />
          <PaperCard />
          <PaperCard />
        </div>
        <button className="button-cta max-w-[250px]">Submit Paper</button>
      </div>
    </div>
  );
};

export default ConferenceDetails;
