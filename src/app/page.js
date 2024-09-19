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
    sections: ['flight', 'accommodation', 'schedule', 'restaurants', 'attractions']
  },
  { 
    id: 'day2', 
    name: '10월 5일',
    sections: ['accommodation', 'schedule', 'restaurants', 'attractions']
  },
  { 
    id: 'day3', 
    name: '10월 6일',
    sections: ['flight', 'schedule', 'restaurants', 'attractions']
  },
]

const restaurants = [
  { name: '맛집 1', image: '/placeholder.svg?height=200&width=300' },
  { name: '맛집 2', image: '/placeholder.svg?height=200&width=300' },
  { name: '맛집 3', image: '/placeholder.svg?height=200&width=300' },
  { name: '맛집 4', image: '/placeholder.svg?height=200&width=300' },
]

const attractions = [
  { name: '명소 1', image: '/placeholder.svg?height=200&width=300' },
  { name: '명소 2', image: '/placeholder.svg?height=200&width=300' },
  { name: '명소 3', image: '/placeholder.svg?height=200&width=300' },
  { name: '명소 4', image: '/placeholder.svg?height=200&width=300' },
]

export default function Component() {
  const [activeSection, setActiveSection] = useState(days[0].id)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showFlightImage, setShowFlightImage] = useState(false)
  const [showAccommodationImage, setShowAccommodationImage] = useState(false)
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

  const ScrollableGallery = ({ items }) => {
    const scrollContainerRef = useRef(null)

    const scroll = (direction) => {
      const container = scrollContainerRef.current
      if (container) {
        const scrollAmount = direction === 'left' ? -300 : 300
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      }
    }

    return (
      <div className="relative">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide space-x-4 pb-4"
        >
          {items.map((item, index) => (
            <div key={index} className="flex-none w-64">
              <Image
                src={item.image}
                alt={item.name}
                width={300}
                height={200}
                className="rounded-lg object-cover"
              />
              <p className="mt-2 text-center text-sm font-medium text-amber-800">{item.name}</p>
            </div>
          ))}
        </div>
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 shadow-md"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6 text-amber-800" />
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 shadow-md"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6 text-amber-800" />
        </button>
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
              height={300}
              className="rounded-lg w-full h-auto"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <div className="flex flex-col min-h-screen bg-amber-50">
      <main
        className="flex-1 overflow-y-auto px-4 py-6"
      >
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
                  <p className="text-amber-800">09:00 AM ~ 11:00 AM</p>
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
                  <p className="text-amber-800">호텔 이름: 그랜드 호텔</p>
                  <p className="text-amber-800">주소: 123 메인 스트리트, 서울</p>
                </div>
              )}
              {day.sections.includes('schedule') && (
                <div className="bg-amber-50 rounded-lg p-4">
                  <h3 className="text-xl font-semibold mb-4 text-amber-700">일정</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center">
                      <span className="w-16 font-medium text-amber-600">09:00</span>
                      <span>아침 식사</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-16 font-medium text-amber-600">11:00</span>
                      <span>관광지 방문</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-16 font-medium text-amber-600">13:00</span>
                      <span>점심 식사</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-16 font-medium text-amber-600">15:00</span>
                      <span>자유 시간</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-16 font-medium text-amber-600">19:00</span>
                      <span>저녁 식사</span>
                    </li>
                  </ul>
                </div>
              )}
              {day.sections.includes('restaurants') && (
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-amber-700">맛집</h3>
                  <ScrollableGallery items={restaurants} />
                </div>
              )}
              {day.sections.includes('attractions') && (
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-amber-700">가볼만한 곳</h3>
                  <ScrollableGallery items={attractions} />
                </div>
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
      <ImagePopup
        isOpen={showFlightImage}
        onClose={() => setShowFlightImage(false)}
        imageSrc="/placeholder.svg?height=300&width=400"
        alt="비행기 이미지"
      />
      <ImagePopup
        isOpen={showAccommodationImage}
        onClose={() => setShowAccommodationImage(false)}
        imageSrc="/placeholder.svg?height=300&width=400"
        alt="숙소 이미지"
      />
    </div>
  )
}