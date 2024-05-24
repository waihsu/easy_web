import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Home from "@/components/Home";
import { BlogTemplate } from "@/components/component/blog-template";

export default function App() {
  return (
    <main className=" min-w-full flex min-h-dvh flex-col items-center justify-between container scroll-smooth">
      <BlogTemplate />
    </main>
  );
}
