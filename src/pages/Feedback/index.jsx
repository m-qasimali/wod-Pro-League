import Input from "@/components/global/Input";
import Logo from "../../assets/images/Logo.png";
import { useState } from "react";
import TextArea from "@/components/global/TextArea";
import Spinner from "@/components/global/Spinner";
import toast from "react-hot-toast";
import { addFeedbackInDB } from "@/redux/features/feedback/feedbackDB";

const initialState = {
  email: "",
  subject: "",
  description: "",
  file: "",
};

const Feedback = () => {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setData({
        ...data,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (data.email === "" || data.subject === "" || data.description === "") {
      toast.error("Email, Subject, and Description are required");
      return;
    }

    if (!emailPattern.test(data.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      await addFeedbackInDB(data);
      toast.success("Feedback submitted successfully");
    } catch (error) {
      toast.error("Failed to submit feedback. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="w-full px-5 sm:w-[500px] flex flex-col">
        <div className="flex flex-row items-center justify-center mb-10">
          <img className="w-24 h-24 rounded-full" src={Logo} alt="logo" />
        </div>
        <h1 className="font-bold text-lg">Servició de atención a atletas</h1>

        <div className="flex-grow overflow-auto custom-scrollbar scrollbar-hide flex flex-col gap-4 mt-5">
          <Input
            labelValue="Email"
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            disabled={loading}
          />

          <Input
            labelValue="Asunto"
            type="text"
            name="subject"
            value={data.subject}
            onChange={handleChange}
            disabled={loading}
          />

          <TextArea
            labelValue="Descripción"
            name="description"
            value={data.description}
            onChange={handleChange}
            disabled={loading}
          />

          <Input
            labelValue="Imagen o video"
            type="file"
            name="file"
            onChange={handleChange}
            disabled={loading}
          />

          <div className="flex flex-col items-end">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-primary hover:drop-shadow-md px-14 text-white rounded-md p-2 mt-5 flex flex-row items-center justify-center"
            >
              {loading ? <Spinner /> : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
