import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import type { UserData } from "../../types/user";
import { useEffect, useState, createContext, useRef } from "react";
import { instance } from "../../api/axiosinstance";
import type { ItemsData } from "../../types/items";

interface ItemsContext {
  items: Array<ItemsData>;
  setItems: React.Dispatch<React.SetStateAction<Array<ItemsData>>>;
}

export const ItemsContext = createContext<ItemsContext>({
  items: [],
  setItems: () => {},
});

export default function Root() {
  const user_info = localStorage.getItem("user_info");
  const user: UserData = user_info && JSON.parse(user_info);
  const calledOnce = useRef(false);

  const [items, setItems] = useState<Array<ItemsData>>([
    {
      id: 0,
      name: "",
      price: "",
      image_url: "",
    },
  ]);

  const [mode, setMode] = useState<boolean>(false);

  useEffect(() => {
    if (calledOnce.current) return;
    calledOnce.current = true;

    const getAllItems = async () => {
      try {
        const response = await instance.get("/items");
        setItems(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllItems();
  }, []);

  return (
    <div className={`h-screen w-screen ${mode ? "dark" : ""}`}>
      <Navbar user={user} mode={mode} setMode={setMode} />
      <div className="no-scrollbar h-[calc(100vh_-_92px)] w-full overflow-y-scroll md:h-[calc(100vh_-_110px)]">
        <ItemsContext.Provider value={{ items, setItems }}>
          <Outlet />
        </ItemsContext.Provider>
        <Footer />
      </div>
    </div>
  );
}
