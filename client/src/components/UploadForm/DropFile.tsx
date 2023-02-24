import React, { ChangeEvent, DragEvent, useRef } from "react";
import {
  Button,
  Center,
  HStack,
  Icon,
  Square,
  Text,
  useColorModeValue,
  VStack,
  Input,
  Box,
} from "@chakra-ui/react";
import { FiUploadCloud } from "react-icons/fi";

type DropFileProps = {
  setFile: (file: File | null) => void;
};

const DropFile: React.FC<DropFileProps> = ({ setFile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event?.dataTransfer?.files) {
      setFile(event?.dataTransfer?.files?.item(0));
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleOpenFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event?.target?.files) {
      setFile(event.target.files?.item(0));
    }
  };

  return (
    <form>
      <Box borderWidth="1px" borderRadius="lg" w="full">
        <VStack
          spacing="3"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          py="4"
          onClick={handleOpenFileDialog}
        >
          <Square size="10" bg="bg-subtle" borderRadius="lg">
            <Icon as={FiUploadCloud} boxSize="5" color="muted" />
          </Square>
          <VStack spacing="1">
            <HStack spacing="1" whiteSpace="nowrap">
              <Input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                accept=".csv"
                ref={fileInputRef}
                style={{ display: "none" }}
              />

              <Text fontSize="sm" color="muted">
                Click to upload or drag and drop
              </Text>
            </HStack>
            <Text fontSize="xs" color="muted">
              CSV files only, up to ??MB/GB?
            </Text>
          </VStack>
        </VStack>
      </Box>
    </form>
  );
};

export default DropFile;
