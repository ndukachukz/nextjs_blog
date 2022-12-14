import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { getPostDetails, getPosts /* getPostDetails */ } from "../../services";
import {
  PostDetail,
  Categories,
  PostWidget,
  Author,
  Comments,
  CommentsForm,
} from "../../components";
import { Post } from "../../types";

const PostDetails: NextPage = ({ post }: { post?: Post.default }) => {
  console.log(post);
  return (
    <div className="container mx-auto px-10 mb-8 ">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <Author author={post?.author} />
          <CommentsForm slug={post?.slug} />
          <Comments slug={post?.slug} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget
              slug={post?.slug}
              categories={post?.categories?.map((category) => category.slug)}
            />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = (await getPostDetails(params?.slug)) || [];

  return {
    props: { post: data },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts();

  return {
    paths: posts.map(({ node: { slug } }: any) => ({ params: { slug } })),
    fallback: false,
  };
};
