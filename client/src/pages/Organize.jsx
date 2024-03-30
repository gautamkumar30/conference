const Temp = () => {
  return (
    <div className="flex flex-col gap-4">
      <label className="text-primary text-[18px]">Title</label>
      <input
        type="text"
        className="h-[40px] border-primary border-[1px] rounded-lg px-4 py-6 focus:border-none focus:border-primary bg-transparent"
        placeholder="Eg. The Art of Research and Development"
      />
    </div>
  );
};

const Organize = () => {
  return (
    <div className="page-wrapper">
      <h1 className="text-heading">Organize a Conference</h1>
      <form>
        <div className="grid grid-row-3 grid-cols-2 gap-x-16 gap-y-10">
          <Temp />
          <Temp />
          <Temp />
          <Temp />
          <Temp />
          <Temp />
        </div>
      </form>
    </div>
  );
};

export default Organize;
