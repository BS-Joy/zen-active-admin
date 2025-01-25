import { FaArrowLeft, FaEye, FaLock } from "react-icons/fa6";
import { MdLockOutline } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
    const navigate = useNavigate();
    const handleBackButtonClick = () => {
        navigate(-1); // This takes the user back to the previous page
    };
    return (
        <div className="flex items-center justify-center ">
            <div className="bg-[#F4F9FB] rounded-lg shadow-lg mt-8 w-[610px] h-[725px] mx-auto py-10 px-8">
                <div className="flex flex-col  w-full max-w-md mx-auto mt-10 p-4 rounded-lg space-y-4">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={handleBackButtonClick}>
                        <FaArrowLeft />
                        <h1>Change password</h1>
                    </div>
                    <h1>Your password must be 8-10 character long.</h1>
                    {/* Input Fields */}
                    <div className="flex flex-col w-full space-y-4">
                        {[
                            { label: 'Enter old password', placeholder: 'Enter old password' },
                            { label: 'Set new password', placeholder: 'Set new password' },
                            { label: 'Re-enter new password', placeholder: 'Re-enter new password' },
                        ].map(({ label, placeholder }, index) => (
                            <div>
                                <h1 className="mb-3">{label}</h1>
                                <div key={index} className="relative flex items-center">
                                    {/* Lock Icon */}
                                    <MdLockOutline className="absolute left-3 text-[#345C8C]" />
                                    {/* Input Field */}
                                    <input
                                        type="password"
                                        placeholder={placeholder}
                                        className="w-full pl-10 pr-10 py-2 border border-black rounded-lg placeholder:text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
                                    />
                                    {/* Eye Icon */}
                                    <FaRegEyeSlash className="absolute right-3  cursor-pointer" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Forgot Password */}
                    <p className="mt-4 text-sm text-[#345C8C] ml-auto cursor-pointer hover:underline" onClick={(e) => navigate(`forgot-password`)}>
                        Forgot Password?
                    </p>

                    {/* Update Password Button */}
                    <button className="mt-6 w-full bg-[#345C8C] text-white py-2 rounded-lg hover:bg-[#345C8C]/80">
                        Update Password
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword
