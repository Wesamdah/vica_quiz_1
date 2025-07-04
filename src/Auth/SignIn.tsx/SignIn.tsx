import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { LoginData } from "../../types/auth";
import type { InputType } from "../../types/form";
import { useLoading } from "../../context/LoadingContext";
import { instance } from "../../api/axiosinstance";
import FormAuth from "../../components/AuthForm/AuthForms";

const inputs: Array<InputType> = [
  {
    label: "Email ",
    type: "email",
    placeholder: "example@gmail.com",
    id: "email",
  },
  {
    label: "Password (6 or more characters) ",
    type: "password",
    placeholder: "********",
    id: "password",
  },
];

export default function SignIn() {
  const navigate = useNavigate();
  const data = useRef<LoginData>({ email: "", password: "" });

  const { setLoading } = useLoading();

  const handleLogin: () => void = async () => {
    setLoading(true);
    try {
      const response = await instance.post("/login", data.current);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user_info", JSON.stringify(response.data.user));
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="relative hidden h-screen w-[60%] flex-col rounded-r-2xl bg-[#fff2f2] p-8 lg:flex">
        <h1 className="heading">
          Share <br /> valuable resources
        </h1>
        <p className="text_para">
          Now you can connect with fellow <br />
          traders around the world.
        </p>
        <div className="scale-125 self-end p-10">
          <img src="/assets/imgs/form_background_2.png" alt="" />
        </div>
        <div className="absolute left-0 hidden xl:block">
          <img src="/assets/imgs/distract_line.png" alt="" />
        </div>
      </div>

      <div className="animate-swipe-up flex h-screen w-full flex-col items-center gap-8 p-8 lg:w-[40%]">
        <h1 className="text-[#6F4D58]">DashDah.</h1>
        <div className="space-y-6 text-center">
          <h2 className="heading">Sign In</h2>
          <p className="text_para">Sign in to get started</p>
        </div>
        <FormAuth<LoginData>
          inputs={inputs}
          btn="Sign In"
          data={data}
          sendData={handleLogin}
        />
        <p className="text-[18px] text-[#5C5C5C] select-none">
          Don't have an account?{" "}
          <span className="cursor-pointer text-[#B87E8E] underline">
            <Link to={"/auth/signup"}>join</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
