import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { backendHostingURL } from "@/common/config";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function Component() {
  return (
    <div>
      <header className="bg-gray-900 text-white py-4 px-4 md:py-6 md:px-8">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">결혼 정보 회사</div>
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              <li>
                <Link href="#" prefetch={false}>
                  홈
                </Link>
              </li>
              <li>
                <Link href="#" prefetch={false}>
                  소개
                </Link>
              </li>
              <li>
                <Link href="/verifier2/submit" prefetch={false}>
                  유전자 정보 제출
                </Link>
              </li>
              <li>
                <Link href="#" prefetch={false}>
                  연락처
                </Link>
              </li>
            </ul>
          </nav>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <MenuIcon className="w-6 h-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right">
              <DropdownMenuItem>
                <Link href="#" prefetch={false}>
                  홈
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#" prefetch={false}>
                  소개
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/verifier2/submit" prefetch={false}>
                  유전자 정보 제출
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#" prefetch={false}>
                  연락처
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main>
        <section className="bg-gray-100 py-12 md:py-16 lg:py-20">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative h-[400px] md:h-[500px] lg:h-[600px] order-2 md:order-1">
                <img
                  src="/verifier2.jpg"
                  alt="Genetic Information"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="text-center md:text-left order-1 md:order-2">
                <h1 className="text-4xl font-bold mb-4 md:text-5xl lg:text-6xl">
                  당신의 인연을 위한
                </h1>
                <h1 className="text-4xl font-bold mb-4 md:text-5xl lg:text-6xl">
                  맞춤형 서비스
                </h1>
                <p className="text-gray-600 mb-8 md:text-lg lg:text-xl">
                  저희는 고객님의 성향, 가치관, 라이프스타일 등을 종합적으로
                  고려하여 최적의 인연을 찾아드립니다. 전문 컨설턴트와의 1:1
                  상담을 통해 세심하고 개인화된 매칭 서비스를 제공하며, 단순한
                  만남을 넘어 진정한 인연을 맺을 수 있도록 돕습니다.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-900 text-white py-6 md:py-8 lg:py-10">
        <div className="container mx-auto text-center">
          &copy; 2023 Marriage Info. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
