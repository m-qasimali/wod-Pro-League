import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { upateVideoStatus } from "../../redux/videoSlice";
import toast from "react-hot-toast";

const WorkoutVideos = () => {
  const location = useLocation();
  const { videos } = location.state;
  const { loading } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const handleApprove = async () => {
    try {
      await dispatch(
        upateVideoStatus({
          videoId: videos?.id,
          userId: videos?.userId,
          status: "approved",
        })
      ).unwrap();
      toast.success("Video approved successfully");
    } catch (error) {
      toast.error("Error approving video");
    }
  };
  const handleDecline = async () => {
    try {
      await dispatch(
        upateVideoStatus({
          videoId: videos?.id,
          userId: videos?.userId,
          status: "declined",
        })
      ).unwrap();
      toast.success("Video declined successfully");
    } catch (error) {
      toast.error("Error declining video");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-20">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center justify-between">
            <p className="font-bold text-xl">Title</p>
          </div>

          <div className="w-full flex flex-row items-center justify-center">
            <video
              className="h-96 w-auto border border-primary rounded-lg"
              controls
            >
              <source src={videos?.videos[0]} type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center justify-between">
            <p className="font-bold text-xl">Title</p>
          </div>

          <div>
            <p className="text-sm font-semibold">{videos?.athleteTime}</p>
          </div>

          <div className="w-full flex flex-row items-center justify-center">
            <video
              className="h-96 w-auto border border-primary rounded-lg"
              controls
            >
              <source src={videos?.videos[1]} type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="flex flex-row gap-2 md:gap-5">
          <button
            onClick={handleApprove}
            disabled={loading}
            className="bg-primary text-white hover:bg-opacity-80 cursor-pointer py-1 rounded-md text-lg w-full"
          >
            Approve
          </button>
          <button
            onClick={handleDecline}
            disabled={loading}
            className="bg-gray-400 text-textSecondary hover:bg-opacity-80 cursor-pointer py-1 rounded-md text-lg w-full"
          >
            Decline
          </button>
        </div>
      </div>
    </>
  );
};

export default WorkoutVideos;
