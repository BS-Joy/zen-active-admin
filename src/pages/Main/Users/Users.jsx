import React, { useState } from "react";
import { Button, DatePicker, Input, Table } from "antd";
import { FiAlertCircle } from "react-icons/fi";
import DashboardModal from "../../../Components/DashboardModal";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import exlamIcon from "../../../assets/images/exclamation-circle.png";

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const showModal = (data) => {
    setIsModalOpen(true);
    setModalData(data);
  };

  const columns = [
    {
      title: "#Tr.ID",
      dataIndex: "transIs",
      key: "transIs",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Subscription",
      dataIndex: "subscription",
      key: "subscription",
    },
    {
      title: "Amount",
      key: "amount",
      dataIndex: "amount",
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
    },
    {
      title: "Action",
      key: "Review",
      aligen: 'center',
      render: (_, data) => (
        <div className="  items-center justify-around textcenter flex">
          {/* Review Icon */}
          <img src={exlamIcon} alt="" className="btn  px-3 py-1 text-sm rounded-full  cursor-pointer" onClick={() => showModal(data)} />
          {/* <Link to={'/reviews'} className="btn bg-black text-white px-3 py-1 text-sm rounded-full">
             
              View
            </Link> */}
        </div>
      ),
    },
  ];

  const data = [];
  for (let index = 0; index < 6; index++) {
    data.push({
      transIs: `${index + 1}`,
      name: "Henry",
      subscription: "Standard",
      amount: "9.99",
      Review: "See Review",
      date: "16 Apr 2024",
      _id: index,
    });
  }

  return (
    <div className="rounded-lg border-2 py-4 border-[#345C8C]/80 mt-8 recent-users-table">
      <div className="flex justify-between px-2">
        <h3 className="text-2xl text-black mb-4 pl-2">Users List</h3>
        <div className="flex items-center gap-4 mb-6">
          <DatePicker placeholder="Date" className="w-48 border-2 border-[#345C8C]" />
          <Input placeholder="Subscription" className="w-48 border-2 border-[#345C8C] placeholder:text-[#345C8C]" style={{ border: '2px solid #345C8C' }} />
          <Input placeholder="User Name" className="w-48 placeholder:text-[#345C8C]" style={{ border: '2px solid #345C8C' }} />
          {/* <Button style={{ border: 'none', backgroundColor: '#EBF8FF', color: '#174C6B', borderRadius: '8px' }}>
                   <IoSearch />
                 </Button> */}
          <button style={{ border: 'none', backgroundColor: '#caf0f8', color: '#174C6B', borderRadius: '50%', padding: '7px' }}><IoSearch size={20} /></button>
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
        maxWidth="500px"
      >
        <div>
          <h2 className="text-lg text-center mb-4">User Details</h2>
          {/* <div className="flex justify-between mb-2 text-gray-600  border-b border-[#79CDFF] pb-1">
            <p>#SL</p>
            <p>{modalData.transIs}</p>
          </div> */}
          <div className="flex justify-between mb-2 text-gray-600  border-b border-[#79CDFF] pb-1">
            <p>User Name</p>
            <p>{modalData.name}</p>
          </div>
          <div className="flex justify-between mb-2 text-gray-600  border-b border-[#79CDFF] pb-1">
            <p>Email</p>
            <p>{modalData.Email}</p>
          </div>
          <div className="flex justify-between mb-2 text-gray-600  border-b border-[#79CDFF] pb-1">
            <p>Mobile Phone</p>
            <p>{modalData.Phone}</p>
          </div>

          <div className="flex justify-between mb-2 text-gray-600  border-b border-[#79CDFF] pb-1">
            <p>Date</p>
            <p>{modalData.transIs}</p>
          </div>


          <div className="p-4 mt-auto text-center mx-auto flex items-center justify-center">
            <button
              className="w-[300px] bg-[#174C6B] text-white px-10 h-[50px] flex items-center justify-center gap-3 text-lg outline-none rounded-xl"
            >
              <span className="text-white font-light">Okay</span>
            </button>
          </div>
        </div>
      </DashboardModal>
    </div>
  );
};

export default Users;
