import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useMeQuery, usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import { Link, Stack, Box, Text, Heading, Flex, Button } from "@chakra-ui/core";
import NextLink from "next/link";

const Index = () => {
  const [{ data, fetching }] = usePostsQuery({
    variables: {
      limit: 10,
    },
  });

  if (!data && !fetching) {
    return <div>you got query failed for some reason</div>;
  }

  return (
    <>
      <Layout variant="regular">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading>LiReddit</Heading>
          <NextLink href="/create-post">
            <Link color="teal.500">Create Post!!</Link>
          </NextLink>
        </Flex>

        <br />
        {!data && fetching ? (
          <div>Loading....</div>
        ) : (
          <Stack spacing={8}>
            {data!.posts.map((p) => (
              <Box key={p.id} p={5} shadow="md" borderWidth="1px">
                <Heading fontSize="xl">{p.title}</Heading>
                <Text mt={4}>{`${p.textSnippet} ....`}</Text>
              </Box>
            ))}
          </Stack>
        )}

        {data ? (
          <Flex>
            <Button my={8} mx="auto" isLoading={fetching}>
              Load More
            </Button>
          </Flex>
        ) : null}
      </Layout>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
