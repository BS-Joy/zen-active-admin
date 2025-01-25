import React, { useState } from "react";
import { Button, DatePicker, Input, Table } from "antd";
import { FiAlertCircle } from "react-icons/fi";
import DashboardModal from "../../../Components/DashboardModal";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import exlamIcon from "../../../assets/images/exclamation-circle.png";

const Earnings = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const showModal = (data) => {
    setIsModalOpen(true);
    setModalData(data);
  };

  const columns = [
    {
      title: "#SL",
      dataIndex: "transIs",
      key: "transIs",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
    },
    {
      title: "Phone Number",
      key: "Phone",
      dataIndex: "Phone",
    },
    {
      title: "Action",
      key: "Review",
      aligen: 'center',
      render: (_, data) => (
        <div className="  items-center justify-around textcenter flex " >
          {/* Review Icon */}
          <img src={exlamIcon} alt="" className="btn  px-3 py-1 text-sm rounded-full cursor-pointer" onClick={() => showModal(data)} />
          {/* <Link to={'/reviews'} className="btn bg-black text-white px-3 py-1 text-sm rounded-full">
                 
                  View
                </Link> */}
        </div>
      ),
    },
  ];

  const data = [];
  for (let index = 0; index < 20; index++) {
    data.push({
      transIs: `${index + 1}`,
      name: "Henry",
      Email: "sharif@gmail.com",
      Phone: "+12746478994",
      Review: "See Review",
      date: "16 Apr 2024",
      _id: index,
    });
  }
  return (
    <div>
      {/* Stats */}
      <div className="flex items-center gap-10">
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
      <div className="rounded-lg border py-4 border-black mt-8 recent-users-table">
        <div className="flex justify-between px-2">
          <h3 className="text-2xl text-black mb-4 pl-2">Earnings</h3>
          <div className="flex items-center gap-4 mb-6">
            <DatePicker placeholder="Date" className="w-48 border-[#345C8C]" />
            <Input placeholder="Name" className="w-48 placeholder:text-[#345C8C]" />
            <Input placeholder="Subscription Name" className="w-48 placeholder:text-[#345C8C]" />
            {/* <Button style={{ border: 'none', backgroundColor: '#EBF8FF', color: '#174C6B', borderRadius: '8px' }}>
              <IoSearch />
            </Button> */}
            <button style={{ border: 'none', backgroundColor: '#85cff7', color: '#174C6B', borderRadius: '50%', padding: '6px' }}><IoSearch size={20} /></button>
          </div>
        </div>


        {/* Ant Design Table */}
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ position: ["bottomCenter"] }}
          className="rounded-lg"
        />

        {/* Dashboard Modal */}
        <DashboardModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          maxWidth="900px"
          backgroundColor="bg-[#EDEAF3]"
        >
          <div className="">
            <h2 className="text-lg text-center mb-4">Transaction Details</h2>
            <div className="flex justify-between mb-6 text-gray-600 border-b border-[#79CDFF] pb-1">
              <p>Transaction ID :</p>
              <p>{modalData.transIs}</p>
            </div>
            <div className="flex justify-between mb-6 text-gray-600  border-b border-[#79CDFF] pb-1">
              <p>Date :</p>
              <p>{modalData.name}</p>
            </div>
            <div className="flex justify-between mb-6 text-gray-600  border-b border-[#79CDFF] pb-1">
              <p>User Name :</p>
              <p>{modalData.Email}</p>
            </div>
            <div className="flex justify-between mb-6 text-gray-600  border-b border-[#79CDFF] pb-1">
              <p>Mobile Phone :</p>
              <p>{modalData.Phone}</p>
            </div>
            <div className="flex justify-between mb-6 text-gray-600  border-b border-[#79CDFF] pb-1">
              <p>A/C number :</p>
              <p>{modalData.transIs}</p>
            </div>
            <div className="flex justify-between mb-6 text-gray-600  border-b border-[#79CDFF] pb-1">
              <p>A/C holder name :</p>
              <p>{modalData.transIs}</p>
            </div>
            <div className="flex justify-between mb-6 text-gray-600  border-b border-[#79CDFF] pb-1">
              <p>Transaction amount</p>
              <p>{modalData.transIs}</p>
            </div>
            <div className="flex justify-between mb-6 text-gray-600  border-b border-[#79CDFF] pb-1">
              <p>Service</p>
              <p>{modalData.transIs}</p>
            </div>

            <div className="p-4 mt-auto text-center mx-auto flex items-center justify-center">
              <button
                className="w-[300px] bg-[#174C6B] text-white px-10 h-[50px] flex items-center justify-center gap-3 text-lg outline-none rounded-xl"
              >
                <span className="text-white font-light">Download</span>
              </button>
            </div>
          </div>
        </DashboardModal>
      </div>
    </div>
  )
}

export default Earnings
