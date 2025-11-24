/**
 * 博客侧边栏配置
 */

export interface SidebarAdConfig {
  title: string;
  subtitle?: string;
  badge?: string;
  price?: string;
  features: string[];
  link: string;
  buttonText?: string;
}

/**
 * 作者信息
 */
export const authorInfo = {
  name: "Ant Card Team",
  avatar: "/logo.png", // 使用项目的logo
  bio: "专注于AIGC工具开发和内容创作，分享实用的AI工具使用技巧和创意设计教程。致力于让每个人都能轻松使用AI提升创作效率。",
  social: {
    youtube: "https://youtube.com/@antcard", // 替换为YouTube链接
    github: "https://github.com/rpeng666/antcard",
    email: "mailto:support@antcard.airouter.tech",
  },
};

/**
 * VPS推荐配置
 */
export const budgetVpsConfig: SidebarAdConfig = {
  title: "推荐VPS服务商",
  subtitle: "稳定可靠的选择",
  badge: "推荐",
  price: "$5/月起",
  features: [
    "99.9%可用性保证",
    "全球多个数据中心",
    "24/7技术支持",
    "快速部署",
  ],
  link: "https://www.vultr.com/?ref=123456",
  buttonText: "查看详情",
};

export const vpsRecommendations: SidebarAdConfig[] = [
  {
    title: "Vultr",
    subtitle: "性能卓越的云服务器",
    price: "$2.50/月起",
    features: [
      "SSD存储",
      "100% SSD存储",
      "17个全球位置",
      "一键部署应用",
    ],
    link: "https://www.vultr.com/?ref=123456",
    buttonText: "立即购买",
  },
  {
    title: "DigitalOcean",
    subtitle: "开发者友好的云平台",
    price: "$4/月起",
    features: [
      "简单易用",
      "可扩展架构",
      "丰富的API",
      "社区支持",
    ],
    link: "https://www.digitalocean.com/?refcode=123456",
    buttonText: "免费注册",
  },
];