// eslint-disable-next-line react/prop-types
const InvitationCard = ({ role }) => {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row gap-7">
        <div className="w-[40px] h-[40px] bg-secondary rounded-full"></div>
        <div>
          <p className="text-primary font-bold text-[25px]">Join as {role}</p>
          <p className="text-primary font-medium text-[18px] mt-1">
            Green Energy Sustainability
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-4 items-end">
        <button className="button-cta font-semibold">Accept</button>
        <button className="px-14 py-3 rounded-lg bg-[#f66] text-white font-medium">
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
