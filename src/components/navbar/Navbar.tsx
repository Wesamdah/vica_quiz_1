import { Link, NavLink, useNavigate } from "react-router-dom";
import type { UserData } from "../../types/user";
import { useState, type Dispatch, type SetStateAction } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { instance } from "../../api/axiosinstance";

const links: Array<{ display: string; url: string }> = [
  {
    display: "Products",
    url: "/products",
  },
  {
    display: "Favorites",
    url: "/favorites",
  },
  {
    display: "Order Lists",
    url: "/order-lists",
  },
];

interface Props {
  user: UserData;
  mode: boolean;
  setMode: Dispatch<SetStateAction<boolean>>;
}

export default function Navbar({ user, mode, setMode }: Props) {
  const navigate = useNavigate();
  const [isMenuActive, setIsMenuActive] = useState<boolean>(false);
  const handleLogout = async () => {
    try {
      await instance.post("logout");
      localStorage.removeItem("token");
      localStorage.removeItem("user_info");
      navigate("/auth/login");
    } catch (error) {}
  };
  return (
    <div className="container flex items-center justify-between">
      <div className="flex items-center justify-start">
        <div className="h-8 w-8 md:h-15 md:w-15">
          <img src="/assets/imgs/logo.png" alt="" className="" />
        </div>
        <p className="text-xl text-[#B87E8E] md:text-4xl">
          <Link to="/">DashDah</Link>
        </p>
      </div>

      <div
        className={`fixed top-0 right-0 z-50 h-screen ${isMenuActive ? "w-1/2" : "w-0"} overflow-hidden bg-[#eee] duration-500 lg:static lg:h-fit lg:w-fit lg:bg-white`}
      >
        <Icon
          icon={"line-md:arrow-close-right"}
          onClick={() => setIsMenuActive(false)}
          className="z-50 m-4 ml-auto block cursor-pointer text-4xl text-red-400 lg:hidden"
        />
        <ul className="text_para flex h-screen w-full flex-col items-center justify-center gap-4 lg:h-fit lg:w-fit lg:flex-row lg:justify-between">
          {links.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.url}
                className={({ isActive }) =>
                  isActive
                    ? "font-bold text-[#B87E8E]"
                    : "hover:font-bold hover:text-[#B87E8E]"
                }
                onClick={() => setIsMenuActive(false)}
              >
                {link.display}
              </NavLink>
            </li>
          ))}
          <button
            onClick={handleLogout}
            className="blovk mt-10 cursor-pointer rounded-xl bg-[#B87E8E] px-4 py-2 text-white hover:opacity-80 lg:hidden"
          >
            Logout
          </button>
          <Icon
            key={mode === true ? "moon" : "light"}
            icon={mode === true ? "material-symbols:moon-stars" : "twemoji:sun"}
            onClick={() => setMode(!mode)}
            className="animate-mode-up block text-4xl lg:hidden"
          />
        </ul>
      </div>

      {user ? (
        <div className="flex items-center justify-between gap-6">
          <div className="text_para flex flex-col">
            <p className="text-[14px] md:text-[20px]">
              {user.first_name} {user.last_name}
            </p>
            <p className="text-[14px] md:text-[20px]"> {user.user_name}</p>
          </div>
          <div className="h-8 w-8 rounded-full md:h-10 md:w-10">
            <img
              src={user.profile_image_url}
              alt=""
              className="h-full w-full rounded-full"
            />
          </div>
          <button
            onClick={handleLogout}
            className="hidden cursor-pointer rounded-xl bg-[#B87E8E] px-4 py-2 text-white hover:opacity-80 lg:block"
          >
            Logout
          </button>
          <Icon
            icon={"line-md:close-to-menu-alt-transition"}
            onClick={() => setIsMenuActive(true)}
            className="block cursor-pointer text-3xl lg:hidden"
          />
        </div>
      ) : (
        <button className="hidden cursor-pointer rounded-xl bg-[#B87E8E] px-4 py-2 text-white hover:opacity-80 lg:block">
          <Link to={"/auth/login"} className="h-full w-full rounded-xl">
            Signin
          </Link>
        </button>
      )}
      <Icon
        key={mode === true ? "moon" : "light"}
        icon={mode === true ? "material-symbols:moon-stars" : "twemoji:sun"}
        onClick={() => setMode(!mode)}
        className="animate-mode-up hidden text-4xl lg:block"
      />
    </div>
  );
}
