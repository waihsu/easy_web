import AutoTypeBanner from "@/components/AutoTypeBanner";
import SiteFooter from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CodeIcon, LayersIcon, SmartphoneIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function App() {
  return (
    <div>
      <Navbar />
      <div
        id="home"
        className=" min-h-svh flex justify-center items-center bg-secondary-foreground"
      >
        <div>
          <p className="text-6xl md:text-9xl text-center font-bold font-sans text-secondary mb-6">
            Easy Web
          </p>
          <Separator className=" w-1/5 mx-auto my-14  h-2 rounded-sm" />
          <p className="mx-auto max-w-2xl text-center text-xl font-serif text-secondary ">
            <AutoTypeBanner
              text="Our intuitive website builder makes it easy to create a
            professional-looking website without any coding experience."
            />
          </p>
        </div>
      </div>
      <section id="feature" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Key Features
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Our website builder offers a range of powerful features to help
                you create the perfect online presence.
              </p>
            </div>
          </div>
          {/* feature */}
          <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="grid gap-4 ">
              <div className="flex items-center justify-center bg-primary rounded-full w-16 h-16">
                <LayersIcon className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold">Drag-and-Drop</h3>
              <p className="text-base text-gray-500 dark:text-gray-400">
                Easily customize your website by dragging and dropping elements
                to create the perfect layout.
              </p>
            </div>
            <div className="grid gap-4">
              <div className="flex items-center justify-center bg-primary rounded-full w-16 h-16">
                <CodeIcon className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold">No Coding Required</h3>
              <p className="text-base text-gray-500 dark:text-gray-400">
                Our website builder allows you to create professional-looking
                websites without any coding knowledge.
              </p>
            </div>
            <div className="grid gap-4">
              <div className="flex items-center justify-center bg-primary rounded-full w-16 h-16">
                <SmartphoneIcon className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold">Mobile-Friendly</h3>
              <p className="text-base text-gray-500 dark:text-gray-400">
                Your websites will be automatically optimized for mobile
                devices, ensuring a seamless experience for your visitors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Example */}
      <section className="w-full py-12 md:py-24 lg:py-32" id="example">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-700">
                Examples
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Inspiring Portfolios Built with{" "}
                <span className="text-primary">Easy Web</span>
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Explore a selection of stunning portfolios created by our users
                and get inspired to build your own.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <Link href="https://easy-web-six.vercel.app/public/clwolrm540000p5opdi9l64k8">
              <Card className="rounded-lg overflow-hidden bg-card shadow-lg">
                <Image
                  alt="Portfolio Example 1"
                  className="w-full h-48 object-cover"
                  height="300"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "400/300",
                    objectFit: "cover",
                  }}
                  width="400"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">John Doe</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Graphic Designer
                  </p>
                </div>
              </Card>
            </Link>

            <Link href="https://easy-web-six.vercel.app/public/clwoo1x210000utsg0nu0ajhv">
              <Card className="rounded-lg overflow-hidden bg-card shadow-lg">
                <Image
                  alt="Portfolio Example 2"
                  className="w-full h-48 object-cover"
                  height="300"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "400/300",
                    objectFit: "cover",
                  }}
                  width="400"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">Jane Smith</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Web Developer
                  </p>
                </div>
              </Card>
            </Link>
            <Link href="https://easy-web-six.vercel.app/public/clwoolvja00009fmnh259hzp6">
              <Card className="rounded-lg overflow-hidden bg-card shadow-lg">
                <Image
                  alt="Portfolio Example 3"
                  className="w-full h-48 object-cover"
                  height="300"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "400/300",
                    objectFit: "cover",
                  }}
                  width="400"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">Michael Johnson</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Photographer
                  </p>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
