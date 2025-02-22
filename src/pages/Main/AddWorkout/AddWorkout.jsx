import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { Form, Input, Button, Select, Space } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
const { Option } = Select;
import { FaAngleLeft } from "react-icons/fa6";
import { UploadOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { CiCamera } from "react-icons/ci";
import { useCreateWorkoutMutation, useGetAllWorkoutQuery } from "../../../redux/features/workout/workoutApi";


const AddWorkout = () => {
    const [file, setFile] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [inputMessage, setInputMessage] = useState("");
    const [week, setWeek] = useState(1);
    const [name, setName] = useState("");
    const [workoutPlan, setWorkoutPlan] = useState(null);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { data: workouts } = useGetAllWorkoutQuery(null)
    const [createWorkout] = useCreateWorkoutMutation()

    // Handle file selection
    const handleFileChange = ({ file }) => {
        setFile(file.originFileObj); // Save selected file
    };

    const workoutsArray = workoutPlans?.data?.map((workoutPlan) => workoutPlan.workouts);
    const flattenedWorkouts = workoutsArray?.flat(); // Flattening the array of arrays
    const workoutsId = flattenedWorkouts?.map((w) => w._id);

    // Logic for multi select input
    const options = workouts?.data?.reduce((acc, workout) => {
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

    function extractJsonData(jsonString) {
        try {
            // Use regex to match the content inside the first pair of curly braces
            const match = jsonString.match(/{.*}/s);

            if (match) {
                // Parse and return the matched part as a JSON object
                return JSON.parse(match[0]);
            } else {
                // If no match, return null or handle accordingly
                return null;
            }
        } catch (error) {
            console.error("Error parsing JSON:", error);
            return null;
        }
    }

    const onFinish = async (values) => {
        setLoading(true);
        setError("");

        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // Replace with your actual API key
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                // body: JSON.stringify({
                //     contents: [
                //         {
                //             parts: [
                //                 {
                //                     text: `${JSON.stringify(
                //                         values.description
                //                     )} this is my workout data.  make workout plan for ${values.duration} week. workout plan name is ${values.name}. ensure each day have 1 workout. make plan based on the workout plan name. workout can be repeted. give me just json data based on this mongoose schema : 
                //                     [ const WorkoutPlanSchema = new Schema<IWorkoutPlan>(
                //                     {
                //                       name: { type: String, required: true },
                //                       description: { type: String, required: true },
                //                     duration: { type: Number, required: true },
                //                       workouts: [{ type: Schema.Types.ObjectId, required: true, ref: "Workout" }],
                //                       points: { type: Number, required: true },
                //                       isDeleted: { type: Boolean, default: false },
                //                       image: { type: String, required: true },
                //                     },
                //                     { timestamps: true }
                //                         )]   
                //                     ;


                //                       `,
                //                 },
                //             ],
                //         }
                //     ]
                // }),
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `
                ${JSON.stringify(values.description)} this is my workout data. 
                Make a structured workout plan for ${values.duration} weeks. 
                Workout plan name: ${values.name}. 
                Ensure **each day of each week has exactly 1 workout**.
                This means the total number of workouts should be **${values.duration * 7} workouts**.
                **ONLY** select workouts from this list: ${JSON.stringify(workoutsId)}.
                **DO NOT** return null values in the workouts array.
                **DO NOT** generate new workout IDs, only use IDs from the given list.
                Provide only JSON data based on this Mongoose schema:
                [
                    const WorkoutPlanSchema = new Schema<IWorkoutPlan>({
                        name: { type: String, required: true },
                        description: { type: String, required: true },
                        duration: { type: Number, required: true },
                        workouts: [{ type: Schema.Types.ObjectId, required: true, ref: "Workout" }],
                        points: { type: Number, required: true },
                        isDeleted: { type: Boolean, default: false },
                        image: { type: String, required: true }
                    }, { timestamps: true })
                ]`
                        }]
                    }]
                }),
            });

            const data = await response.json();
            const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
            console.log("API Response:", responseText);

            const parsedData = extractJsonData(responseText);

            console.log(parsedData, 'parsedData');

            if (parsedData) {
                // Ensure the number of workouts matches the required 7 days * X weeks
                // const expectedWorkouts = parsedData.duration * 7;

                // if (parsedData.workouts.length !== expectedWorkouts) {
                //     console.error(`Mismatch: ${parsedData.workouts.length} workouts for ${parsedData.duration} weeks (expected ${expectedWorkouts})`);
                //     message.error(`Error: Expected ${expectedWorkouts} workouts, but received ${parsedData.workouts.length}`);
                //     return;
                // }
                const formattedData = {
                    name: parsedData.name,
                    description: parsedData.description,
                    duration: parsedData.duration,
                    points: parsedData.points > 0 ? parsedData.points : 0, // Ensure points are positive
                    workouts: parsedData.workouts.filter(workout => workout && typeof workout === "string"), // Remove null values
                    image: parsedData.image,
                };

                if (formattedData.workouts.length === 0) {
                    message.error("No valid workouts returned from Gemini.");
                    return;
                }

                const formData = new FormData();
                if (file) {
                    formData.append("image", file);
                }


                formData.append("data", JSON.stringify(formattedData));

                const createResponse = await createWorkoutPlan(formData).unwrap();
                console.log(createResponse, 'Workout plan created successfully!');
                message.success("Workout plan created successfully!");

                form.resetFields();
                setFile(null);
            } else {
                message.error("Failed to process workout plan.");
            }

            // if (parsedData) {
            //     setWorkoutPlan(parsedData);
            // }

            // setMessages((prevMessages) => [
            //     ...prevMessages,
            //     {
            //         sender: "Gemini",
            //         text: responseText,
            //     },
            // ]);
        } catch (err) {
            setError("Failed to fetch response from Gemini.");
        } finally {
            setLoading(false);
        }
    };

    const handleBackButtonClick = () => {
        navigate(-1); // This takes the user back to the previous page
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
                <h1 className="font-semibold">Add Workout</h1>
            </div>
            <div className="rounded-lg py-4 border-[#79CDFF] border-2 shadow-lg mt-8 bg-white">
                <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
                    <h3 className="text-2xl text-[#174C6B] mb-4 border-b border-[#79CDFF]/50 pb-3 pl-16 font-semibold">
                        Adding Workout
                    </h3>
                    <div className="w-full px-16">
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                        // style={{ maxWidth: 600, margin: '0 auto' }}
                        >
                            {/* Section 1 */}
                            <Space direction="vertical" style={{ width: '100%' }}>
                                <Space size="large" direction="horizontal" className="responsive-space">
                                    {/* Name */}
                                    <Form.Item
                                        label={<span style={{ fontSize: '18px', fontWeight: '600', color: '#2D2D2D' }}>Workout Name</span>}
                                        name="name"
                                        className="responsive-form-item"
                                    // rules={[{ required: true, message: 'Please select a package name!' }]}
                                    >
                                        <Input type="text" placeholder="Enter Workout Name" style={{
                                            height: '40px',
                                            border: '1px solid #79CDFF',
                                            fontSize: '16px',
                                            fontWeight: 600,
                                            color: '#525252',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }} />
                                    </Form.Item>

                                    {/* Description */}
                                    <Form.Item
                                        label={<span style={{ fontSize: '18px', fontWeight: '600', color: '#2D2D2D' }}>Workout Description</span>}
                                        name="description"
                                        className="responsive-form-item"
                                    // rules={[{ required: true, message: 'Please select a package name!' }]}
                                    >
                                        <Input type="text" placeholder="Enter Workout Description" style={{
                                            height: '40px',
                                            border: '1px solid #79CDFF',
                                            fontSize: '16px',
                                            fontWeight: 600,
                                            color: '#525252',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }} />
                                    </Form.Item>

                                    {/* Image */}
                                    <Form.Item
                                        label={<span style={{ fontSize: '18px', fontWeight: '600', color: '#2D2D2D' }}>Upload Image</span>}
                                        name="image"
                                        className="responsive-form-item"
                                    // rules={[{ required: true, message: 'Please enter the package amount!' }]}
                                    >
                                        <Upload {...props}
                                            onChange={handleFileChange}
                                            maxCount={1}
                                        >
                                            <Button style={{ width: '440px', height: '40px', border: '1px solid #79CDFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ color: '#525252', fontSize: '16px', fontWeight: 600 }}>Select an image</span>
                                                <CiCamera size={25} color="#174C6B" />
                                            </Button>
                                        </Upload>
                                    </Form.Item>

                                    {/* Points */}
                                    <Form.Item
                                        label={<span style={{ fontSize: '18px', fontWeight: '600', color: '#2D2D2D' }}>Points</span>}
                                        name="points"
                                        className="responsive-form-item"
                                    // rules={[{ required: true, message: 'Please select a package name!' }]}
                                    >
                                        <Input type="number" placeholder="Enter Points" style={{
                                            height: '40px',
                                            border: '1px solid #79CDFF',
                                            fontSize: '16px',
                                            fontWeight: 600,
                                            color: '#525252',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }} />
                                    </Form.Item>


                                    {/* Exercises */}
                                    <Form.Item
                                        label={<span style={{ fontSize: '18px', fontWeight: '600', color: '#2D2D2D' }}>Select Exercise</span>}
                                        name="exercises"
                                        className="responsive-form-item"
                                    // rules={[{ required: true, message: 'Please select a duration!' }]}
                                    >
                                        <Select
                                            mode="multiple"
                                            size={'middle'}
                                            placeholder="Select Exercise"
                                            // defaultValue={['Vegetarian']}
                                            onChange={handleMultiSelectChange}
                                            style={{
                                                width: '100%',
                                            }}
                                            options={options}
                                        />
                                    </Form.Item>

                                </Space>
                            </Space>


                            {/* Submit Button */}
                            <Form.Item>
                                <div className="p-4 mt-10 text-center mx-auto flex items-center justify-center">
                                    <button
                                        className="w-[500px] bg-[#174C6B] text-white px-10 h-[45px] flex items-center justify-center gap-3 text-lg outline-none rounded-md "
                                    >
                                        <span className="text-white font-semibold">Create</span>
                                    </button>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddWorkout
