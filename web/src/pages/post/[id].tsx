import { Box, Flex } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../components/Layout";
import { usePostQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";

const Post = () => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [{ data, fetching, error }] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });

  if (fetching) {
    return (
      <Layout>
        <Flex as="h5" alignItems="center" justifyContent="center" color="green">
          Loading......
        </Flex>
      </Layout>
    );
  }

  return (
    <Layout>
      <p>{data?.post?.text}</p>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
