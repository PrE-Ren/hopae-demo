import { useEffect } from "react";
import Link from "next/link";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { backendHostingURL } from "@/common/config";

export default function Component() {
  const useDeepLink = () => {
    const url = backendHostingURL + "/verifier/vp/career"; // verifier 1 backend
    const nonceUrl = backendHostingURL + "/verifier/nonce/career"; // 대신 서버에서 가져와야함
    const fields = ["department", "join", "leave"];
    window.open(
      "wwwallet://verify?url=" +
        url +
        "&nonceUrl=" +
        nonceUrl +
        "&fields=" +
        fields.join(",")
    );
  };

  useEffect(() => {
    setInterval(() => {
      // check if the user is verified (polling)
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="#" className="text-xl font-bold" prefetch={false}>
            회사 A
          </Link>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              <MenuIcon className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link
                href="#"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 hover:text-white"
                prefetch={false}
              >
                <BadgeIcon className="h-5 w-5" />
                증명서 제출
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <div>
        <section className="flex-1 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <div className="max-w-3xl px-6 py-12 text-center">
            <h1 className="text-4xl font-bold mb-4">증명서를 제출하세요</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8">월렛 앱에 있는 증명서를 제출할 수 있습니다.</p>
            <Button
              onClick={useDeepLink}
              href="#"
              className="inline-flex h-12 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              prefetch={false}
            >
              증명서 제출
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}

function BadgeIcon(props) {
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
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
    </svg>
  )
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
  )
}