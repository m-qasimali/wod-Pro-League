import {
  ArrowRightStartOnRectangleIcon,
  Bars4Icon,
  CheckIcon,
  ClockIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  TrashIcon,
  UserPlusIcon,
  XMarkIcon,
  PencilSquareIcon,
  ChevronDownIcon,
} from "@heroicons/react/16/solid";
import Edit from "../../assets/icons/Edit.svg";
import { CheckCircleIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { FaCalendarCheck } from "react-icons/fa";
import { FaCalendarTimes } from "react-icons/fa";
import { BiCheckboxSquare } from "react-icons/bi";
import { BiCheckbox } from "react-icons/bi";
import NotificationIcon from "../../assets/icons/Notifications.png";
import { MdApproval } from "react-icons/md";

import { LuLayoutDashboard as DashboardIcon } from "react-icons/lu";
import { CgGym as Workout } from "react-icons/cg";
import { HiOutlineUsers as Users } from "react-icons/hi2";
import { SiMicrosoftteams as Teams } from "react-icons/si";
import { MdOutlineAdminPanelSettings as Admin } from "react-icons/md";
import { RiPassPendingLine as CouponIcon } from "react-icons/ri";
import { PiRankingLight } from "react-icons/pi";
import { TbFileReport } from "react-icons/tb";

export const Icons = {
  OpenSidebarIcon: Bars4Icon,
  CloseSidebarIcon: XMarkIcon,
  WorkoutIcon: Workout,
  AddIcon: PlusIcon,
  EditIcon: Edit,
  Delete: TrashIcon,
  CheckCircle: CheckCircleIcon,
  DateStart: FaCalendarCheck,
  DateEnd: FaCalendarTimes,
  CheckedBox: BiCheckboxSquare,
  UnCheckedBox: BiCheckbox,
  View: EyeIcon,
  Search: MagnifyingGlassIcon,
  Hide: EyeSlashIcon,
  Email: EnvelopeIcon,
  Logout: ArrowRightStartOnRectangleIcon,
  Filter: FunnelIcon,
  Teams: Teams,
  Users: Users,
  Clock: ClockIcon,
  Notification: NotificationIcon,
  Check: CheckIcon,
  UserPlus: UserPlusIcon,
  Coupon: CouponIcon,
  Admins: Admin,
  Edit: PencilSquareIcon,
  ArrowDown: ChevronDownIcon,
  Dashboard: DashboardIcon,
  Approvals: MdApproval,
  Results: PiRankingLight,
  Reports: TbFileReport,
};
