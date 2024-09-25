'use client'

import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { ChevronUp, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const days = [
  { 
    id: 'day1', 
    name: '10월 4일',
    flight: { departure: '09:50 AM', arrival: '11:00 AM' },
    accommodation: { name: '노블피아 호텔', address: '제주 서귀포시 명동로 46', image: '/images/voucher_20241004.png' },
    schedule: [
      { time: '08:30', activity: '공항 도착 및 체크인' },
      { time: '09:00', activity: '아침 식사' },
      { time: '11:00', activity: '제주 도착' },
      { time: '12:00', activity: '렌터카' },
      { time: '13:00', activity: '점심 식사' },
      { time: '14:00', activity: '관광 및 숙소 이동' },
      { time: '16:00', activity: '숙소 체크인' },
      { time: '18:00', activity: '저녁 식사' },
      { time: '20:00', activity: '시장 구경(야식, 기념품)' }
    ],
    restaurants: { 
      lunch: [
        { name: '장수물식당', image: '/images/20241004_lunch_1.jpg', description: '고기국수', url: 'https://m.place.naver.com/restaurant/11864763/location?filter=location&selected_place_id=11864763' },
        { name: '화성식당', image: '/images/20241004_lunch_2.jpg', description: '접짝뼈국', url: 'https://m.place.naver.com/restaurant/32156714/location?filter=location&selected_place_id=32156714' }
      ],
      dinner: [
        { name: '맛집 3', image: '/images/dinner1.png', description: '해산물 요리', url: '' },
      ],
      snack: [
        { name: '기흥어물', image: '/images/20241004_dinner_1.jpg', description: '회 포장', url: 'https://naver.me/xeA05e5J' },
        { name: '마농치킨', image: '/images/20241004_dinner_2.jpg', description: '치킨', url: 'https://naver.me/5020Uwu8' },
        { name: '마농토스트', image: '/images/20241004_dinner_3.jpg', description: '토스트', url: 'https://naver.me/F9NuF0KG' },
      ],
    },
    attractions: [
      { name: '한라산 국립공원', image: '/images/hallasan.jpg', description: '제주의 가장 높은 산, 자연경관을 즐길 수 있는 명소', url: 'https://naver.com' },
      { name: '성산일출봉', image: '/images/seongsan.jpg', description: '일출을 보기 좋은 곳, 유네스코 세계자연유산', url: 'https://naver.com' }
    ],
    sections: ['flight', 'accommodation', 'schedule', 'restaurants', 'attractions']
  },
  { 
    id: 'day2', 
    name: '10월 5일',
    accommodation: { name: '제주성산골든튤립호텔', address: '제주 서귀포시 성산읍 일출로 31', image: '/images/voucher_20241005.png' },
    schedule: [
      { time: '10:00', activity: '아침 식사' },
      { time: '11:00', activity: '성산일출봉 이동' },
      { time: '13:00', activity: '관광 및 점심 식사' },
      { time: '14:00', activity: '우도 관광' },
      { time: '18:00', activity: '숙소 체크인' },
      { time: '19:00', activity: '저녁 식사' }
    ],
    restaurants: { 
      lunch: [
        { name: '맛집 3', image: '/images/lunch3.png', description: '현지 식당', url: '' },
      ],
      dinner: [
        { name: '맛집 4', image: '/images/dinner2.png', description: '제주 전통 요리', url: '' },
      ],
      snack: [
        { name: '맛집 5', image: '/images/snack2.png', description: '야식 추천', url: '' },
      ],
    },
    sections: ['accommodation', 'schedule', 'restaurants']
  },
  { 
    id: 'day3', 
    name: '10월 6일',
    flight: { departure: '19:50 PM', arrival: '21:05 PM' },
    schedule: [
      { time: '10:00', activity: '아침 식사' },
      { time: '11:00', activity: '만장굴 이동' },
      { time: '13:00', activity: '관광 및 점심 식사' },
      { time: '14:00', activity: '함덕해수욕장 구경' },
      { time: '19:00', activity: '저녁 식사' },
      { time: '19:00', activity: '렌터카 반납' },
      { time: '19:00', activity: '공항 도착 및 체크인' },
      { time: '19:00', activity: '서울 도착' }
    ],
    restaurants: { 
      lunch: [
        { name: '맛집 6', image: '/images/lunch6.png', description: '점심 장소', url: '' },
      ],
      dinner: [
        { name: '맛집 7', image: '/images/dinner3.png', description: '해물요리', url: '' },
      ],
      snack: [
        { name: '맛집 8', image: '/images/snack3.png', description: '추천 야식', url: '' },
      ],
    },
    sections: ['flight', 'schedule', 'restaurants']
  },
]

export default function Component() {
  const [activeSection, setActiveSection] = useState(days[0].id)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showFlightImage, setShowFlightImage] = useState(false)
  const [showAccommodationImage, setShowAccommodationImage] = useState(false)
  const [showRestaurantPopup, setShowRestaurantPopup] = useState({ open: false, url: '' })
  const sectionRefs = useRef(days.map(() => React.createRef()))
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setShowScrollTop(scrollPosition > 200)

      const currentSection = days.find((day, index) => {
        const el = sectionRefs.current[index].current
        if (el) {
          const rect = el.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom > 100
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection.id)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (dayId) => {
    const index = days.findIndex(day => day.id === dayId)
    sectionRefs.current[index].current?.scrollIntoView({ behavior: 'smooth' })
  }
  
  const openRestaurantPopup = (url) => {
    setShowRestaurantPopup({ open: true, url })
  }
  
  const closeRestaurantPopup = () => {
    setShowRestaurantPopup({ open: false, url: '' })
  }

  const ScrollableGallery = ({ items, mealType }) => {
    const scrollContainerRef = useRef(null)
  
    const scroll = (direction) => {
      const container = scrollContainerRef.current
      if (container) {
        const scrollAmount = direction === 'left' ? -container.offsetWidth / 2 : container.offsetWidth / 2;
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      }
    }
  
    return (
      <div className="relative">
        <h3 className="text-xl font-semibold mb-4 text-amber-700">{mealType}</h3>
        <div className="flex items-center justify-between">
          <button
            onClick={() => scroll('left')}
            className="bg-white bg-opacity-50 rounded-full p-1 shadow-md"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4 text-amber-800" />
          </button>
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollSnapType: 'x mandatory', width: '100%' }}
          >
            {items.map((item, index) => (
              <div
                key={index}
                className="flex-none w-1/2 px-2 text-center relative rounded-lg border border-gray-300"
                style={{ minWidth: '50%' }}
              >
                <div className="absolute inset-0 rounded-lg overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg object-cover"
                    style={{ filter: 'blur(1px)', brightness: '100%' }}
                  />
                </div>

                <div className="relative z-10 p-2 rounded-lg">
                  <p className="mt-2 text-center text-base font-bold text-white">{item.name}</p>
                  <p className="text-xs text-gray-200 mt-1 h-8 overflow-hidden">{item.description}</p>
                  {item.url && (
                    <button
                      className="mt-2 bg-amber-500 text-white px-4 py-1 rounded text-xs hover:bg-amber-600 transition-colors mx-auto block"
                      onClick={() => openRestaurantPopup(item.url)}
                    >
                      지도 보기
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => scroll('right')}
            className="bg-white bg-opacity-50 rounded-full p-1 shadow-md"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4 text-amber-800" />
          </button>
        </div>
      </div>
    )
  }

  const ImagePopup = ({ isOpen, onClose, imageSrc, alt }) => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="bg-white rounded-lg p-2 relative max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <Image
              src={imageSrc}
              alt={alt}
              width={400}
              height={600}
              className="rounded-lg w-full h-auto"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <div className="flex flex-col min-h-screen bg-amber-50">
      <main className="flex-1 overflow-y-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6 text-amber-800 text-center">제주 2박 3일 일정</h1>
        {days.map((day, index) => (
          <motion.section
            layout
            key={day.id}
            ref={sectionRefs.current[index]}
            className="mb-8 bg-white rounded-lg shadow-lg overflow-hidden"
            id={day.id}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5 }}
          >
            <div className="bg-amber-500 text-white p-2">
              <h2 className="text-2xl font-bold">{day.name}</h2>
            </div>
            <div className="p-6 space-y-6">
              {day.sections.includes('flight') && (
                <div className="bg-amber-50 rounded-lg p-4">
                  <div className="relative">
                    <h3 className="text-xl font-semibold text-amber-700">비행기</h3>
                    <button
                      onClick={() => setShowFlightImage(true)}
                      className="bg-amber-500 text-white px-2 py-1 rounded text-sm hover:bg-amber-600 transition-colors absolute right-0 top-0"
                    >
                      티켓
                    </button>
                  </div>
                  <p className="text-amber-800">
                    {day.flight?.departure} ~ {day.flight?.arrival}
                  </p>
                  <ImagePopup
                    isOpen={showFlightImage}
                    onClose={() => setShowFlightImage(false)}
                    imageSrc={day.flight.image || "/images/default-flight.png"} // 비행기 이미지
                    alt="비행기 이미지"
                  />
                </div>
              )}
              {day.sections.includes('accommodation') && (
                <div className="bg-amber-50 rounded-lg p-4">
                  <div className="relative">
                    <h3 className="text-xl font-semibold text-amber-700">숙소</h3>
                    <button
                      onClick={() => setShowAccommodationImage(true)}
                      className="bg-amber-500 text-white px-2 py-1 rounded text-sm hover:bg-amber-600 transition-colors absolute right-0 top-0"
                    >
                      확인
                    </button>
                  </div>
                  <p className="text-amber-800">이름: {day.accommodation?.name}</p>
                  <p className="text-amber-800">주소: {day.accommodation?.address}</p>
                  <ImagePopup
                    isOpen={showAccommodationImage}
                    onClose={() => setShowAccommodationImage(false)}
                    imageSrc={day.accommodation.image}
                    alt="숙소 이미지"
                  />
                </div>
              )}
              {day.sections.includes('schedule') && (
                <div className="bg-amber-50 rounded-lg p-4">
                  <h3 className="text-xl font-semibold mb-4 text-amber-700">일정</h3>
                  <ul className="space-y-4">
                    {day.schedule.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-16 font-medium text-amber-600">{item.time}</span>
                        <span>{item.activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {day.sections.includes('restaurants') && (
                <>
                  <ScrollableGallery items={day.restaurants.lunch} mealType="점심" />
                  <ScrollableGallery items={day.restaurants.dinner} mealType="저녁" />
                  <ScrollableGallery items={day.restaurants.snack} mealType="간식" />
                </>
              )}
              {day.sections.includes('attractions') && (
                <ScrollableGallery items={day.attractions} mealType="가볼만한곳" />
              )}
            </div>
          </motion.section>
        ))}
      </main>
      <nav className="fixed right-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center justify-center p-2 bg-amber-100 rounded-l-lg shadow-lg">
        {days.map((day) => (
          <button
            key={day.id}
            onClick={() => scrollToSection(day.id)}
            className={`w-2 h-16 mb-2 rounded-full transition-all relative group ${
              activeSection === day.id
                ? 'bg-amber-600'
                : 'bg-amber-300 hover:bg-amber-400'
            }`}
            aria-label={`Go to ${day.name}`}
          >
            <span className="sr-only">{day.name}</span>
            <AnimatePresence>
              {(activeSection === day.id || true) && (
                <motion.span 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className={`absolute left-full ml-2 bg-amber-200 text-amber-800 text-xs px-2 py-1 rounded whitespace-nowrap`}
                >
                  {day.name}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        ))}
      </nav>

      {/* Iframe Popup */}
      {showRestaurantPopup.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white p-4 w-full h-full max-w-4xl">
            <button
              onClick={closeRestaurantPopup}
              className="absolute top-2 right-2 text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative h-full p-4"> {/* 여백을 추가한 부분 */}
              <iframe
                src={showRestaurantPopup.url}
                className="w-full h-full rounded-lg border-2 border-gray-300"
                title="Restaurant Map"
              ></iframe>
            </div>
          </div>
        </div>
      )}
      
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-4 right-4 bg-amber-500 text-white p-3 rounded-full shadow-lg hover:bg-amber-600 transition-colors z-20"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
