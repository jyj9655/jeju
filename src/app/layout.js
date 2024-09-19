import localFont from "next/font/local";
import "./globals.css";

export const metadata = {
  title: "제주 여행 일정",
  description: "제주 여행 2박 3일 동쪽 일정",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased"> {/* 폰트 클래스를 제거 */}
        {children}
      </body>
    </html>
  );
}
