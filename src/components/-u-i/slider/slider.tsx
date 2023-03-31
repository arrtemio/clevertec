import React, { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';

import './slider.scss';

import NoCover from '../../../static/assets/covers/no_cover_full.png';

interface ImagesProps {
  url: string;
}

interface SliderProps {
  images: ImagesProps[] | null;
}

export const Slider: React.FC<SliderProps> = ({images}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any |null>(null);

  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper: null }}
        modules={[FreeMode, Navigation, Thumbs, Pagination]}
        className="mySwiper2"
        data-test-id='slide-big'
        pagination={true}
      >
        { images ?
          images.map(img =>
          <SwiperSlide key={img.url}>
            <div className='wrapper_big'>
              <img src={`https://strapi.cleverland.by${img.url}`} alt='BookCover' />
            </div>
          </SwiperSlide>
        ) :
          (<SwiperSlide>
            <img src={NoCover} alt='NoCover' />
          </SwiperSlide>)
        }
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs, Pagination]}
        className={images?.length === 1 || !images ? 'hidden' : 'mySwiper'}
      >
        { images ?
          images.map(img =>
          <SwiperSlide data-test-id='slide-mini' key={img.url}>
            <div className='wrapper'>
              <img src={`https://strapi.cleverland.by${img.url}`} alt='BookCover' />
            </div>
          </SwiperSlide>
        ) :
          null
        }
      </Swiper>
    </>
  );
}

