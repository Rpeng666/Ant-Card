import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";

export default function NewHeroCards() {
  return (
    <div className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px]">
      {/* 卡片预览卡片 */}
      <Card className="absolute w-[340px] -top-[15px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">专业卡片模板</CardTitle>
          <CardDescription>现代化设计，突出您的优势</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="bg-muted/50 rounded-md p-2">
            <div className="h-32 bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900 dark:to-blue-800 rounded-md flex items-center justify-center">
              <p className="text-sm text-center text-muted-foreground">卡片预览</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 用户评价卡片 */}
      <Card className="absolute right-[20px] top-4 w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="mt-8 flex justify-center items-center pb-2">
          <div className="absolute -top-12 rounded-full w-24 h-24 bg-muted flex items-center justify-center">
            <Avatar className="w-20 h-20">
              <AvatarImage src="/avatar.png" alt="用户头像" />
              <AvatarFallback>用户</AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="text-center">张先生</CardTitle>
          <CardDescription className="font-normal text-primary">
            软件工程师
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center pb-2">
          <p>
            &quot;Ant Card 帮助我快速制作了一份专业的卡片，面试邀请明显增多了！&quot;
          </p>
        </CardContent>

        <CardFooter>
          <div className="flex gap-2">
            <Badge variant="outline">简洁</Badge>
            <Badge variant="outline">专业</Badge>
            <Badge variant="outline">高效</Badge>
          </div>
        </CardFooter>
      </Card>

      {/* 功能卡片 */}
      <Card className="absolute bottom-4 left-[20px] w-72 drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">智能功能</CardTitle>
            <div className="bg-primary/20 p-1.5 rounded-full text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M12 2v1" />
                <path d="M12 21v1" />
                <path d="m4.93 4.93-.7.7" />
                <path d="m19.07 19.07-.7.7" />
                <path d="M2 12h1" />
                <path d="M21 12h1" />
                <path d="m4.93 19.07-.7-.7" />
                <path d="m19.07 4.93-.7-.7" />
                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                <path d="M6 18h12" />
              </svg>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-2">
          <div className="flex items-center gap-2">
            <div className="bg-primary/20 p-1 rounded-full text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3 h-3"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="text-sm">AI 辅助内容生成</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-primary/20 p-1 rounded-full text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3 h-3"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="text-sm">多种专业模板</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-primary/20 p-1 rounded-full text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3 h-3"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="text-sm">一键导出 PDF</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}