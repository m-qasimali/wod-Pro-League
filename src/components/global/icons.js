import {
  ArrowRightStartOnRectangleIcon,
  Bars4Icon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import Workout from "../../assets/icons/workout.svg";
import Video from "../../assets/icons/videos.png";
import Edit from "../../assets/icons/Edit.svg";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { FaCalendarCheck } from "react-icons/fa";
import { FaCalendarTimes } from "react-icons/fa";
import { BiCheckboxSquare } from "react-icons/bi";
import { BiCheckbox } from "react-icons/bi";

export const Icons = {
  OpenSidebarIcon: Bars4Icon,
  CloseSidebarIcon: XMarkIcon,
  WorkoutIcon: Workout,
  VideoIcon: Video,
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
};
