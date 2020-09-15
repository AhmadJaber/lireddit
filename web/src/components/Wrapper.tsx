import React from "react";
import { Box } from "@chakra-ui/core";

export type WrapperVarient = "small" | "regular";

interface WrapperProps {
  variant?: WrapperVarient;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
}) => {
  return (
    <Box
      mx="auto"
      mt={8}
      w="100%"
      maxW={variant === "regular" ? "800px" : "400px"}
    >
      {children}
    </Box>
  );
};
