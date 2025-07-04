import {
  useState,
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
  type JSX,
  type ReactNode,
  type RefObject,
  type SetStateAction,
} from "react";
import type { InputType } from "../../types/form";
import FileInput from "./inputs/FileInput";
import TextInput from "./inputs/TextInput";
import { useLoading } from "../../context/LoadingContext";
import Spiner from "../Animation/Spiner";

interface Props<T> {
  inputs: Array<InputType>;
  btn: string | JSX.Element;
  children?: ReactNode;
  sendData?: () => void;
  setCount?: Dispatch<SetStateAction<number>>;
  counter?: number;
  data: RefObject<T>;
}

export default function FormAuth<T>({
  inputs,
  btn,
  children,
  setCount,
  sendData,
  counter,
  data,
}: Props<T>) {
  const [userImage, setUserImage] = useState<string | null>(null);

  const { loading } = useLoading();

  const handleChange: (event: ChangeEvent<HTMLInputElement>) => void = (
    event,
  ) => {
    const { value, id, files } = event.target;

    const newVale = files ? files[0] : value;

    data.current = { ...data.current, [id]: newVale };

    if (files && files[0]) {
      setUserImage(URL.createObjectURL(files[0]));
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (sendData) sendData();

    if (setCount && typeof counter === "number") {
      setCount((prev) => (prev < counter ? prev + 1 : prev));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full grow-1 flex-col gap-5">
      {inputs.map((input, index) =>
        input.type === "file" ? (
          <FileInput
            key={index}
            userImage={userImage || input.label[0]}
            input={input}
            handleChange={handleChange}
          />
        ) : (
          <TextInput key={index} input={input} handleChange={handleChange} />
        ),
      )}

      {children}
      <button
        type="submit"
        disabled={loading}
        className="cursor-pointer rounded-lg bg-[#B87E8E] p-4 text-lg text-white hover:opacity-80 disabled:cursor-default disabled:opacity-80"
      >
        {loading ? <Spiner /> : btn}
      </button>
    </form>
  );
}
