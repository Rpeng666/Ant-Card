import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const features: FeatureProps[] = [
  {
    title: "智能卡片生成",
    description:
      "利用 AI 技术，根据您的职业背景和目标职位，智能生成专业卡片内容，让您的卡片更具竞争力。",
    icon: (
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
        className="w-10 h-10 text-primary"
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
    ),
  },
  {
    title: "多样化模板",
    description:
      "提供多种专业设计的卡片模板，适合不同行业和职位需求，让您的卡片在众多应聘者中脱颖而出。",
    icon: (
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
        className="w-10 h-10 text-primary"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
  },
  {
    title: "语法优化",
    description:
      "自动检查并优化卡片中的语法和表达，确保您的卡片专业、准确，给招聘者留下良好的第一印象。",
    icon: (
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
        className="w-10 h-10 text-primary"
      >
        <path d="m16 16 2 2 4-4" />
        <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" />
        <path d="M16.5 9.4 7.55 4.24" />
        <polyline points="3.29 7 12 12 20.71 7" />
        <line x1="12" x2="12" y1="22" y2="12" />
      </svg>
    ),
  },
];

const featureList: string[] = [
  "智能卡片生成",
  "多样化模板",
  "语法优化",
  "一键导出PDF",
  "实时预览",
  "多语言支持",
  "响应式设计",
  "ATS友好",
  "卡片评分",
];

export default function NewFeatures() {
  return (
    <section
      id="features"
      className="container py-24 sm:py-32 space-y-8"
    >
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        强大的{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          功能特性
        </span>
      </h2>

      <div className="flex flex-wrap md:justify-center gap-4">
        {featureList.map((feature: string) => (
          <div key={feature}>
            <Badge
              variant="secondary"
              className="text-sm"
            >
              {feature}
            </Badge>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ title, description, icon }: FeatureProps) => (
          <Card key={title} className="border border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10">{icon}</div>
                {title}
              </CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>

            <CardFooter className="flex justify-center">
              <div className="w-[200px] h-[120px] bg-muted/50 rounded-md flex items-center justify-center">
                <p className="text-sm text-muted-foreground">功能展示图</p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}