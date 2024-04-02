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

const ConferenceDetails = () => {
  return (
    <div className="page-wrapper">
      <div className="bg-secondary w-full h-[200px] rounded-t-3xl"></div>
      <div className="flex flex-col gap-3">
        <p className="text-primary font-medium text-[18px] opacity-60">
          BLOCKCHAIN
        </p>
        <h1 className="text-heading">Conference Title</h1>
        <p className="text-primary font-semibold text-[18px] opacity-60">
          World Trade Center
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-primary font-medium text-[18px] opacity-60">
          <span className="text-primary font-bold text-[18px] opacity-90">
            Location:{" "}
          </span>
          Chennai, India
        </p>
        <p className="text-primary font-medium text-[18px] opacity-60">
          <span className="text-primary font-bold text-[18px] opacity-90">
            Date:{" "}
          </span>
          10, April
        </p>
        <p className="text-primary font-medium text-[18px] opacity-60">
          <span className="text-primary font-bold text-[18px] opacity-90">
            Description:{" "}
          </span>
          The extend of which goes beyond
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
