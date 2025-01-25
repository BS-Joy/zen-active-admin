import { CiSettings, CiUser } from "react-icons/ci";
import { GrMoney } from "react-icons/gr";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import DashboardHome from "../pages/Main/DashboardHome/DashboardHome";
import Guests from "../pages/Main/Users/Users";
import MyProfile from "../pages/Profile/MyProfile";
import EditMyProfile from "../pages/Profile/EditMyProfile";
import TermsConditions from "../pages/Settings/TermsConditions";
import EditTermsConditions from "../pages/Settings/EditTermsConditions";
import PrivacyPolicy from "../pages/Settings/PrivacyPolicy";
import EditPrivacyPolicy from "../pages/Settings/EditPrivacyPolicy";
import { FaRegUser } from "react-icons/fa6";
import {
  MdOutlineSecurityUpdateWarning,
} from "react-icons/md";
import HostDetails from "../pages/Main/Host/HostDetails";
import { FaServicestack } from "react-icons/fa6";
import { BiMessageSquareDetail } from "react-icons/bi";
import { PiHandWithdrawBold } from "react-icons/pi";
import Earnings from "../pages/Main/Earnings/Earnings";
import Setting from "../pages/Main/Setting/Setting";
import ChangePassword from "../pages/Main/Setting/Change-password/ChangePassword";
import ForgotPassword from "../pages/Main/Setting/Change-password/ForgotPassword";
import VerifyEmail from "../pages/Main/Setting/Change-password/VerifyEmail";
import Trust from "../pages/Settings/Trust";
import EditTrust from "../pages/Settings/EditTrust";
import { TbCoin } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { LuCrown } from "react-icons/lu";
import Subscription from "../pages/Main/Subscription/Subscription";
import Notifications from "../pages/Main/Notifications/Notifications";
import AddSubscription from "../pages/Main/AddSubscription/AddSubscription";
import EditSubscription from "../pages/Main/EditSubscription/EditSubscription";

export const dashboardItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: RiDashboardHorizontalFill,
    element: <DashboardHome />,
  },
  {
    name: "Earning",
    path: "earnings",
    icon: TbCoin,
    element: <Earnings />,
  },
  {
    name: "User",
    path: "users",
    icon: FaRegUser,
    element: <Guests />,
  },
  // {
  //   name: "Approve Request",
  //   rootPath: "approveRequest",
  //   icon: GrMoney,
  //   children: [
  //     {
  //       name: "Studio Post",
  //       path: "approveRequest/all-earnings",
  //       icon: LuWallet,
  //       element: <StudioPost />,
  //     },
  //     {
  //       name: "Trainer Post",
  //       path: "approveRequest/withdraw",
  //       icon: PiHandWithdrawBold,
  //       element: <TrainerPost />,
  //     },
  //   ],
  // },
  {
    path: "notifications",
    element: <Notifications />,
  },
  {
    path: "add-subscription",
    element: <AddSubscription />,
  },
  {
    path: "edit-subscription",
    element: <EditSubscription />,
  },
  // {
  //   path: '/reviews',
  //   element: <Review></Review>
  // },


  // {
  //   name: "Driver",
  //   path: "driver",
  //   icon: GrUserManager,
  //   element: <Driver />,
  // },
  // {
  //   name: "Driver Request",
  //   path: "driver-request",
  //   icon: PiLaptopThin,
  //   element: <DriverRequest />,
  // },
  {
    name: "Subscription",
    path: "subscription",
    icon: LuCrown,
    element: <Subscription />,
  },
  {
    name: "Settings",
    path: "settings",
    icon: IoSettingsOutline,
    element: <Setting />,
  },
  {
    path: "/hosts/:id",
    element: <HostDetails />,
  },
  {
    name: "Settings",
    rootPath: "settings",
    icon: CiSettings,
    children: [
      {
        name: "Personal Information",
        path: "settings/profile",
        icon: CiUser,
        element: <MyProfile />,
      },
      {
        path: "settings/profile/edit",
        element: <EditMyProfile />,
      },
      {
        name: "Change Password",
        icon: FaServicestack,
        path: "settings/change-password",
        element: <ChangePassword />,
      },
      {
        path: "settings/change-password/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "settings/change-password/forgot-password/verify-email",
        element: <VerifyEmail />,
      },
      {
        name: "Terms & Condition",
        icon: FaServicestack,
        path: "settings/terms-conditions",
        element: <TermsConditions />,
      },
      {
        path: "settings/terms-conditions/edit",
        element: <EditTermsConditions />,
      },
      {
        name: "Privacy Policy",
        icon: MdOutlineSecurityUpdateWarning,
        path: "settings/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "settings/privacy-policy/edit",
        element: <EditPrivacyPolicy />,
      },
      {
        name: "Trust & Safety",
        icon: BiMessageSquareDetail,
        path: "settings/trust-safety",
        element: <Trust />,
      },
      {
        path: "settings/trust-safety/edit",
        element: <EditTrust />,
      },
    ],
  },
];
