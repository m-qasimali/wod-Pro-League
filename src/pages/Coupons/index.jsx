import DiscountCouponsTable from "./components/DiscountCouponsTable";
import FreeCouponsTable from "./components/FreeCouponsTable";

const Coupons = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-5 w-full">
      <div className="flex flex-col w-full">
        <div className="sticky z-10 ">
          <p className="font-bold text-2xl">Discount Coupons</p>
        </div>

        <div className="flex-grow overflow-y-auto scrollbar-hide custom-scrollbar mt-5">
          <DiscountCouponsTable />
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="sticky z-10 ">
          <p className="font-bold text-2xl">Free Coupons</p>
        </div>

        <div className="flex-grow overflow-y-auto scrollbar-hide custom-scrollbar mt-5">
          <FreeCouponsTable />
        </div>
      </div>
    </div>
  );
};

export default Coupons;
