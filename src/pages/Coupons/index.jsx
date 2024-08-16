import CouponsTable from "../../components/global/CouponsTable";

const Coupons = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="sticky z-10 ">
        <p className="font-bold text-2xl">Discount Coupons</p>
      </div>

      <div className="flex-grow overflow-y-auto scrollbar-hide custom-scrollbar mt-5">
        <CouponsTable />
      </div>
    </div>
  );
};

export default Coupons;
