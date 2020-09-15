import React from "react";
import { Box, Flex, Link, Button } from "@chakra-ui/core";
import NextLink from "next/link";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { isServer } from "../utils/isServer";

export const NavBar: React.FC<{}> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({ pause: isServer() });

  let body = null;
  // is fetching()
  // is loged-out
  // loged-in
  if (fetching) {
    body = null;
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={6} fontWeight="semibold">
            Login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link fontWeight="semibold">Register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <>
        <Link mr={6} fontWeight="medium">
          {data.me.username}
        </Link>

        <Button
          fontWeight="medium"
          variant="link"
          onClick={() => {
            logout();
          }}
          isLoading={logoutFetching}
        >
          Logout
        </Button>
      </>
    );
  }

  return (
    <Box
      bg="blue.200"
      py={3}
      boxShadow="sm"
      position="sticky"
      top={0}
      zIndex={1}
    >
      <Box w="100%" maxW="1140px" mx="auto">
        <Flex justify="flex-end" align="center" px={8}>
          {body}
        </Flex>
      </Box>
    </Box>
  );
};
