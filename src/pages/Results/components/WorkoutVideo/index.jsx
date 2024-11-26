import Checkbox from "@/components/global/Checkbox";
import Input from "@/components/global/Input";
import Spinner from "@/components/global/Spinner";
import { upateVideoStatus } from "@/redux/videoSlice";
import { db } from "../../../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { FirebaseCollectionNames } from "@/constant/variables";
import Loader from "@/components/global/Loader";

const initialState = {
  judgeName: "",
  videoMinutes: "",
  videoSeconds: "",
  liftedWeight: "",
  repetitions: "",
  isWorkoutNotCompleted: false,
};

const WorkoutVideo = () => {
  const [video, setVideo] = useState({});
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialState);
  const dispatch = useDispatch();
  const { workoutId, videoId } = useParams();
  const [judgedData, setJudgedData] = useState(initialState);

  const getVideo = async () => {
    try {
      setLoading(true);
      const response = await getDoc(
        doc(db, FirebaseCollectionNames.Videos, videoId)
      );
      const videoData = response.data();
      console.log("videoData: ", videoData);

      setVideo(videoData);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVideo();
  }, []);

  useEffect(() => {
    if (video?.athleteTime) {
      const [minutes, _, seconds] = video.athleteTime.split(" ");

      setData((prevData) => ({
        ...prevData,
        videoMinutes: +minutes?.trim(),
        videoSeconds: +seconds?.trim(),
      }));
    }
    if (video?.liftedWeight) {
      setData((prevData) => ({
        ...prevData,
        liftedWeight: +video.liftedWeight?.trim(),
      }));
    }

    if (video?.repetitions) {
      setData((prevData) => ({
        ...prevData,
        repetitions: +video.repetitions?.trim(),
      }));
    }

    if (video?.judgeName) {
      setData((prevData) => ({
        ...prevData,
        judgeName: video?.judgeName,
      }));
    }
  }, [video]);

  const handleSubmit = async () => {
    console.log("judgedData: ", judgedData);

    if (judgedData.judgeName === "") {
      toast.error("Judge name required");
      return;
    }

    if (judgedData.isWorkoutNotCompleted && judgedData.repetitions === "") {
      toast.error("Repetitions required");
      return;
    }

    if (judgedData.isWorkoutNotCompleted) {
      setJudgedData((prevData) => ({
        ...prevData,
        videoMinutes: "",
        videoSeconds: "",
      }));
    }

    try {
      await dispatch(
        upateVideoStatus({
          videoId: videoId,
          userId: video?.userId,
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

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {video?.wodId && (
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
                  <source src={video?.videos[0]} type="video/mp4" />
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
                  <source src={video?.videos[1]} type="video/mp4" />
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

            {video?.athleteTime && video?.athleteTime !== "" && (
              <div className="flex flex-row items-center gap-2">
                <Checkbox
                  checked={judgedData.isWorkoutNotCompleted}
                  id={"isWorkoutNotCompleted"}
                  onChange={(e) => {
                    setJudgedData((prevData) => ({
                      ...prevData,
                      isWorkoutNotCompleted: !prevData.isWorkoutNotCompleted,
                    }));
                  }}
                />

                <p>Workout Not Completed</p>
              </div>
            )}

            {video?.athleteTime &&
              video?.athleteTime !== "" &&
              !judgedData.isWorkoutNotCompleted && (
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

            {video?.liftedWeight && video?.liftedWeight !== "" && (
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
                  min={1}
                />
              </div>
            )}

            {video?.repetitions && video?.repetitions !== "" && (
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
                  min={1}
                />
              </div>
            )}

            {judgedData.isWorkoutNotCompleted && (
              <div>
                <Input
                  labelValue="Repetitions"
                  type="number"
                  name="repetitions"
                  value={judgedData?.repetitions}
                  onChange={handleChange}
                  smallText={true}
                  min={1}
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
      )}
    </>
  );
};

export default WorkoutVideo;
