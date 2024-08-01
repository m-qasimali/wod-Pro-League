import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { upateVideoStatus } from "../../redux/videoSlice";
import toast from "react-hot-toast";
import Input from "../../components/global/Input";
import { useState } from "react";

const initialState = { judgeName: "", videoMinutes: 0, videoSeconds: 0 };

const WorkoutVideos = () => {
  const location = useLocation();
  const { videos } = location.state;
  const { loading } = useSelector((state) => state.video);
  const [data, setData] = useState(initialState);
  const dispatch = useDispatch();

  const handleApprove = async () => {
    if (data.judgeName === "") {
      toast.error("Judge name required");
      return;
    }
    try {
      await dispatch(
        upateVideoStatus({
          videoId: videos?.id,
          userId: videos?.userId,
          status: "approved",
          judgeName: data.judgeName,
          videoMinutes: data.videoMinutes,
          videoSeconds: data.videoSeconds,
        })
      ).unwrap();
      toast.success("Video approved successfully");
    } catch (error) {
      toast.error("Error approving video");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDecline = async () => {
    try {
      await dispatch(
        upateVideoStatus({
          videoId: videos?.id,
          userId: videos?.userId,
          status: "declined",
          judgeName: data.judgeName,
          videoMinutes: data.videoMinutes,
          videoSeconds: data.videoSeconds,
        })
      ).unwrap();
      toast.success("Video declined successfully");
    } catch (error) {
      toast.error("Error declining video");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-2 border rounded-lg p-2">
            <div className="flex flex-row items-center justify-between">
              <p className="font-bold text-xl">Weights</p>
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

          <div className="flex flex-col gap-2 border rounded-lg p-2">
            <div className="flex flex-row items-center justify-between">
              <p className="font-bold text-xl">
                Exercise
                <span className="text-sm font-semibold">
                  ({videos?.athleteTime})
                </span>
              </p>
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
        </div>

        <div className="w-1/3 space-y-5">
          <Input
            labelValue="Judge Name"
            type="text"
            value={data?.judgeName}
            onChange={handleChange}
          />
          <Input
            labelValue="Video Minutes"
            type="number"
            value={data?.videoMinutes}
            onChange={handleChange}
          />
          <Input
            labelValue="Video Seconds"
            type="number"
            value={data?.videoSeconds}
            onChange={handleChange}
          />
          <div className="flex flex-row gap-2">
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
      </div>
    </>
  );
};

export default WorkoutVideos;
