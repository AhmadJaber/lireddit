import { Flex, IconButton, Text } from "@chakra-ui/core";
import React, { useState } from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpdootSectionProps {
  // post: PostsQuery['posts']['posts'][0]
  post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");
  const [{ fetching, operation }, vote] = useVoteMutation();
  console.log(fetching, operation);

  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={8}>
      <IconButton
        onClick={async () => {
          setLoadingState("updoot-loading");
          await vote({
            value: 1,
            postId: post.id,
          });

          setLoadingState("not-loading");
        }}
        aria-label="updoot post"
        size="xs"
        isLoading={loadingState === "updoot-loading"}
        icon="chevron-up"
      />
      <Text fontWeight="semibold">{post.points}</Text>
      <IconButton
        aria-label="downdoot post"
        size="xs"
        icon="chevron-down"
        onClick={() => {
          setLoadingState("downdoot-loading");
          vote({
            value: -1,
            postId: post.id,
          });

          setLoadingState("not-loading");
        }}
        isLoading={loadingState === "downdoot-loading"}
      />
    </Flex>
  );
};
