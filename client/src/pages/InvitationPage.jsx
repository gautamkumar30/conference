// eslint-disable-next-line react/prop-types
const InvitationCard = ({ role }) => {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row gap-7 justify-center items-center">
        <div className="w-[20px] h-[20px] bg-secondary rounded-full"></div>
        <div>
          <p className="text-primary font-bold text-[18px] tracking-tight" >Invitation to join as <span>{role}</span></p>
          <p className="text-primary font-medium text-[18px] mt-1 tracking-tight opacity-80">
            Green Energy Sustainability
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-4 items-end">
        <button className="px-10 py-3 rounded-lg bg-primary text-white font-medium">Accept</button>
        <button className="px-10 py-3 rounded-lg bg-[#E12B38] bg-opacity-80 text-white font-medium">
          Reject
        </button>
      </div>
    </div>
  );
};

const Invitation = () => {
  return (
    <div className="page-wrapper">
      <div className="flex flex-col gap-10">
        <h1 className="text-heading">Invitations</h1>
        <InvitationCard role={"Chairperson"} />
        <InvitationCard role={"Speaker"} />
        <InvitationCard role={"Chairperson"} />
        <InvitationCard role={"Speaker"} />
        <InvitationCard role={"Chairperson"} />
      </div>
    </div>
  );
};

export default Invitation;
