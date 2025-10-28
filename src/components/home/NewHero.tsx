import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import NewHeroCards from "./NewHeroCards";

export default function NewHero() {
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text">
              Ant Card
            </span>{" "}
          </h1>{" "}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
              卡片制作
            </span>{" "}
            工具
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          轻松创建专业卡片，让您的求职之路更加顺畅。现代设计，智能功能，一键生成。
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Link href="/app/card-editor">
            <Button className="w-full md:w-1/3">开始使用</Button>
          </Link>

          <a
            rel="noreferrer noopener"
            href="https://github.com/rpeng666/ant-card"
            target="_blank"
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: "outline",
            })}`}
          >
            Github 仓库
          </a>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
        <NewHeroCards />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
}