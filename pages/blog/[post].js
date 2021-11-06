import { useEffect, useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import { getAllSlugs, getPostBySlug } from '@lib/mdx';

export default function Post({ code, frontmatter }) {
  useEffect(() => {
    console.log(frontmatter);
  }, [frontmatter]);

  const Component = useMemo(() => getMDXComponent(code), [code]);

  return <Component />;
}

export const getStaticPaths = async () => {
  const slugs = await getAllSlugs();

  return {
    paths: slugs.map((slug) => ({
      params: {
        post: slug.replace(/\.mdx/, ''),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { code, frontmatter } = await getPostBySlug(params.post);

  return {
    props: {
      code,
      frontmatter,
    },
  };
};
