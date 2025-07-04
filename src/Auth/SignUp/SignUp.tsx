import { useRef, useState } from "react";
import type { SigupData } from "../../types/auth";
import JoinForm from "./JoinForm";
import ProfileSetupForm from "./ProfileSetupForm";
import { instance } from "../../api/axiosinstance";
import { useLoading } from "../../context/LoadingContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const data = useRef<SigupData>({
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    profile_image: null,
  });

  const [count, setCount] = useState<number>(0);

  const { setLoading } = useLoading();

  const handleSignUp: () => void = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("first_name", data.current.first_name);
      formData.append("last_name", data.current.last_name);
      formData.append("user_name", data.current.user_name);
      formData.append("email", data.current.email);
      formData.append("password", data.current.password);
      formData.append(
        "password_confirmation",
        data.current.password_confirmation,
      );

      if (data.current.profile_image) {
        formData.append("profile_image", data.current.profile_image);
      }

      const response = await instance.post("/register", formData);
      console.log(response.data);
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem(
        "user_info",
        JSON.stringify(response.data.data.user),
      );
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div
        className={`animate-swipe-up h-screen w-full lg:w-[40%] ${
          count !== 2 && "flex flex-col items-center gap-8 p-8"
        } no-scrollbar overflow-y-scroll`}
        key={count}
      >
        {count === 0 ? (
          <JoinForm data={data} setCount={setCount} />
        ) : (
          <ProfileSetupForm
            data={data}
            setCount={setCount}
            sendData={handleSignUp}
          />
        )}
      </div>

      <div className="relative hidden h-screen w-[60%] flex-col rounded-l-2xl bg-[#fff2f2] p-8 lg:flex">
        <h1 className="heading">
          Share <br /> valuable resources
        </h1>
        <p className="text_para">
          Now you can connect with fellow <br />
          traders around the world.
        </p>
        <div className="scale-125 self-start p-10">
          <img src="/assets/imgs/form_background.png" alt="" />
        </div>
        <div className="absolute right-0 hidden rotate-180 xl:block">
          <img src="/assets/imgs/distract_line.png" alt="" />
        </div>
      </div>
    </div>
  );
}
