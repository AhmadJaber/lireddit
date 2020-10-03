import { Box, Flex } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../../components/Layout";
import { PostButtons } from "../../components/PostButtons";
import { usePostQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetIntId } from "../../utils/useGetIntId";

const Post = () => {
  const intId = useGetIntId();
  const [{ data, fetching, error }] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
  console.log(data);

  if (fetching) {
    return (
      <Layout>
        <Flex alignItems="center" justifyContent="center" color="green">
          <h3>Loading......</h3>
        </Flex>
      </Layout>
    );
  }
  if (error) {
    return (
      <Layout>
        <Flex alignItems="center" justifyContent="center" color="green">
          <h3>{error.message}</h3>
        </Flex>
      </Layout>
    );
  }
  if (!data?.post) {
    return (
      <Layout>
        <Flex alignItems="center" justifyContent="center" color="green">
          <h3>could not find post!</h3>
        </Flex>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box
        as="h1"
        fontWeight="bold"
        fontSize="1.5rem"
        textAlign="center"
        mb={6}
        paddingTop="2em"
      >
        {data.post.title}
      </Box>
      <Box textAlign="center" marginBottom="2rem">
        <PostButtons id={data.post.id} creatorId={data.post.creator.id} />
      </Box>
      <Box as="p" fontSize="1.1rem">
        {data.post.text}
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
