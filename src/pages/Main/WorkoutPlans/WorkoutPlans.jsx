import React, { useState } from "react";
import { Input, Table } from "antd";
import DashboardModal from "../../../Components/DashboardModal";
import { IoClose, IoSearch } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import exlamIcon from "../../../assets/images/exclamation-circle.png";
import { FaPlus } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { useGetWorkoutPlansQuery } from "../../../redux/features/workoutPlans/workoutPlansApi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const WorkoutPlans = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [searchTerm, setSearchTerm] = useState(""); // State to store search input
  const [query, setQuery] = useState(""); // State to trigger search
  const navigate = useNavigate();
  const { data: workoutPlans, isLoading } = useGetWorkoutPlansQuery(query);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Trigger search when button is clicked
  const handleSearch = () => {
    setQuery(searchTerm);
  };

  const showModal = (data) => {
    setIsModalOpen(true);
    setModalData(data);
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <div className="flex items-center justify-center">
          <img
            src={
              image
                ? `${import.meta.env.VITE_BASE_URL}${image}`
                : "https://via.placeholder.com/40"
            }
            alt="badge"
            className="size-12 rounded-md object-fill"
          />
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Descripition",
      dataIndex: "description",
      key: "description",
      render: (description) => <h1>{description.slice(0, 30) + "..."}</h1>,
    },
    {
      title: "Points",
      key: "points",
      dataIndex: "points",
    },
    {
      title: "Workouts",
      key: "workouts",
      dataIndex: "workouts",
      render: (workouts) =>
        workouts
          ?.slice(1, 3)
          ?.map((workout) => workout.name)
          .join(", ") + "..." || "N/A",
    },
    {
      title: "Duration",
      key: "duration",
      dataIndex: "duration",
      render: (duration) => <h1>{duration} days</h1>,
    },
    {
      title: "Action",
      key: "Review",
      aligen: "center",
      render: (_, data) => (
        <div className="  items-center justify-around textcenter flex">
          {/* Review Icon */}
          <img
            src={exlamIcon}
            alt=""
            className="btn  px-3 py-1 text-sm rounded-full  cursor-pointer"
            onClick={() => showModal(data)}
          />
          <Link to={`/edit-workout-plan/${data._id}`} className="">
            <MdEdit />
          </Link>
        </div>
      ),
    },
  ];

  const data =
    workoutPlans?.data?.map((workoutPlan, index) => ({
      key: index,
      image: workoutPlan.image,
      name: workoutPlan.name,
      description: workoutPlan.description,
      points: workoutPlan.points,
      workouts: workoutPlan.workouts,
      duration: workoutPlan.duration,
      ...workoutPlan,
    })) || [];

  return (
    <div>
      <button
        className="px-6 py-2 min-w-[100px] text-center text-white bg-[#174C6B] border border-[#174C6B] rounded-md active:text-[#174C6B] hover:bg-transparent hover:text-[#174C6B] focus:outline-none focus:ring float-end flex items-center gap-2"
        onClick={() => navigate("/add-workout-plan")}
      >
        <FaPlus />
        Add Workout Plan
      </button>
      <div className="py-10">
        <div className="rounded-lg border-2 py-4 border-[#37B5FF]/80 mt-8 recent-users-table">
          <div className="flex justify-between px-2">
            <h3 className="text-2xl text-black mb-4 pl-2">Workout Plans</h3>
            <div className="flex items-center gap-4 mb-6">
              <Input
                placeholder="Search plans by name"
                className="w-48 placeholder:text-[#174C6B]"
                style={{ border: "1px solid #79CDFF" }}
                value={searchTerm || ""}
                onChange={handleSearchChange}
              />
              <button
                style={{
                  border: "none",
                  backgroundColor: "#caf0f8",
                  color: "#174C6B",
                  borderRadius: "50%",
                  padding: "7px",
                }}
                onClick={handleSearch}
              >
                <IoSearch size={20} />
              </button>
              {searchTerm && (
                <button
                  style={{
                    border: "none",
                    backgroundColor: "#caf0f8",
                    color: "#174C6B",
                    borderRadius: "50%",
                    padding: "7px",
                  }}
                  onClick={() => {
                    setSearchTerm(null);
                    setQuery(null);
                  }}
                >
                  <IoClose size={20} />
                </button>
              )}
            </div>
          </div>
          {/* Ant Design Table */}
          <Table
            columns={columns}
            dataSource={data}
            loading={isLoading}
            pagination={{
              position: ["bottomCenter"],
              itemRender: (current, type, originalElement) => {
                if (type === "prev") {
                  return (
                    <button className="custom-pagination flex items-center gap-2 border border-[#79CDFF] rounded-md px-2 text-darkBlue">
                      <IoIosArrowBack className="" />
                      Back
                    </button>
                  );
                }
                if (type === "next") {
                  return (
                    <button className="custom-pagination flex items-center gap-2 border border-darkBlue bg-darkBlue rounded-md px-2 text-white">
                      Next
                      <IoIosArrowForward />
                    </button>
                  );
                }
                return originalElement;
              },
            }}
            className="rounded-lg"
          />

          {/* Dashboard Modal */}
          <DashboardModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            maxWidth="700px"
          >
            <div>
              <h2 className="text-lg text-center mb-4">Workouts Details</h2>

              {/* Ant Design Table for Exercises */}
              <Table
                columns={[
                  {
                    title: "Workout Name",
                    dataIndex: "name",
                    key: "name",
                  },
                  {
                    title: "Description",
                    dataIndex: "description",
                    key: "description",
                  },
                  {
                    title: "Exercises",
                    dataIndex: "exercises",
                    key: "exercises",
                    render: (exercises) =>
                      exercises?.map((exercise) => exercise.name).join(", ") ||
                      "N/A",
                  },
                ]}
                dataSource={modalData?.workouts?.map((workout, index) => ({
                  key: index,
                  name: workout.name,
                  description: workout.description,
                  sets: workout.sets,
                  exercises: workout.exercises,
                }))}
                pagination={false} // Disable pagination since it's a small modal
                bordered
                className="rounded-lg"
              />

              {/* Close Button */}
              <div className="p-4 mt-auto text-center mx-auto flex items-center justify-center">
                <button
                  className="w-[300px] bg-[#174C6B] text-white px-10 h-[50px] flex items-center justify-center gap-3 text-lg outline-none rounded-xl"
                  onClick={() => setIsModalOpen(false)}
                >
                  <span className="text-white font-light">Okay</span>
                </button>
              </div>
            </div>
          </DashboardModal>
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlans;
