import createNextIntlPlugin from "next-intl/plugin";
import { createMDX } from 'fumadocs-mdx/next';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const config = {
  typescript: {
    ignoreBuildErrors: true,
  },
  output: "standalone",
};


const withMDX = createMDX({
  // customise the config file path
  // configPath: "source.config.ts"
});

export default withMDX(withNextIntl(config));
