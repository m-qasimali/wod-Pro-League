import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getRankingData, upateVideoStatus } from "../../redux/videoSlice";
import toast from "react-hot-toast";
import Input from "../../components/global/Input";
import { useEffect, useState } from "react";
import Spinner from "../../components/global/Spinner";

const initialState = {
  judgeName: "",
  videoMinutes: 0,
  videoSeconds: 0,
  liftedWeight: 0,
  repetitions: 0,
};

const WorkoutVideos = () => {
  const location = useLocation();
  const { videos } = location.state;
  const { loading } = useSelector((state) => state.video);
  const [data, setData] = useState(initialState);
  const dispatch = useDispatch();
  const { workoutId, userId } = useParams();
  const { rankingData } = useSelector((state) => state.video);
  const [click, setClick] = useState("");

  useEffect(() => {
    dispatch(getRankingData({ userId, workoutId }));
  }, [dispatch, userId, workoutId]);

  useEffect(() => {
    if (rankingData?.uploadTime) {
      const [minutes, _, seconds] = rankingData.uploadTime.split(" ");

      setData((prevData) => ({
        ...prevData,
        videoMinutes: +minutes,
        videoSeconds: +seconds,
      }));
    }
    if (rankingData?.liftedWeight) {
      setData((prevData) => ({
        ...prevData,
        liftedWeight: +rankingData.liftedWeight,
      }));
    }

    if (rankingData?.repetitions) {
      setData((prevData) => ({
        ...prevData,
        repetitions: +rankingData.repetitions,
      }));
    }
  }, [rankingData]);

  const handleApprove = async () => {
    setClick("approve");
    if (data.judgeName === "") {
      toast.error("Judge name required");
      return;
    }
    try {
      await dispatch(
        upateVideoStatus({
          videoId: videos?.id,
          userId: userId,
          workoutId: workoutId,
          status: "approved",
          judgeName: data.judgeName,
          videoMinutes: data.videoMinutes,
          videoSeconds: data.videoSeconds,
          repetitions: data.repetitions,
          liftedWeight: data.liftedWeight,
        })
      ).unwrap();
      toast.success("Video approved successfully");
    } catch (error) {
      console.log(error);

      toast.error("Error approving video");
    }
  };

  const handleChange = (e) => {
    setClick("decline");
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
          userId: userId,
          workoutId: workoutId,
          status: "declined",
          judgeName: data.judgeName,
          videoMinutes: data.videoMinutes,
          videoSeconds: data.videoSeconds,
          repetitions: data.repetitions,
          liftedWeight: data.liftedWeight,
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
          <div className="flex flex-col gap-2 border rounded-lg p-2 col-span-2 md:col-span-1">
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

          <div className="flex flex-col gap-2 border rounded-lg p-2  col-span-2 md:col-span-1">
            <div className="flex flex-row items-center justify-between">
              <p className="font-bold text-xl">Exercise</p>
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

        <div className="w-full lg:w-1/3 space-y-5 mb-5">
          <Input
            labelValue="Judge Name"
            type="text"
            value={data?.judgeName}
            onChange={handleChange}
          />
          {rankingData?.uploadTime && rankingData?.uploadTime !== "" && (
            <>
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
            </>
          )}

          {rankingData?.liftedWeight && rankingData?.liftedWeight !== "" && (
            <Input
              labelValue="Lifted Weight"
              type="number"
              value={data?.liftedWeight}
              onChange={handleChange}
            />
          )}

          {rankingData?.repetitions && rankingData?.repetitions !== "" && (
            <Input
              labelValue="Repetitions"
              type="number"
              value={data?.repetitions}
              onChange={handleChange}
            />
          )}
          <div className="flex flex-row gap-2">
            <button
              onClick={handleApprove}
              disabled={loading}
              className="bg-primary text-white hover:bg-opacity-80 cursor-pointer py-1 rounded-md text-lg w-full flex flex-row items-center justify-center"
            >
              {click === "approve" && loading ? <Spinner /> : "Approve"}
            </button>
            <button
              onClick={handleDecline}
              disabled={loading}
              className="bg-gray-400 text-textSecondary hover:bg-opacity-80 cursor-pointer py-1 rounded-md text-lg w-full flex flex-row items-center justify-center"
            >
              {click === "decline" && loading ? <Spinner /> : "Decline"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkoutVideos;
