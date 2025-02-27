import { Input } from "antd"
import { FaArrowLeft } from "react-icons/fa6"
import { HiOutlineArrowLeft } from "react-icons/hi";


const VerifyEmail = () => {
    const onChange = (text) => {
        console.log('onChange:', text);
    };
    const onInput = (value) => {
        console.log('onInput:', value);
    };
    const sharedProps = {
        onChange,
        onInput,
    };

    return (
        <div className="flex items-center justify-center ">
            <div className="bg-[#F4F9FB] rounded-lg shadow-lg mt-8 w-[610px] h-[468px] mx-auto py-10 px-8">
                <div className="flex flex-col  w-full max-w-xl mx-auto mt-10 p-4 rounded-lg space-y-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="w-[24px] h-[24px]">
                                <HiOutlineArrowLeft className="text-[19px]" />
                            </div>
                            <h1 className="text-[26px] text-[#525252] font-semibold">Verify Email</h1>
                        </div>
                        <h1 className="text-[16px] text-[#525252] font-semibold">Please enter the OTP we have sent you in your email. </h1>

                    </div>
                    <Input.OTP formatter={(str) => str.toUpperCase()} {...sharedProps} size="large" style={{ gap: '20px' }} className="custom-otp-input" />

                    <div className="flex justify-between items-center">
                        <h1 className="text-[16px] text-[#525252] font-semibold">Didn’t receive the code?</h1>
                        <h1 className="text-[#32A5E8]">Resend</h1>
                    </div>
                    {/* Send OTP Button */}
                    <button className="mt-6 w-full bg-[#174C6B] text-white py-2 rounded-lg hover:bg-[#174C6B]/80 h-[56px] text-[20px]" onClick={(e) => navigate(`verify-email`)}>
                        Verify
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail
