import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '루피 도지 게임',
  description: '마우스나 터치로 캐릭터를 움직여 장애물을 피하는 게임',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
}
