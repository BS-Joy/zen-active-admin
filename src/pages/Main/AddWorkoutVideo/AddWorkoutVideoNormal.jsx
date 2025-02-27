'use client'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { FaAngleLeft } from "react-icons/fa6";
import { CiCamera } from "react-icons/ci";
import { IoVideocamOutline } from "react-icons/io5";
import { useCreateWorkoutVideoMutation } from "../../../redux/features/workoutVideo/workoutVideoApi";

const AddWorkoutVideoNormal = () => {
    const [videoFile, setVideoFile] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [name, setName] = useState("");
    const [createWorkoutVideo] = useCreateWorkoutVideoMutation();
    const navigate = useNavigate();

    const handleVideoChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("video/")) {
            setVideoFile(file);
        } else {
            alert("You can only upload video files!");
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setImageFile(file);
        } else {
            alert("You can only upload image files!");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        if (imageFile) {
            formData.append("image", imageFile);
        }
        if (videoFile) {
            formData.append("media", videoFile);
        }
        formData.append("data", JSON.stringify({ name: name }));

        console.log(imageFile, videoFile, name, 'form data');


        try {
            console.log(imageFile, videoFile, name, 'form data');
            const response = await createWorkoutVideo(formData).unwrap();
            console.log(response, 'response from add video');
            alert("Video added successfully!");
            setVideoFile(null);
            setImageFile(null);
            setName("");
        } catch (error) {
            alert(error.data?.message || "Failed to add video.");
        }
    };

    return (
        <>
            <div className="flex items-center gap-2 text-xl cursor-pointer" onClick={() => navigate(-1)}>
                <FaAngleLeft />
                <h1 className="font-semibold">Add Video</h1>
            </div>
            <div className="rounded-lg py-4 border-[#79CDFF] border-2 shadow-lg mt-8 bg-white">
                <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
                    <h3 className="text-2xl text-[#174C6B] mb-4 border-b border-[#79CDFF]/50 pb-3 pl-16 font-semibold">
                        Adding Video
                    </h3>
                    <div className="w-full px-16">
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-8 mt-8">
                                <div>
                                    <label className="block text-lg font-semibold text-[#2D2D2D]">Upload Video</label>
                                    <div className="relative w-full border border-[#79CDFF] flex justify-between items-center p-2 rounded-md">
                                        <input type="file" accept="video/*" onChange={handleVideoChange} className="hidden" id="videoUpload" />
                                        <label htmlFor="videoUpload" className="cursor-pointer w-full flex justify-between items-center">
                                            <span className="text-[#525252] font-semibold">Select a video</span>
                                            <IoVideocamOutline size={20} color="#174C6B" />
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-lg font-semibold text-[#2D2D2D]">Upload Image</label>
                                    <div className="relative w-full border border-[#79CDFF] flex justify-between items-center p-2 rounded-md">
                                        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="imageUpload" />
                                        <label htmlFor="imageUpload" className="cursor-pointer w-full flex justify-between items-center">
                                            <span className="text-[#525252] font-semibold">Select an image</span>
                                            <CiCamera size={25} color="#174C6B" />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <label className="block text-lg font-semibold text-[#2D2D2D]">Video name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter video name"
                                    className="w-full border border-[#79CDFF] p-2 rounded-md text-lg font-semibold text-[#525252]"
                                />
                            </div>

                            <div className="p-4 mt-10 text-center mx-auto flex items-center justify-center">
                                <button type="submit" className="w-[500px] bg-[#174C6B] text-white px-10 h-[45px] flex items-center justify-center gap-3 text-lg outline-none rounded-md">
                                    <span className="text-white font-semibold">Upload</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddWorkoutVideoNormal;
