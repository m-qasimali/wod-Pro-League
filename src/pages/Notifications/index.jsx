import { useState } from "react";
import Spinner from "../../components/global/Spinner";

const initialState = {
  content: "",
};

const Notifications = () => {
  const [data, setData] = useState(initialState);
  const loading = false;
  return (
    <div className="flex flex-col">
      <p className="font-bold text-2xl">Manage Notifications</p>

      <div className="mt-10 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="content" className="font-semibold">
            Notification Content
          </label>
          <textarea
            name=""
            id="content"
            className="w-96 outline-none border border-black focus:border-primary rounded-sm resize-none p-2"
            rows={8}
            disabled={loading}
          ></textarea>
        </div>

        <div>
          <button
            disabled={loading}
            className="bg-primary px-8 py-2 font-semibold text-white flex flex-row items-center justify-center"
          >
            {loading ? <Spinner /> : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
