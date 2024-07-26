import { Icons } from "../../../components/global/icons";

const excercises = new Array(10).fill(0);

const ViewWorkout = ({ close }) => {
  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black opacity-50"
        onClick={close}
      ></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full sm:h-auto sm:max-w-lg bg-white border border-primary z-50 rounded-xl shadow-2xl">
        <div className="flex flex-row items-center justify-between p-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Workout ID <span className="text-primary text-sm">(Active)</span>
            </h1>
            <div className="text-[10px]">
              <span>26/02/2024</span> - <span>26/08/2024</span>
            </div>
          </div>
          <button onClick={close} className="hover:bg-gray-100 rounded-md p-1">
            <Icons.CloseSidebarIcon className="h-6 w-6 text-gray-800" />
          </button>
        </div>

        <div className="border"></div>

        <div className="p-6 flex flex-col gap-4 h-auto sm:max-h-96 overflow-auto scrollbar-hide">
          <div>
            <p className="text-lg font-semibold">Description</p>
            <p className="text-textSecondary">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit,
              illum aperiam. Neque quod consectetur possimus mollitia eligendi
              reiciendis placeat assumenda facere, accusamus rem iure minus
              officiis impedit, odio suscipit vitae perspiciatis recusandae
              aspernatur, cum quae. Officia quaerat nam quo omnis, quibusdam id
              ea similique odit aspernatur molestias explicabo iusto officiis!
            </p>
          </div>

          <div>
            <p className="text-lg font-semibold">Exercises</p>
            <div className="flex flex-col gap-1.5 ps-2 mt-2">
              {excercises.map((_, index) => (
                <div
                  key={index}
                  className="flex flex-row items-start justify-start gap-2"
                >
                  <div className="w-5 flex-shrink-0">
                    <Icons.CheckCircle className="w-full text-primary" />
                  </div>
                  <p className="text-textSecondary">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Illo, rem?
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewWorkout;
