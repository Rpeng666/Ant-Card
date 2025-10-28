import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "@/components/Icons";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <MedalIcon />,
    title: "选择模板",
    description:
      "从丰富的模板库中选择适合您的卡片样式，涵盖商务、创意、简约等多种风格",
  },
  {
    icon: <MapIcon />,
    title: "编辑内容",
    description:
      "使用直观的编辑器添加个人信息、技能、经历等内容，实时预览编辑效果",
  },
  {
    icon: <PlaneIcon />,
    title: "调整布局",
    description:
      "拖拽调整卡片元素位置和大小，AI智能布局系统帮助您优化设计效果",
  },
  {
    icon: <GiftIcon />,
    title: "导出分享",
    description:
      "一键导出高质量PDF或图片格式，轻松分享您的专业个人卡片",
  },
];

export const HowItWorks = () => {
  return (
    <section
      id="howItWorks"
      className="container text-center py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold ">
        使用{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          流程{" "}
        </span>
        简单四步
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
        只需简单四步，即可创建专业精美的个人卡片
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card
            key={title}
            className="bg-muted/50"
          >
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
