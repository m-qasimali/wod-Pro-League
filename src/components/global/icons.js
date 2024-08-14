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
} from "@heroicons/react/16/solid";
import Workout from "../../assets/icons/workout.svg";
import Edit from "../../assets/icons/Edit.svg";
import { CheckCircleIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { FaCalendarCheck } from "react-icons/fa";
import { FaCalendarTimes } from "react-icons/fa";
import { BiCheckboxSquare } from "react-icons/bi";
import { BiCheckbox } from "react-icons/bi";
import Teams from "../../assets/icons/teams.svg";
import Users from "../../assets/icons/users.svg";
import NotificationIcon from "../../assets/icons/Notifications.png";

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
};
