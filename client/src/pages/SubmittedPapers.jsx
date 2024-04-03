const PaperCard = () => {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row gap-7 justify-center items-center">
        <div className="w-[70px] h-[70px] bg-secondary rounded-xl"></div>
        <div>
          <p className="text-primary font-semibold text-[18px] tracking-tight">
            Paper on Green Energy Sustainability
          </p>
          <p className="text-primary font-medium text-[18px] mt-1 tracking-tight opacity-80">
            John Mishra
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-0 items-end justify-center">
        <p className="text-[25px] font-semibold text-primary leading-0">4.5</p>
        <button className="text-secondary text-[16px] font-semibold">
          RATE NOW
        </button>
      </div>
    </div>
  );
};

const SubmittedPapers = () => {
  return (
    <div className="page-wrapper">
      <div className="flex flex-col gap-10">
        <h1 className="text-heading">Submitted Papers</h1>
        <PaperCard />
        <PaperCard />
        <PaperCard />
        <PaperCard />
        <PaperCard />
      </div>
    </div>
  );
};

export default SubmittedPapers;
