const WorkoutVideos = () => {
  return (
    <>
      <div className="flex flex-col gap-20">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center justify-between">
            <p className="font-bold text-xl">Title</p>
            <div className="flex flex-row gap-2">
              <button className="bg-primary text-white hover:bg-opacity-80 cursor-pointer py-1 rounded-md w-20 text-sm">
                Approve
              </button>
              <button className="bg-gray-400 text-textSecondary hover:bg-opacity-80 cursor-pointer py-1 rounded-md w-20 text-sm">
                Decline
              </button>
            </div>
          </div>

          <div className="w-full flex flex-row items-center justify-center">
            <video
              className="h-96 w-auto border border-primary rounded-lg"
              controls
            >
              <source
                src={
                  "https://firebasestorage.googleapis.com/v0/b/wod-pro-league.appspot.com/o/Videos%2F1719310525301.mp4?alt=media&token=45e7a8a5-c23a-414c-810d-5842dceeb94e"
                }
                type="video/mp4"
              />
            </video>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center justify-between">
            <p className="font-bold text-xl">Title</p>
            <div className="flex flex-row gap-2">
              <button className="bg-primary text-white hover:bg-opacity-80 cursor-pointer py-1 rounded-md w-20 text-sm">
                Approve
              </button>
              <button className="bg-gray-400 text-textSecondary hover:bg-opacity-80 cursor-pointer py-1 rounded-md w-20 text-sm">
                Decline
              </button>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold">25 minutes 20 seconds</p>
          </div>

          <div className="w-full flex flex-row items-center justify-center">
            <video
              className="h-96 w-auto border border-primary rounded-lg"
              controls
            >
              <source
                src={
                  "https://firebasestorage.googleapis.com/v0/b/wod-pro-league.appspot.com/o/Videos%2F1719310525301.mp4?alt=media&token=45e7a8a5-c23a-414c-810d-5842dceeb94e"
                }
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkoutVideos;
