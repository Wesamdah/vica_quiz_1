import { Link } from "react-router-dom";
import type { SigupData } from "../../types/auth";
import type { InputType } from "../../types/form";
import FormAuth from "../../components/AuthForm/AuthForms";
import type { Dispatch, RefObject, SetStateAction } from "react";

const mini_avatars = [
  "/assets/imgs/mini_avatar/avatar_1.png",
  "/assets/imgs/mini_avatar/avatar_2.png",
  "/assets/imgs/mini_avatar/avatar_3.png",
  "/assets/imgs/mini_avatar/avatar_4.png",
  "/assets/imgs/mini_avatar/avatar_5.png",
  "/assets/imgs/mini_avatar/avatar_6.png",
  "/assets/imgs/mini_avatar/avatar_7.png",
  "/assets/imgs/mini_avatar/avatar_8.png",
];

const inputs: Array<InputType> = [
  {
    label: "first name ",
    type: "text",
    placeholder: "example",
    id: "first_name",
  },
  {
    label: "last name ",
    type: "text",
    placeholder: "example",
    id: "last_name",
  },
  {
    label: "email ",
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
  {
    label: "Confirm Password ",
    type: "password",
    placeholder: "********",
    id: "password_confirmation",
  },
];

interface Props {
  setCount: Dispatch<SetStateAction<number>>;
  data: RefObject<SigupData>;
}

export default function JoinForm({ data, setCount }: Props) {
  return (
    <>
      <h1 className="text-[#6F4D58]">DashDah.</h1>
      <div className="flex w-full grow-1 flex-col items-center space-y-2">
        <h2 className="heading">Join DashDah.</h2>
        <div className="flex space-x-[-12px]">
          {mini_avatars.map((avatar, index) => (
            <img key={index} src={avatar} className={`z-[${index}]`} />
          ))}
        </div>
        <p className="text_para">Join these and 5005 other traders</p>
        <FormAuth<SigupData>
          inputs={inputs}
          btn="Join"
          data={data}
          setCount={setCount}
          counter={2}
        />

        <p className="text-sm text-[#5C5C5C] select-none text-[18px]">
          Joined Already?
          <span className="cursor-pointer text-[#B87E8E] underline">
            <Link to={"/auth/login"}> Sign in</Link>
          </span>
        </p>
      </div>
    </>
  );
}
