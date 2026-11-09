import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'품은채 — 고요를 품은 한옥',description:'나무와 빛, 느린 시간이 머무는 집. 두 개의 프라이빗 한옥 객실에서 당신만의 쉼을 만나보세요.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ko"><body>{children}</body></html>}
