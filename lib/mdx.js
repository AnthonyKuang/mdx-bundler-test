import { join } from 'path';
import { readdirSync, readFileSync } from 'fs';
import { bundleMDX } from 'mdx-bundler';

export const getAllSlugs = async () => {
  const postsPath = join(process.cwd(), 'posts');
  const fileNames = readdirSync(postsPath);

  return fileNames;
};

export const getPostBySlug = async (slug) => {
  const mdxSource = readFileSync(
    join(process.cwd(), 'posts', `${slug}.mdx`),
    'utf-8'
  ).trim();

  const { code, frontmatter } = await bundleMDX(mdxSource);

  return {
    code,
    frontmatter,
  };
};
