import { Icon } from "@iconify/react/dist/iconify.js";
import type { ItemsData, ItemsDataToSend } from "../../types/items";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { useLoading } from "../../context/LoadingContext";
import Spiner from "../Animation/Spiner";

interface Props {
  item?: ItemsData;
  sendData: (data: ItemsDataToSend) => void;
}

export default function ItemForm({ item, sendData }: Props) {
  const { loading } = useLoading();
  const [itemImage, setImage] = useState<string>("");
  const itemData = useRef<ItemsDataToSend>({} as ItemsDataToSend);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, files } = e.target;

    itemData.current = {
      ...itemData.current,
      [id]: type === "file" ? files?.[0] : value,
    };

    if (files) {
      setImage(URL.createObjectURL(files[0]));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    sendData(itemData.current);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-130 w-full flex-col p-4 md:h-115"
    >
      <div className="flex h-100 w-full flex-col md:h-70 md:flex-row">
        <div className="flex h-1/2 w-full flex-col justify-center gap-3 p-6 outline-none md:h-full md:w-1/2">
          <label htmlFor="name">Item Name</label>
          <input
            defaultValue={item && item.name}
            type="text"
            name="name"
            id="name"
            placeholder="name"
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-500 px-4 py-2 outline-none focus:outline-none"
          />
          <label htmlFor="price">Item Price</label>
          <input
            defaultValue={item && item.price}
            type="number"
            name="price"
            id="price"
            placeholder="price"
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-500 px-4 py-2 outline-none focus:outline-none"
          />
        </div>
        <div className="h-1/2 w-full md:h-full md:w-1/2">
          <label htmlFor="image" className="h-full w-full">
            {itemImage ? (
              <div className="flex h-full w-full flex-col items-center justify-center gap-5 rounded-2xl border border-[#ddd]">
                <img src={itemImage} alt="" className="max-h-full max-w-full" />
              </div>
            ) : item ? (
              <div className="flex h-full w-full flex-col items-center justify-center gap-5 rounded-2xl border border-[#ddd]">
                <img
                  src={item.image_url}
                  alt=""
                  className="max-h-full max-w-full"
                />
              </div>
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-5 rounded-2xl border border-[#ddd]">
                <Icon icon={"hugeicons:image-upload"} className="text-8xl" />
                <p className="text-2xl sm:text-4xl">Upload Item Image</p>
              </div>
            )}
          </label>
          <input
            type="file"
            id="image"
            name="image"
            className="hidden"
            onChange={handleChange}
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="mx-auto mt-10 w-1/2 cursor-pointer rounded-2xl bg-[#0a9396] px-4 py-4 font-bold text-white hover:opacity-80 disabled:cursor-default disabled:opacity-80"
      >
        {loading ? <Spiner /> : item ? "Update" : "Create"}
      </button>
    </form>
  );
}
