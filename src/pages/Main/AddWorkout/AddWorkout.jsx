import { useNavigate } from "react-router-dom";
import React, { useRef, useState } from "react";
import { Form, Input, Select, Space } from "antd";
const { Option } = Select;
import { FaAngleLeft } from "react-icons/fa6";
import { message, Upload } from "antd";
import { CiCamera } from "react-icons/ci";
import {
  useCreateWorkoutMutation,
  useGetAllWorkoutQuery,
} from "../../../redux/features/workout/workoutApi";
import { IoCloseCircle } from "react-icons/io5";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const AddWorkout = () => {
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { data: workouts } = useGetAllWorkoutQuery(null);
  const [createWorkout, { isLoading: createLoading }] =
    useCreateWorkoutMutation();

  // Handle Image Upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
    } else {
      alert("You can only upload image files!");
    }
  };

  // Trigger file input on button click
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // Logic for multi select input
  const options =
    workouts?.data?.reduce((acc, workout) => {
      workout.exercises.forEach((exercise) => {
        if (!acc.some((item) => item.value === exercise._id)) {
          acc.push({ value: exercise._id, label: exercise.name });
        }
      });
      return acc;
    }, []) || [];

  const handleMultiSelectChange = (value) => {
    console.log(`Selected: ${value}`);
  };

  const onFinish = async (values) => {
    const formattedData = {
      ...values,
      points: Number(values.points),
    };

    // Create FormData
    const formData = new FormData();
    if (imageFile) {
      formData.append("image", imageFile);
    }
    formData.append("data", JSON.stringify(formattedData)); // Convert text fields to JSON

    try {
      const response = await createWorkout(formData).unwrap();
      console.log(response, "response from create workout");
      if (response.success) {
        message.success("Workout created successfully!");
        form.resetFields(); // Reset form
        setImageFile(null);
        navigate(-1);
      }
    } catch (error) {
      message.error(error.data?.message || "Failed to create workout.");
    }
  };

  return (
    <>
      <div
        className="flex items-center gap-2 text-xl cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <FaAngleLeft />
        <h1 className="font-semibold">Add Workout</h1>
      </div>
      <div className="rounded-lg py-4 border-[#79CDFF] border-2 shadow-lg mt-8 bg-white">
        <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
          <h3 className="text-2xl text-[#174C6B] mb-4 border-b border-[#79CDFF]/50 pb-3 pl-16 font-semibold">
            Adding Workout
          </h3>
          <div className="w-full px-16">
            <Form form={form} layout="vertical" onFinish={onFinish}>
              {/* Section 1 */}
              <Space direction="vertical" style={{ width: "100%" }}>
                <Space
                  size="large"
                  direction="horizontal"
                  className="responsive-space"
                >
                  {/* Name */}
                  <Form.Item
                    label="Workout Name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the workout name!",
                      },
                    ]}
                  >
                    <Input
                      type="text"
                      placeholder="Enter Workout Name"
                      style={{
                        height: "40px",
                        border: "1px solid #79CDFF",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#525252",
                      }}
                    />
                  </Form.Item>

                  {/* Description */}
                  <Form.Item
                    label="Workout Description"
                    name="description"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the workout description!",
                      },
                    ]}
                  >
                    <Input
                      type="text"
                      placeholder="Enter Workout Description"
                      style={{
                        height: "40px",
                        border: "1px solid #79CDFF",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#525252",
                      }}
                    />
                  </Form.Item>

                  {/* Image */}
                  <Form.Item
                    label="Upload Image"
                    name="image"
                    rules={[
                      { required: true, message: "Please upload an image!" },
                    ]}
                  >
                    <div className="relative w-[482px] border border-[#79CDFF] flex justify-between items-center px-2 py-3 rounded-md">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        style={{ display: "none" }}
                        id="imageUpload"
                      />
                      <label
                        htmlFor="imageUpload"
                        className="cursor-pointer w-full flex justify-between items-center"
                      >
                        <span className="text-[#525252] font-semibold">
                          {imageFile ? imageFile.name : "Select an image"}
                        </span>
                        <CiCamera size={25} color="#174C6B" />
                      </label>
                    </div>
                  </Form.Item>

                  {/* Points */}
                  <Form.Item
                    label="Points"
                    name="points"
                    rules={[
                      { required: true, message: "Please enter points!" },
                    ]}
                  >
                    <Input
                      type="number"
                      placeholder="Enter Points"
                      style={{
                        height: "40px",
                        border: "1px solid #79CDFF",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#525252",
                      }}
                    />
                  </Form.Item>

                  {/* Exercises */}
                  <Form.Item
                    label="Select Exercise"
                    name="exercises"
                    rules={[
                      {
                        required: true,
                        message: "Please select at least one exercise!",
                      },
                    ]}
                  >
                    <Select
                      mode="multiple"
                      size={"middle"}
                      placeholder="Select Exercise"
                      style={{
                        width: "100%",
                        height: "40px",
                      }}
                      options={options}
                    />
                  </Form.Item>
                </Space>
              </Space>

              {/* Submit Button */}
              <Form.Item>
                <div className="p-4 mt-10 text-center mx-auto flex items-center justify-center">
                  <button className="w-[500px] bg-[#174C6B] text-white px-10 h-[45px] flex items-center justify-center gap-3 text-lg outline-none rounded-md ">
                    <span className="text-white font-semibold">
                      {createLoading ? (
                        <LoadingSpinner color="white" />
                      ) : (
                        "Create"
                      )}
                    </span>
                  </button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddWorkout;
