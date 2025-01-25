import { useState } from "react"
import tickImg from '../../../assets/images/membership-tick.png'
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import AddNewButton from "../../../Components/AddNewButton";
import Swal from "sweetalert2";

const plans = [
    { id: 1, name: 'Workout Membership', price: 0, features: ['View Members Directory', 'View Members Profile', 'Send Private Messages', 'Add Media To Your Profile'] },
    { id: 2, name: 'Nutrition Membership ', price: 20, features: ['View Members Directory', 'View Members Profile', 'Send Private Messages', 'Add Media To Your Profile'] },
    { id: 3, name: 'Nutrition Membership', price: 60, features: ['Discuss your program', 'Track your progress by scheduling calls periodically', 'Accountability', ' life style coaching'] },
]
const Subscription = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate();

    const handleSubscribe = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)
        console.log('Clicked in handleSubscribe')

        try {
            const res = await fetch(`http://192.168.10.32:5002/api/v1/subscription/subscribe?plan=starter`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (!res.ok) {
                const errorData = await res.text()
                throw new Error(`Failed to subscribe: ${res.status} ${res.statusText}. ${errorData}`)
            }

            const data = await res.json()
            console.log('Subscription successful:', data)
            if (data && data.data.url) {
                window.location.href = data.data.url; // Redirects to the URL
            } else {
                throw new Error('Stripe URL not provided in response.');
            }
            // Handle successful subscription here (e.g., redirect to a success page)
        } catch (err) {
            console.error('Error details:', err)
            setError(err instanceof Error ? err.message : 'An unknown error occurred')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = () => {
        Swal.fire({
            text: "Are you sure you want to delete this subscription? ",
            showCancelButton: true,
            confirmButtonText: "     Sure    ",
            cancelButtonText: "Cancel",
            showConfirmButton: true,
            confirmButtonColor: "#345C8C",
            reverseButtons: true,
            customClass: {
                confirmButton: "swal-confirm-btn",
                cancelButton: "swal-cancel-btn",
                actions: "swal-actions-container",
                popup: "swal-popup",
            },
        }).then((res) => {
            if (res.isConfirmed) {
                // dispatch(logout());
                // localStorage.removeItem("token");
                // localStorage.removeItem("user-update");
                // navigate("/auth");
            }
        });
    };
    return (
        <div>
            <button className="px-6 py-2 min-w-[100px] text-center text-white bg-[#345C8C] border border-[#345C8C] rounded-md active:text-[#345C8C] hover:bg-transparent hover:text-[#345C8C] focus:outline-none focus:ring float-end flex items-center gap-2" onClick={() => navigate("/add-subscription")}>
                <FaPlus />
                Add new subscription</button>
            {/* <AddNewButton text={'Add new subscription'} path={'/add-subscription'} /> */}
            <div className="py-20">

                <div className='flex items-center justify-center gap-12'>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {plans.map((plan) => (
                            <div key={plan.id} className="bg-white rounded-xl w-64 py-6">
                                <div className="flex flex-col items-center justify-center text-[#EB4B73] gap-2 pb-5 border-b-2 border-b-[#EB4B73]/20 min-h-[130px]">
                                    <h1 className="text-xl text-center">{plan.name}</h1>
                                    <div className="flex flex-col items-center">
                                        <div className="flex items-center text-xl">
                                            <span>{plan.price === 0 ? '' : '$'}</span>
                                            <h2>{plan.price === 0 ? 'Free' : plan.price}</h2>
                                        </div>
                                        <span className="text-xs">{plan.price === 0 ? '' : '/month'}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center py-6">
                                    <div className="space-y-5 flex flex-col items-start justify-center">
                                        {plan.features.map((option, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <img src={tickImg}
                                                    alt='Tick image' className="w-5 h-5" />

                                                <h3 className="text-xs max-w-[160px]">{option}</h3>
                                            </div>
                                        ))}
                                        {/* {plan.options.map((option, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <Image
                                                src={tickImg}
                                                alt='Tick image'
                                                height={15}
                                                width={15}
                                            />
                                            <h3 className="text-xs">{option}</h3>
                                        </div>
                                    ))} */}
                                        <div className="flex justify-center items-center gap-3">
                                            <button className="px-6 py-1.5 min-w-[100px] text-center text-[#345C8C] bg-[#EBF8FF] border border-[#345C8C] rounded-md active:text-[#345C8C] hover:bg-transparent hover:text-[#345C8C] focus:outline-none focus:ring" onClick={handleDelete} >Delete</button>
                                            <button className="px-6 py-1.5 min-w-[100px] text-center text-white bg-[#345C8C] border border-[#345C8C] rounded-md active:text-[#345C8C] hover:bg-transparent hover:text-[#345C8C] focus:outline-none focus:ring" onClick={() => navigate("/edit-subscription")}>Edit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Subscription
