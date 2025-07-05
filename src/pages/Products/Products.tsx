import { Icon } from "@iconify/react/dist/iconify.js";
import {
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
  useRef,
} from "react";
import { ItemsContext } from "../mainLayout/Root";
import type { ItemsData } from "../../types/items";
import { instance } from "../../api/axiosinstance";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

export default function Products() {
  const navigate = useNavigate();
  const effectRan = useRef(false);
  const { items, setItems } = useContext(ItemsContext);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [filterdItems, setFilteredItems] = useState<Array<ItemsData>>(items);
  const itemsPerPage = 8;
  const numberOfPage = Math.ceil(filterdItems.length / itemsPerPage);
  const showNumber = Array.from({ length: numberOfPage }, (_, index) => (
    <p
      key={index}
      onClick={() => setPageNumber(index)}
      className="cursor-pointer text-xl"
    >
      {index + 1}
    </p>
  ));

  const itemsPagination = filterdItems.slice(
    pageNumber * itemsPerPage,
    (pageNumber + 1) * itemsPerPage,
  );

  const handelDelete = async (id: number) => {
    try {
      const response = await instance.delete(`/items/${id}`);
      console.log(response);
      toast.success(" Item has been deleted");
      const newItems = await instance.get("/items");
      setItems(newItems.data);
      setTimeout(() => {
        setPageNumber(0);
      }, 3100);
    } catch (error) {
      console.log(error);
      toast.error(" Failed to delete the item");
    }
  };

  useEffect(() => {
    setFilteredItems(
      items.filter((item) =>
        item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
      ),
    );
  }, [search, items]);

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     toast.warning("Kindly Login Before");
  //     navigate("/");
  //     effectRan.current = true;
  //   }
  // }, []);

  return (
    <div className="h-fit w-full">
      {/* search bar */}
      <div className="flex h-10 w-full items-center px-8">
        <div className="relative mx-auto h-full w-35 max-w-100 rounded-2xl duration-500 sm:w-60 md:w-full md:hover:max-w-[80%] lg:hover:max-w-200">
          <Icon
            icon={"icon-park-outline:search"}
            className="absolute top-3 left-2"
          />
          <input
            type="text"
            placeholder={`Enter Item Name`}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            className="absolute h-full w-full rounded-2xl border border-red-300 px-10 py-4 text-[18px] outline-none focus:outline-none"
          />
        </div>
        <button className="cursor-pointer rounded-xl bg-[#5bc8af] px-4 py-2 text-lg font-bold text-white hover:opacity-80">
          <Link to={"/products/create"}>Create Item</Link>
        </button>
      </div>
      <div className="mt-5 flex w-full items-center justify-center gap-5">
        <button
          onClick={() => setPageNumber((prev) => Math.max(prev - 1, 0))}
          className="cursor-pointer rounded-2xl bg-[#ffccd5] px-4 py-2 text-xl font-bold text-white dark:bg-[#222222]"
        >
          Prev
        </button>
        {showNumber.map((number) => number)}
        <button
          onClick={() =>
            setPageNumber((prev) => Math.min(prev + 1, numberOfPage - 1))
          }
          className="cursor-pointer rounded-2xl bg-[#ffccd5] px-4 py-2 text-xl font-bold text-white dark:bg-[#222222]"
        >
          Next
        </button>
      </div>

      {/* show items */}
      <div className="h-[calc(100%_-_40px)] w-full p-5">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {itemsPagination.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-start rounded-2xl border border-[#eee] bg-[#FBFBFB] p-4 dark:bg-[#222222]"
            >
              <h2 className="text-lg text-[#B87E8E] md:text-2xl lg:text-3xl dark:text-white">
                {item.name}
              </h2>
              <p className="text_para">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Inventore at iure hic eveniet accusamus dolore, recusandae
                assumenda quae cum, eaque cupiditate ipsa a nesciunt. Optio est
                et libero aspernatur culpa.
              </p>
              <p className="mt-2 text-2xl font-bold text-[#B87E8E] dark:text-white">
                {item.price}$
              </p>
              <div className="flex h-40 w-full justify-between">
                <div className="flex w-1/3 flex-col justify-evenly p-2 text-lg font-bold text-white">
                  <button className="cursor-pointer rounded-xl bg-[#93e1d8] px-4 py-2 hover:opacity-80">
                    <Link to={"/products/" + item.id}> Edit</Link>
                  </button>
                  <button
                    onClick={() => handelDelete(item.id)}
                    className="cursor-pointer rounded-xl bg-[#d81159] px-4 py-2 hover:opacity-80"
                  >
                    Delete
                  </button>
                </div>
                <img
                  src={item.image_url}
                  alt=""
                  className="h-full w-2/3 max-w-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
