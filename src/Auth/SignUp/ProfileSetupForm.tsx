import { Icon } from "@iconify/react/dist/iconify.js";
import type { SigupData } from "../../types/auth";
import type { InputType } from "../../types/form";
import FormAuth from "../../components/AuthForm/AuthForms";
import type { Dispatch, RefObject, SetStateAction } from "react";

const inputs: Array<InputType> = [
  {
    label: [
      "/assets/imgs/mini_avatar/default_avatar.png",
      "/assets/imgs/mini_avatar/camer_icon.png",
    ],
    type: "file",
    id: "profile_image",
  },
  {
    label: "User Name ",
    type: "text",
    placeholder: "Example Name",
    id: "user_name",
  },
];

interface Props {
  setCount: Dispatch<SetStateAction<number>>;
  sendData: () => void;
  data: RefObject<SigupData>;
}

export default function ProfileSetupForm({ setCount, sendData, data }: Props) {
  return (
    <>
      <div className="flex cursor-pointer items-center justify-center self-start rounded-full bg-[#F6F6F6]">
        <Icon
          icon="material-symbols-light:keyboard-arrow-left"
          onClick={() => setCount((prev) => prev - 1)}
          className="text-5xl"
        />
      </div>
      <h1 className="heading self-start">Set up your profile</h1>
      <p className="text_para self-start">
        Add a nice headshot of you and a name to blend in!
      </p>
      <FormAuth<SigupData>
        inputs={inputs}
        btn="Set up profile"
        // setData={setData}
        sendData={sendData}
        data={data}
      >
        <p className="text_para">Name should not be more than 15 characters</p>
      </FormAuth>
    </>
  );
}
