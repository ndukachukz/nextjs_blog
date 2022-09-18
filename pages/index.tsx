import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Categories, PostCard, PostWidget } from "../components";
import { getCategories, getPosts } from "../services";
import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { setCategories } from "../features/categories/categoriesSlice";

interface Props {
  posts: Array<any>;
}

const Home: NextPage<Props> = ({ posts }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    getCategories().then((result) => dispatch(setCategories(result)));
  }, []);
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>ChuksBlog - Discover Naija</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts?.map((post, i) => (
            <PostCard key={i + post.node.title} post={post.node} />
          ))}
        </div>

        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const posts = (await getPosts()) || [];

  return {
    props: { posts },
  };
};
