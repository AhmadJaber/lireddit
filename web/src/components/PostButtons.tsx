import { Box, IconButton, Link } from "@chakra-ui/core";
import React from "react";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";
import NextLink from "next/link";

interface PostButtonsProps {
  id: number;
  creatorId: number;
}

export const PostButtons: React.FC<PostButtonsProps> = ({ id, creatorId }) => {
  const [, deletePost] = useDeletePostMutation();
  const [{ data: meData }] = useMeQuery();

  if (meData?.me?.id !== creatorId) {
    return null;
  }

  return (
    <Box>
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton as={Link} aria-label="edit post" icon="edit" mr={4} />
      </NextLink>
      <IconButton
        aria-label="delete post"
        icon="delete"
        onClick={() => {
          deletePost({ id });
        }}
      />
    </Box>
  );
};
