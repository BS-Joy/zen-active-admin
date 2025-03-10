import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import { Form, Input, Button, Space, message } from "antd";
import { FaAngleLeft } from "react-icons/fa6";
import { CiCamera } from "react-icons/ci";
import { IoCloseCircle } from "react-icons/io5"; // Close icon
import {
  useDeleteWorkoutPlanMutation,
  useEditWorkoutPlanMutation,
  useGetSingleWorkoutPlanQuery,
} from "../../../redux/features/workoutPlans/workoutPlansApi";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import notFoundImage from "../../../assets/images/not-found.png";

const EditWorkoutPlan = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null); // Hidden file input reference
  const [form] = Form.useForm();
  const { workoutPlanId } = useParams();
  const navigate = useNavigate();

  const { data: workoutPlan, refetch } =
    useGetSingleWorkoutPlanQuery(workoutPlanId);
  const [editWorkoutPlan, { isLoading: editLoading }] =
    useEditWorkoutPlanMutation();
  const [deleteWorkoutPlan, { isLoading: deleteLoading }] =
    useDeleteWorkoutPlanMutation();

  // Set the initial preview image when data loads
  useEffect(() => {
    if (workoutPlan?.data?.image) {
      setPreview(workoutPlan.data.image);
    }
  }, [workoutPlan]);

  // Handle Image Selection and Preview Update
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // Show new image preview
    }
  };

  // Trigger file input on button click
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setFile(null);
    setPreview(null);
  };

  const onFinish = async (values) => {
    const formattedData = {
      ...values,
      points: Number(values.points),
    };

    const formData = new FormData();
    if (file) {
      formData.append("image", file);
    }
    formData.append("data", JSON.stringify(formattedData));

    try {
      await editWorkoutPlan({ workoutPlanId, formData }).unwrap();
      message.success("Workout plan edited successfully!");
      form.resetFields();
      setFile(null);
    } catch (error) {
      message.error(error.data?.message || "Failed to edit workout plan.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteWorkoutPlan(workoutPlanId).unwrap();
      message.success("Workout plan deleted successfully!");
      navigate(-1);
    } catch (error) {
      message.error(error.data?.message || "Failed to delete workout plan.");
    }
  };

  useEffect(() => {
    if (workoutPlan?.data) {
      form.setFieldsValue({
        name: workoutPlan.data.name,
        description: workoutPlan.data.description,
        points: workoutPlan.data.points,
      });
    }
  }, [workoutPlan, form]);

  return (
    <>
      <div
        className="flex items-center gap-2 text-xl cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <FaAngleLeft />
        <h1 className="font-semibold">Edit Workout Plan</h1>
      </div>
      <div className="rounded-lg py-4 border-[#79CDFF] border-2 shadow-lg mt-8 bg-white">
        <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
          <h3 className="text-2xl text-[#174C6B] mb-4 border-b border-[#79CDFF]/50 pb-3 pl-16 font-semibold">
            Editing Workout Plan
          </h3>
          <div className="w-full px-16">
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Space
                  size="large"
                  direction="horizontal"
                  className="responsive-space"
                >
                  {/* Name */}
                  <Form.Item
                    label={
                      <span className="text-lg font-semibold text-[#2D2D2D]">
                        Workout Name
                      </span>
                    }
                    name="name"
                    className="responsive-form-item"
                  >
                    <Input
                      type="text"
                      placeholder="Enter Workout Name"
                      className="h-10 border-[#79CDFF] text-base font-semibold text-[#525252]"
                    />
                  </Form.Item>

                  {/* Description */}
                  <Form.Item
                    label={
                      <span className="text-lg font-semibold text-[#2D2D2D]">
                        Workout Description
                      </span>
                    }
                    name="description"
                    className="responsive-form-item"
                  >
                    <Input
                      type="text"
                      placeholder="Enter Workout Description"
                      className="h-10 border-[#79CDFF] text-base font-semibold text-[#525252]"
                    />
                  </Form.Item>

                  {/* Upload Image */}
                  <Form.Item
                    label={
                      <span className="text-lg font-semibold text-[#2D2D2D]">
                        Upload Image
                      </span>
                    }
                    name="image"
                    className="responsive-form-item"
                  >
                    <div className="relative w-[440px]">
                      {preview ? (
                        <div className="relative">
                          <img
                            src={import.meta.env.VITE_BASE_URL + preview}
                            alt="Preview"
                            className="w-full h-40 object-contain border border-[#79CDFF] rounded-md"
                            onError={(e) => (e.target.src = notFoundImage)}
                          />
                          <IoCloseCircle
                            className="absolute top-2 right-2 text-red-600 text-2xl cursor-pointer"
                            onClick={handleRemoveImage}
                          />
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={handleUploadClick}
                          className="w-full h-10 border border-[#79CDFF] flex items-center justify-between px-4 rounded-md cursor-pointer"
                        >
                          <span className="text-base font-semibold text-[#525252]">
                            Select an image
                          </span>
                          <CiCamera size={25} color="#174C6B" />
                        </button>
                      )}
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                    </div>
                  </Form.Item>

                  {/* Points */}
                  <Form.Item
                    label={
                      <span className="text-lg font-semibold text-[#2D2D2D]">
                        Points
                      </span>
                    }
                    name="points"
                    className="responsive-form-item"
                  >
                    <Input
                      type="number"
                      placeholder="Enter Points"
                      className="h-10 border-[#79CDFF] text-base font-semibold text-[#525252]"
                    />
                  </Form.Item>
                </Space>
              </Space>

              {/* Submit & Delete Buttons */}
              <Form.Item>
                <div className="p-4 mt-10 text-center mx-auto flex items-center justify-center gap-10">
                  <button
                    type="button"
                    className="w-[500px] border border-[#1E648C]/60 bg-[#EBF8FF] text-white px-10 h-[45px] flex items-center justify-center gap-3 text-lg outline-none rounded-md"
                    onClick={handleDelete}
                  >
                    <span className="text-[#1E648C] font-semibold">
                      {deleteLoading ? (
                        <LoadingSpinner color="#436F88" />
                      ) : (
                        "Delete"
                      )}
                    </span>
                  </button>
                  <button
                    type="submit"
                    className="w-[500px] bg-[#174C6B] text-white px-10 h-[45px] flex items-center justify-center gap-3 text-lg outline-none rounded-md"
                  >
                    <span className="text-white font-semibold">
                      {editLoading ? (
                        <LoadingSpinner color="white" />
                      ) : (
                        "Update"
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

export default EditWorkoutPlan;
