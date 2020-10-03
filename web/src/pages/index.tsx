import { useState } from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import { Link, Stack, Box, Text, Heading, Flex, Button } from "@chakra-ui/core";
import NextLink from "next/link";
import { UpdootSection } from "../components/UpdootSection";
import { PostButtons } from "../components/PostButtons";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });
  console.log(variables);
  const [{ data, fetching }] = usePostsQuery({ variables });

  if (!data && !fetching) {
    return (
      <div style={{ textAlign: "center" }}>
        you got query failed for some reason
      </div>
    );
  }

  return (
    <Layout variant="regular">
      {!data && fetching ? (
        <div>Loading....</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts.posts.map((p) =>
            !p ? null : (
              <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
                <UpdootSection post={p} />

                <Box flex={1}>
                  <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                    <Link>
                      <Heading fontSize="xl">{p.title}</Heading>
                    </Link>
                  </NextLink>
                  <Text fontSize=".9rem">posted by {p.creator.username}</Text>
                  <Flex alignItems="center">
                    <Text flex={1} mt={4}>{`${p.textSnippet} ....`}</Text>
                    <PostButtons id={p.id} creatorId={p.creator.id} />
                  </Flex>
                </Box>
              </Flex>
            )
          )}
        </Stack>
      )}

      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
            my={8}
            mx="auto"
            isLoading={fetching}
          >
            Load More
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
