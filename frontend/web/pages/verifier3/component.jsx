import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import Link from "next/link"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { backendHostingURL } from "@/common/config";

export default function Component() {
  const useDeepLink = () => {
    const url = backendHostingURL + "/verifier/vp/genetic-test"; // verifier 2 backend
    const nonceUrl = backendHostingURL + "/verifier/nonce/genetic-test"; // 대신 서버에서 가져와야함
    const fields = ["cancer_risk"];
    window.open(
      "wwwallet://verify?url=" +
        url +
        "&nonceUrl=" +
        nonceUrl +
        "&fields=" +
        fields.join(",")
    );
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Life Insurance</h1>
        <Button size="lg" className="lg:hidden">
          <MenuIcon className="w-6 h-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <Sheet>
          <SheetContent side="left" className="bg-primary text-primary-foreground p-6 w-[300px] max-w-[90vw]">
            <div className="space-y-4">
              <Link href="#" className="flex items-center gap-2 text-lg font-semibold" prefetch={false}>
                <MountainIcon className="w-6 h-6" />
                <span>Acme Life</span>
              </Link>
              <nav className="space-y-2">
                <Link href="#" className="block text-lg font-medium" prefetch={false}>
                  Term Life
                </Link>
                <Link href="#" className="block text-lg font-medium" prefetch={false}>
                  Whole Life
                </Link>
                <Link href="#" className="block text-lg font-medium" prefetch={false}>
                  Universal Life
                </Link>
              </nav>
              <div className="space-y-2">
                <Button>Get a Quote</Button>
                <Button variant="outline">Contact Us</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </header>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-5xl px-4 md:px-6">
          <Carousel className="snap-x snap-mandatory overflow-x-auto -mx-4 md:-mx-6 pb-6">
            <CarouselContent className="flex gap-4 md:gap-6">
              <CarouselItem className="snap-center shrink-0 w-[80%] md:w-[50%] lg:w-[33.33%] relative">
                <Card className="h-full">
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold">Term Life</h3>
                      <p className="text-muted-foreground">Affordable coverage for a specific period of time.</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-4xl font-bold">$25</p>
                      <p className="text-muted-foreground">per month</p>
                    </div>
                    <Button>Get a Quote</Button>
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem className="snap-center shrink-0 w-[80%] md:w-[50%] lg:w-[33.33%]">
                <Card className="h-full">
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold">Whole Life</h3>
                      <p className="text-muted-foreground">Lifelong coverage with cash value build-up.</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-4xl font-bold">$50</p>
                      <p className="text-muted-foreground">per month</p>
                    </div>
                    <Button>Get a Quote</Button>
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem className="snap-center shrink-0 w-[80%] md:w-[50%] lg:w-[33.33%]">
                <Card className="h-full">
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold">Universal Life</h3>
                      <p className="text-muted-foreground">Flexible coverage with investment opportunities.</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-4xl font-bold">$75</p>
                      <p className="text-muted-foreground">per month</p>
                    </div>
                    <Button>Get a Quote</Button>
                  </CardContent>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2">
              <ChevronLeftIcon className="w-6 h-6" />
            </CarouselPrevious>
            <CarouselNext className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2">
              <ChevronRightIcon className="w-6 h-6" />
            </CarouselNext>
          </Carousel>
        </div>
      </div>
      <div className="bg-[#f0f8ff] py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Submit Genetic Information</h2>
          <p className="mb-4">
            To get a personalized life insurance quote, please submit your genetic information. This will help us
            provide you with the most accurate coverage options.
          </p>
          <Button onClick={useDeepLink}>Submit Genetic Information</Button>
        </div>
      </div>
      <footer className="bg-muted text-muted-foreground py-4 px-6 text-sm">
        <p>&copy; 2024 Acme Life Insurance. All rights reserved.</p>
      </footer>
    </div>
  )
}

function ChevronLeftIcon(props) {
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
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}


function ChevronRightIcon(props) {
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
      <path d="m9 18 6-6-6-6" />
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


function MountainIcon(props) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}