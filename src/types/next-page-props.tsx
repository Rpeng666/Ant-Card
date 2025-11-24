/**
 * Types for Next.js App Router page components
 *
 * Params: Route parameters from dynamic segments
 * Example: For route /blog/[slug] with URL /blog/hello-world
 * params = { slug: "hello-world" }
 * For catch-all route /blog/[...slug] with URL /blog/2023/01/post
 * params = { slug: ["2023", "01", "post"] }
 */
export type Params = Record<string, string | Array<string> | undefined>;

/**
 * SearchParams: URL query parameters
 * Example: For URL /?page=1&sort=desc
 * searchParams = { page: "1", sort: "desc" }
 * For URL /?tags=react&tags=nextjs
 * searchParams = { tags: ["react", "nextjs"] }
 */
export type SearchParams = {
  [key: string]: string | string[] | undefined;
};

/**
 * Props passed to Next.js page components in App Router
 * Both params and searchParams are Promises that resolve to their respective types
 */
export type NextPageProps = {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
};
