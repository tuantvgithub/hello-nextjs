import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/post';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import { PostData } from '@/lib/post_data';

interface PostProps {
    postData: PostData;
}

interface StaticProps {
    params: {
        id: string
    }
}

export default function Post({postData}: PostProps) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: StaticProps) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}