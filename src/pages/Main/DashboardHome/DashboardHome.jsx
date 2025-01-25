import DashboardHomeTable from "../../../Components/DashboardHomeTable";
import BarChartComponent from "./BarChart";
import TransactionAreaChart from "./TransactionAreaChart";


const DashboardHome = () => {

  return (
    <div className="space-y-[24px]">
      <div className="flex items-center gap-10">
        {/* grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 lg:gap-x-32  gap-y-10  */}

        {/* Transaction Area Chart */}
        <TransactionAreaChart />
        {/* <div className=" flex items-center justify-center gap-6 border border-black px-[24px] py-[20px] rounded-lg space-y-3 bg-white w-80">

          <div className="text-center">
            <h3 className="text-[20px]">{"Total Earnings"}</h3>
            <h3 className="text-[30px] font-extralight">
              {`$8920 `}
            </h3>
          </div>
        </div> */}

        <div className="flex items-center gap-6 px-[24px] bg-[#345C8C] border border-black  py-[20px] rounded-lg space-y-3  w-80">
          <div className="">
            <h3 className="text-[20px] text-white">{"Total Earnings"}</h3>
            <h3 className="text-[30px] text-white font-extralight">$254.99</h3>
          </div>
        </div>

        <div className="flex items-center gap-6 border border-[#345C8C] px-[24px] py-[20px] rounded-lg space-y-3 bg-white w-80 text-[#345C8C]">
          <div className="">
            <h3 className="text-[20px]">{"Total Users"}</h3>
            <h3 className="text-[30px] font-extralight">6500</h3>
          </div>
        </div>


      </div>
      {/* <BarChartComponent/> */}
      <DashboardHomeTable />
    </div>
  );
};

export default DashboardHome;
