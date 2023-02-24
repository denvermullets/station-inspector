import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import DropFile from "./DropFile";

const UploadForm: React.FC = () => {
  const toast = useToast();
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (file) {
      toast({
        title: "File added",
        description: `File "${file.name}" was added.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [file]);

  const handleSubmit = () => {
    if (!file) {
      toast({
        title: "Oh no!",
        description: `You must add a file before uploading`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      axios
        .post("/api/v1/ingest", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          toast({
            title: "Success!",
            description: `${file.name} successfully uploaded`,
            status: "success",
            duration: 5000,
            isClosable: true,
          });

          setFile(null);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container
      py={{ base: "4", md: "8" }}
      border="1px"
      rounded="2xl"
      borderColor="blackAlpha.400"
      width={{ sm: "sm", lg: "lg" }}
    >
      <Stack spacing="5" maxW="100%">
        <Stack spacing="5">
          <FormControl id="provider">
            <Stack
              direction={{ base: "column", md: "row" }}
              spacing={{ base: "1.5", md: "8" }}
              justify="space-between"
            >
              <FormLabel variant="inline">Provider</FormLabel>
              <Input
                type="text"
                maxW={{ md: "3xl" }}
                defaultValue="default provider dropdown"
              />
            </Stack>
          </FormControl>
          <FormControl id="file-upload">
            <DropFile setFile={setFile} />
          </FormControl>
          <Flex direction="row-reverse">
            <Button variant="primary" onClick={() => handleSubmit()}>
              Upload CSV
            </Button>
          </Flex>
        </Stack>
      </Stack>
    </Container>
  );
};

export default UploadForm;
