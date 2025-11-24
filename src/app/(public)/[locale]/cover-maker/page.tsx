import { Metadata } from "next";
import { CoverMakerPage } from "@/components/cover-maker/CoverMakerPage";

export const metadata: Metadata = {
  title: "封面制作 | Ant Card",
  description: "专业的封面制作工具，支持多种模板和自定义选项",
};

export default function CoverMaker() {
  return <CoverMakerPage />;
}