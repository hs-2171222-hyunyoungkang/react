import React from 'react'
import { Link } from 'react-router-dom'
import {Swiper, SwiperSlide} from 'swiper/react';
import SwipeCore,{Navigation,Pagination,Autoplay} from 'swiper';

import 'swiper/css';
import 'swiper/css/autoplay'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'


SwipeCore.use([Navigation,Pagination,Autoplay])

export default function home() {



  return (
    <div className='page-container' style={{fontSize:'32pxs'}}>
   
      <div className = "link-container" style={{marginTop:'30px'}}>
        <Link className = "Link-Nav" to="/alcohol">술</Link>
        <Link className = "Link-Nav" to = "/review"> 리뷰 </Link>
        <Link className = "Link-Nav" to ="/menu"> 메뉴 </Link>
      </div>
      <div>
        <Swiper
          className = "home-banner"
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{clickable : true}}
          autoplay= {{delay:2000}}>
            <SwiperSlide>
              <img className = "home-img" src = "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F8WQ5N%2Fbtshy5kxPYn%2FVJqr5MTjba7vLROZucajuk%2Fimg.png" alt="이미지다!!! "></img>
            </SwiperSlide>
            <SwiperSlide>
              <img className='home-img' src ="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F1J1Il%2FbtshzBDtGf9%2F6h8SzcjwurvggUYcRO7UaK%2Fimg.png"></img>
            </SwiperSlide>
            <SwiperSlide>
              <img className = 'home-img' src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F3Rru3%2FbtshBmSUExv%2FRLgXbEOZhK4KVvs5TqsBKK%2Fimg.png"></img>
            </SwiperSlide>

        </Swiper>
      </div>
    </div>

  )
}