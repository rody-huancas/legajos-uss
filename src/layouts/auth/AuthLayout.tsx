import { Navigate, Outlet } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import AuthBGLayout from "./AuthBGLayout";
import { useAuthStore } from "@store/auth/auth.store";

/* Styles of swiper */
import "swiper/swiper-bundle.css";

const AuthLayout = () => {
  const authStatus = useAuthStore(state => state.status);

  if(authStatus === 'authorized') return <Navigate to="/" />
  
  return (
    <AuthBGLayout>
      <div className="flex items-center justify-center h-screen px-7 xl:px-0">
        <div className="flex md:w-[65%] w-full xl:h-[75%] py-20 xl:py-0 bg-white shadow-lg rounded-xl z-20">
          <div className="hidden xl:block w-1/2 bg-gray-900 rounded-l-xl">
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              pagination={{
                clickable: true,
                bulletClass: "swiper-pagination-bullet",
                bulletActiveClass: "swiper-pagination-bullet-active",
              }}
              modules={[Autoplay, Pagination]}
              className="mySwiper h-full rounded-l-xl"
            >
              <SwiperSlide>
                <div className="relative h-full">
                  <img
                    src="https://www.aulauss.edu.pe/pluginfile.php/1/theme_snap/slide_one_image/1733859758/462478134_504696089141679_1702565193176523526_n.jpg"
                    alt="Slide 1"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10"></div>
                  <div className="absolute bottom-20 left-0 right-0 p-4 text-white">
                    <h2 className="text-2xl font-bold mb-2">
                      Título del Slide 1
                    </h2>
                    <p className="text-sm">
                      Descripción del Slide 1. Aquí puedes agregar más detalles
                      sobre la imagen.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="relative h-full">
                  <img
                    src="https://www.aulauss.edu.pe/pluginfile.php/1/theme_snap/slide_three_image/1733859758/WhatsApp%20Image%202024-05-24%20at%209.30.36%20AM.jpeg"
                    alt="Slide 2"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                  <div className="absolute bottom-20 left-0 right-0 p-4 text-white">
                    <h2 className="text-2xl font-bold mb-2">
                      Título del Slide 2
                    </h2>
                    <p className="text-sm">
                      Descripción del Slide 2. Aquí puedes agregar más detalles
                      sobre la imagen.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>

          <div className="xl:w-1/2 w-full flex items-center justify-center">
            <div className="max-w-lg w-full px-6">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </AuthBGLayout>
  );
};

export default AuthLayout;
