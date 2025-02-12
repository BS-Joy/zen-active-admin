import React, { useState } from "react";
import { Button, Form, Input, Upload } from "antd";
import dashProfile from "../../assets/images/dashboard-profile.png";
// import "react-phone-number-input/style.css";
// import PhoneInput from "react-phone-number-input";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import PhoneCountryInput from "../../Components/PhoneCountryInput";
import PageHeading from "../../Components/PageHeading";
import { PiCameraPlus } from "react-icons/pi";
import { FaAngleLeft } from "react-icons/fa6";
import { useEditProfileMutation, useGetMeQuery } from "../../redux/features/auth/authApi";
import { IoCameraOutline } from "react-icons/io5";

const EditMyProfile = () => {
  const [code, setCode] = useState();
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const { data: me, isLoading, error } = useGetMeQuery()
  const [editProfile] = useEditProfileMutation()

  // Handle file selection
  const handleFileChange = ({ file }) => {
    setFile(file.originFileObj); // Save selected file
  };

  const handleBackButtonClick = () => {
    navigate(-1); // This takes the user back to the previous page
  };
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const profileData = {
    name: me?.data?.name || '',
    email: me?.data?.email || '',
    phone: me?.data?.phone || '',
    profile: dashProfile,
  };

  const props = {
    name: 'file',
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <>
      <div className="flex items-center gap-2 text-xl cursor-pointer" onClick={handleBackButtonClick}>
        <FaAngleLeft />
        <h1>Personal information Edit</h1>
      </div>
      <div className="rounded-lg py-4 border-[#174C6B]/40 border-2 shadow-lg mt-8 bg-white">
        <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
          <h3 className="text-2xl text-[#174C6B] mb-4 pl-5 border-b-2 border-[#174C6B]/40 pb-3">
            Personal information Edit
          </h3>
          <div className="w-full">
            <Form
              name="basic"
              layout="vertical"
              className="w-full grid grid-cols-12 gap-x-10 px-14 py-8"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              initialValues={{
                name: profileData.name,
                email: profileData.email,
              }}
            >
              <div className="col-span-3 space-y-6 ">
                <div className="min-h-[300px] flex flex-col items-center justify-center p-8 border border-black bg-lightGray/15">
                  <Form.Item
                    name='image'
                    className="my-2 relative">
                    <img
                      src={dashProfile}
                      alt=""
                      className="h-28 w-28 rounded-full border-4 border-black"
                    />
                    <Upload {...props}
                      onChange={handleFileChange}
                      maxCount={1}
                    >

                      <div className="absolute bottom-2 right-9 bg-[#174C6B] p-2 rounded-full cursor-pointer">
                        <IoCameraOutline size={23} color="white" />
                      </div>
                    </Upload>

                  </Form.Item>
                  <h5 className="text-lg text-[#222222]">{"Profile"}</h5>
                  <h4 className="text-2xl text-[#222222]">{"Admin"}</h4>
                </div>
              </div>
              <div className="col-span-9 space-y-[14px] w-full">
                <Form.Item
                  className="text-lg  font-medium text-black -mb-1"
                  label="Name"
                  name="name"
                  rules={[{ required: true, message: "Please enter your name!" }]}
                >
                  <Input
                    size="large"
                    className="h-[53px] rounded-lg"
                  />
                </Form.Item>
                <Form.Item
                  className="text-lg  font-medium text-black"
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email!" },
                    { type: "email", message: "Enter a valid email!" },
                  ]}
                >
                  <Input
                    size="large"
                    className="h-[53px] rounded-lg"
                  />
                </Form.Item>
                <Form.Item
                  className="text-lg text-[#222222] font-medium"
                  label="Phone Number"
                  name="phone"
                  rules={[{ required: true, message: "Please enter your phone number!" }]}
                  getValueFromEvent={(value) => value} // Extracts the value from the child component
                >
                  <PhoneCountryInput />
                </Form.Item>
                <Form.Item className="flex justify-end pt-4">
                  <Button
                    // onClick={(e) => navigate(`edit`)}
                    size="large"
                    type="primary"
                    htmlType="submit"
                    className="px-8 bg-[#174C6B] text-white hover:bg-black/90 rounded-xl font-semibold h-11"
                  >
                    Save Changes
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditMyProfile;
