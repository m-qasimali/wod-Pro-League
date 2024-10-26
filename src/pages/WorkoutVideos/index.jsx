import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getRankingData, upateVideoStatus } from "../../redux/videoSlice";
import toast from "react-hot-toast";
import Input from "../../components/global/Input";
import { useEffect, useState } from "react";
import Spinner from "../../components/global/Spinner";

const initialState = {
  judgeName: "",
  videoMinutes: "",
  videoSeconds: "",
  liftedWeight: "",
  repetitions: "",
};

const WorkoutVideos = () => {
  const location = useLocation();
  const { videos } = location.state;
  const { loading } = useSelector((state) => state.video);
  const [data, setData] = useState(initialState);
  const dispatch = useDispatch();
  const { workoutId, userId } = useParams();
  const { rankingData } = useSelector((state) => state.video);
  const [judgedData, setJudgedData] = useState(initialState);

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

    if (rankingData?.judgeName) {
      setData((prevData) => ({
        ...prevData,
        judgeName: rankingData?.judgeName,
      }));
    }
  }, [rankingData]);

  const handleSubmit = async () => {
    if (judgedData.judgeName === "") {
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
          judgeName: judgedData.judgeName,
          videoMinutes: judgedData.videoMinutes,
          videoSeconds: judgedData.videoSeconds,
          repetitions: judgedData.repetitions,
          liftedWeight: judgedData.liftedWeight,
        })
      ).unwrap();
      toast.success("Video approved successfully");
    } catch (error) {
      console.log(error);

      toast.error("Error approving video");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJudgedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

        <div className="w-full space-y-5 mb-5">
          <Input
            labelValue="Judge Name"
            type="text"
            name="judgeName"
            value={judgedData?.judgeName}
            onChange={handleChange}
          />
          {rankingData?.uploadTime && rankingData?.uploadTime !== "" && (
            <div className="space-y-5">
              <div className="flex flex-row justify-between items-center gap-8">
                <Input
                  labelValue="Time to complete the WOD introduced by the athlete (minutes)"
                  type="number"
                  value={data?.videoMinutes}
                  disabled={true}
                  smallText={true}
                />
                <Input
                  labelValue="Judge, introduce the time of the athlete to complete the WOD after your review (minutes)"
                  type="number"
                  name="videoMinutes"
                  value={judgedData?.videoMinutes}
                  onChange={handleChange}
                  smallText={true}
                />
              </div>
              <div className="flex flex-row  gap-8">
                <Input
                  labelValue="Time to complete the WOD introduced by the athlete (seconds)"
                  type="number"
                  value={data?.videoSeconds}
                  disabled={true}
                  smallText={true}
                />
                <Input
                  labelValue="Judge, introduce the time of the athlete to complete the WOD after your review (seconds)"
                  type="number"
                  name="videoSeconds"
                  value={judgedData?.videoSeconds}
                  onChange={handleChange}
                  smallText={true}
                />
              </div>
            </div>
          )}

          {rankingData?.liftedWeight && rankingData?.liftedWeight !== "" && (
            <div className="flex flex-row gap-8">
              <Input
                labelValue="Lifted weight introduced by the athlete (kg) "
                type="number"
                value={data?.liftedWeight}
                disabled={true}
                smallText={true}
              />
              <Input
                labelValue="Judge, introduce the lifted weight of the athlete after your review (kg)"
                type="number"
                value={judgedData?.liftedWeight}
                onChange={handleChange}
                name="liftedWeight"
                smallText={true}
              />
            </div>
          )}

          {rankingData?.repetitions && rankingData?.repetitions !== "" && (
            <div className="flex flex-row justify-between items-center gap-8">
              <Input
                labelValue="Repetitions"
                type="number"
                value={data?.repetitions}
                disabled={true}
                smallText={true}
              />
              <Input
                labelValue="Repetitions"
                type="number"
                name="repetitions"
                value={judgedData?.repetitions}
                onChange={handleChange}
                smallText={true}
              />
            </div>
          )}
          <div className="flex flex-row gap-2">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-primary text-white hover:bg-opacity-80 cursor-pointer py-1 rounded-md text-lg w-full flex flex-row items-center justify-center"
            >
              {loading ? <Spinner /> : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkoutVideos;
