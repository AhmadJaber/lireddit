import React, { useState } from "react";
import { NextPage } from "next";
import { Wrapper } from "../../components/Wrapper";
import { Formik, Form } from "formik";
import { InputField } from "../../components/InputField";
import { Box, Button, Flex, Link } from "@chakra-ui/core";
import { useRouter } from "next/router";
import { useChangePasswordMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import NextLink from "next/link";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";

export const ChangePassword: NextPage = () => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");

  console.log(router);

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            newPassword: values.newPassword,
            token:
              typeof router.query.token === "string" ? router.query.token : "",
          });

          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            console.log(errorMap);
            if ("token" in errorMap) {
              console.log("hello");
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              placeholder="new password"
              label="New Password"
              type="password"
            />

            {tokenError ? (
              <Flex justifyContent="space-between" mt="2">
                <Box style={{ color: "red" }} fontSize=".85rem">
                  {tokenError}
                </Box>
                <NextLink href="/forgot-password">
                  <Link style={{ color: "blue" }} fontSize=".85rem">
                    Get another token
                  </Link>
                </NextLink>
              </Flex>
            ) : null}

            <Box mt={4}>
              <Button
                type="submit"
                isLoading={isSubmitting}
                variantColor="teal"
              >
                Change Password
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
