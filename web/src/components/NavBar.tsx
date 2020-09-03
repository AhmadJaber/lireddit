import React from "react";
import { Box, Flex, Link, Button } from "@chakra-ui/core";
import NextLink from "next/link";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";

export const NavBar: React.FC<{}> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();
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
          <Link mr={6} color="blue.900" fontWeight="semibold">
            Login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="blue.900" fontWeight="semibold">
            Register
          </Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <>
        <Link mr={6} color="blue.900" fontWeight="medium">
          {data.me.username}
        </Link>

        <Button
          color="blue.900"
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
    <Box bg="blue.200" py={3} boxShadow="sm">
      <Box w="100%" maxW="1140px" mx="auto">
        <Flex justify="flex-end" align="center" px={8}>
          {body}
        </Flex>
      </Box>
    </Box>
  );
};
