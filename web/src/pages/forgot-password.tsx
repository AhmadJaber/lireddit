import React, { useState } from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Wrapper } from "../components/Wrapper";
import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import { Box, Button } from "@chakra-ui/core";
import { useForgotPasswordMutation } from "../generated/graphql";

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values, { setErrors }) => {
          await forgotPassword(values);
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Box>
              <h5>
                if an account with that email exists, we sent you can email
              </h5>
            </Box>
          ) : (
            <Form>
              <InputField
                name="email"
                placeholder="email"
                label="Account Email"
                type="email"
              />

              <Box mt={4}>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  variantColor="teal"
                >
                  Forgot Password
                </Button>
              </Box>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
