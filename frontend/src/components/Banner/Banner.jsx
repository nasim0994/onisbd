import { useGetBannerQuery } from "../../Redux/banner/banner";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

export default function Banner() {
  const { data } = useGetBannerQuery();
  const banner = data?.data;

  return (
    <section className="py-5 sm:py-7">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-center">
          <div>
            <h2 className="text-3xl sm:text-5xl text-primary font-bold">
              {banner?.title}
            </h2>
            <p className="sm:mt-4 text-lg sm:text-xl font-medium">
              {banner?.description}
            </p>

            <div className="mt-8">
              <a
                href="#order"
                className="bg-primary text-base-100 px-4 py-2 rounded"
              >
                Click to order
              </a>
            </div>
          </div>

          <div className="-order-1 md:order-1">
            <Swiper
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={true}
              modules={[Autoplay, Pagination]}
              loop={true}
              grabCursor={true}
            >
              {banner?.galleries?.map((gallery) => (
                <SwiperSlide key={gallery?._id}>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/banner/${
                      gallery?.url
                    }`}
                    alt={gallery?.title}
                    className="w-full h-60 sm:h-[430px] object-cover rounded hover:cursor-grab"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
