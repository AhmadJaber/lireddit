import React from "react";
import { Box, Flex, Link } from "@chakra-ui/core";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

export const NavBar: React.FC<{}> = ({}) => {
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
          <Link mr={6} color="blue.700" fontWeight="semibold">
            Login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="blue.700" fontWeight="semibold">
            Register
          </Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <>
        <NextLink href="">
          <Link mr={6} color="blue.700" fontWeight="semibold">
            {data.me.username}
          </Link>
        </NextLink>
        <NextLink href="">
          <Link color="blue.700" fontWeight="semibold">
            Logout
          </Link>
        </NextLink>
      </>
    );
  }

  return (
    <Box bg="white" py={3} boxShadow="sm">
      <Box w="100%" maxW="1140px" mx="auto">
        <Flex justify="flex-end" align="center" px={8}>
          {body}
        </Flex>
      </Box>
    </Box>
  );
};
