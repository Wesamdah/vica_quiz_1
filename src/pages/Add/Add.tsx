import { toast } from "react-toastify";
import { instance } from "../../api/axiosinstance";
import ItemForm from "../../components/ItemForm/ItemForm";
import type { ItemsDataToSend } from "../../types/items";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../context/LoadingContext";

export default function Add() {
  const { setLoading } = useLoading();
  const navigate = useNavigate();
  const handleCreate = async (data: ItemsDataToSend) => {
    setLoading(true);
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("price", data.price);

      if (data.image) {
        formData.append("image", data.image);
      }

      const response = await instance.post("/items", formData);
      toast.success("Item has been created");
      setLoading(false);
      setTimeout(() => {
        navigate("/");
      }, 3100);
    } catch (error) {
      setLoading(false);
      toast.error("Item didn't create");
    }
  };

  return <ItemForm sendData={handleCreate} />;
}
