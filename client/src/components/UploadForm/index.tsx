import {
  Button,
  Container,
  Flex,
  FormControl,
  Progress,
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Provider } from "../../models/Provider";
import DropFile from "./DropFile";
import socket from "./socketConnection";

const UploadForm: React.FC = () => {
  const toast = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [uploadStarted, setUploadStarted] = useState<boolean>(false);

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

  useEffect(() => {
    if (!providers.length) {
      try {
        axios
          .get("/api/v1/providers", {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => setProviders(response.data));
      } catch (error) {
        console.error(error);
      }
    }
  }, [providers]);

  useEffect(() => {
    if (progress > 99) {
      setUploadStarted(false);
      setProgress(0);
    }
  }, [progress, uploadStarted]);

  const handleProviderChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvider(event.target.value);
  };

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

    if (!selectedProvider) {
      toast({
        title: "Oh no!",
        description: `You must select a Provider before uploading`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    setUploadStarted(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("providerId", selectedProvider);

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

  socket.on("progress", (data) => {
    if (data.progress > progress) {
      setProgress(data.progress);
    }
  });

  socket.on("completed", (data) => {
    setUploadStarted(false);
    setProgress(0);
  });

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
              <Select
                placeholder="Select a Provider"
                onChange={handleProviderChange}
              >
                {providers &&
                  providers.map((provider) => (
                    <option value={provider.id} key={provider.id}>
                      {provider.name}
                    </option>
                  ))}
              </Select>
            </Stack>
          </FormControl>
          <FormControl id="file-upload">
            <DropFile setFile={setFile} />
          </FormControl>
          {uploadStarted && <Progress hasStripe value={progress} />}
          <Flex direction="row-reverse">
            <Button onClick={() => handleSubmit()}>Upload CSV</Button>
          </Flex>
        </Stack>
      </Stack>
    </Container>
  );
};

export default UploadForm;
