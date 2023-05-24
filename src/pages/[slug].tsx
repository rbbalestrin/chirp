import { GetStaticProps, InferGetStaticPropsType, type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";

const ProfilePage: NextPage<{username: string}> = ({username}) => {
  const { data, isLoading } = api.profile.getUserByUsername.useQuery({
    username,
  });
  if (!data) return <div>404</div>;

  return (
    <>
      <Head>
        <title>{data.username}</title>
      </Head>
      <main className="flex h-screen justify-center">
        <div className="h-full w-full border-x border-slate-400 md:max-w-2xl ">
          Profile View
        </div>
      </main>
    </>
  );
};
import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import superjson from "superjson";

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, userId: null },
    transformer: superjson, // optional - adds superjson serialization
  });

  const slug = context.params?.slug;

  if (typeof slug !== "string") throw new Error("no slug")

  const username = slug.replace("@", "")

 await ssg.profile.getUserByUsername.prefetch({username})

  return{
    props: {
      trpc: ssg.dehydrate(),
      username,
    },
  };
};

export const getStaticPaths = () > {
  return { paths: [], fallback: "blocking"};
};

export default ProfilePage;
