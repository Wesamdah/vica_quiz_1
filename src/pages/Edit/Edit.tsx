import { useParams, useNavigate } from "react-router-dom";
import ItemForm from "../../components/ItemForm/ItemForm";
import { useContext, useEffect, useState } from "react";
import type { ItemsData, ItemsDataToSend } from "../../types/items";
import { ItemsContext } from "../mainLayout/Root";

import { instance } from "../../api/axiosinstance";
import { toast } from "react-toastify";
import { useLoading } from "../../context/LoadingContext";

export default function Edit() {
  const { setLoading } = useLoading();
  const navigate = useNavigate();
  const { id } = useParams();
  const { items, setItems } = useContext(ItemsContext);
  const [selectedItem, setSelectedItem] = useState<ItemsData>({} as ItemsData);

  const handleUpdate = async (data: ItemsDataToSend) => {
    console.log(data);
    setLoading(true);
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("price", data.price);

      if (data.image) {
        formData.append("image", data.image);
      }
      formData.append("_method", "PUT");

      await instance.post("/items/" + id, formData, {});
      const newItems = await instance.get("/items");
      setItems(newItems.data);
      toast.success("Item has been Updated");
      setLoading(false);
      setTimeout(() => {
        navigate("/products");
      }, 3100);
    } catch (error) {
      setLoading(false);
      toast.error("Item didn't Update");
    }
  };

  useEffect(() => {
    const item = items.find((item) => item.id.toString() === id);
    if (item) {
      setSelectedItem(item);
    } else {
      navigate("/products");
    }
  }, []);

  return <ItemForm item={selectedItem} sendData={handleUpdate} />;
}
