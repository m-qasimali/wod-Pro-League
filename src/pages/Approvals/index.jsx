import ApprovalsTable from "./components/ApprovalsTable";

const Approvals = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="sticky z-10 ">
        <p className="font-bold text-2xl">Approvals</p>
      </div>

      <div className="flex-grow overflow-y-auto scrollbar-hide custom-scrollbar z-0 mt-5">
        <ApprovalsTable />
      </div>
    </div>
  );
};

export default Approvals;
