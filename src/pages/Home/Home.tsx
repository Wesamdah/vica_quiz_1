import { useContext } from "react";
import { ItemsContext } from "../mainLayout/Root";

export default function Home() {
  const { items } = useContext(ItemsContext);
  const featuredGears = items.slice(0, 4);
  return (
    <>
      <div className="flex w-full flex-col bg-[#ffcad4] p-4 lg:h-120 lg:flex-row dark:bg-[#1E1E1E]">
        <div className="flex h-full w-full flex-col items-start text-[#B87E8E] lg:w-1/2 dark:text-[#B0B0B0]">
          <p className="text-[30px] font-bold md:text-[60px] lg:text-[100px]">
            EXPLORE{" "}
          </p>
          <p className="text-[20px] md:text-[40px] lg:text-[60px]">
            THE NEW FANTASY WORLD{" "}
          </p>
        </div>
        <div className="flex h-full w-full justify-end px-10 lg:w-1/2">
          <div className="flex h-full w-full justify-end">
            <img
              src="/assets/imgs/Lady with pencil.png"
              alt=""
              className="max-h-1/2 max-w-1/2 lg:max-h-full lg:max-w-full"
            />
          </div>
        </div>
      </div>

      <div className="container my-5 h-fit">
        <h2 className="text-4xl font-bold text-[#B87E8E] dark:text-[#B0B0B0]">
          Featured Gears
        </h2>
        <div className="my-5 grid h-fit grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredGears.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-start rounded-2xl border border-[#eee] bg-[#FBFBFB] p-4 dark:bg-[#222222]"
            >
              {" "}
              <h2 className="text-lg text-[#B87E8E] md:text-2xl lg:text-3xl dark:text-[#E4E4E4]">
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
              <div className="flex h-40 w-full justify-end">
                <img
                  src={item.image_url}
                  alt=""
                  className="h-full max-w-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex w-full flex-col bg-[#d6e2e9] p-4 lg:h-120 lg:flex-row">
        {/*  */}
        <div className="flex h-full w-full justify-end px-10 lg:relative lg:w-1/2">
          <div className="z-40 h-full w-full scale-115 lg:absolute lg:-top-4 lg:left-20">
            <img
              src="/assets/imgs/vision.png"
              alt=""
              className="max-h-1/2 max-w-1/2 lg:max-h-full lg:max-w-full"
            />
          </div>
        </div>

        <div className="flex w-full flex-col items-end p-4 sm:p-6 lg:w-1/2 lg:p-8">
          <div className="my-10 mb-10 flex w-full flex-col gap-6 sm:flex-row sm:gap-8 lg:gap-10">
            <div className="flex w-full flex-col items-end justify-evenly border-b-2 border-red-500 pr-4 sm:w-1/2 sm:border-r-4 sm:border-b-0">
              <p className="text-end text-3xl sm:text-4xl xl:text-8xl">BRING</p>
              <p className="text-end text-lg sm:text-xl xl:text-4xl">
                REAL WORLD
              </p>
            </div>

            <div className="flex w-full flex-col justify-evenly text-start sm:w-1/2 sm:text-left">
              <p className="text-lg sm:text-2xl xl:text-4xl">VISUAL VALUES </p>
              <p className="text-4xl sm:text-5xl xl:text-8xl">TO</p>
            </div>
          </div>

          <p className="text-justify text-sm sm:text-justify sm:text-base lg:text-lg">
            Stay focused on the fight or lost in meditation with built-in
            speakers that deliver cinematic 3D positional audio. Watch as a
            living, breathing game world comes alive all around you.
          </p>
        </div>
      </div>
    </>
  );
}
