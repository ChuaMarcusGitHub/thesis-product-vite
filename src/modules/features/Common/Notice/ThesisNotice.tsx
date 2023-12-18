import React, { useState } from "react";
import {
    Box,
    Button,
    Heading,
    Modal,
    ModalBody,
    Text,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    ListItem,
    ListIcon,
    List,
    Stack,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { getNoticeList } from "./ThesisNoticeUtils";

export interface IThesisNoticeProps {
    isOpen: boolean;
    onClose: () => void;
}
const ThesisNotice: React.FC<IThesisNoticeProps> = ({
    isOpen = false,
    onClose = () => console.warn("Thesis notice onClose method not defined!"),
}) => {
    const [articleList] = useState(getNoticeList());
    const renderListItem = (listItem: string, index: number) => (
        <ListItem key={`list-item-${index}`}>
            <ListIcon as={InfoIcon}></ListIcon>
            {listItem}
        </ListItem>
    );
    const renderComponent = () => (
        <Modal isOpen={isOpen} onClose={onClose} size={"3xl"}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Heading textAlign={"center"} data-testid={"modal-header"}>NOTICE</Heading>
                </ModalHeader>
                <ModalBody>
                    <Stack gap={3}>
                        <Box>
                            <Text>
                                This website is meant to be a website to test a
                                thesis of the following Person:
                            </Text>
                            <Text>Chua San Lin Marcus Anselm</Text>
                        </Box>
                        <Box>
                            <Text>
                                This Website will track the following
                                information:
                            </Text>
                        </Box>
                        <Box>
                            <List spacing={3}>
                                {articleList &&
                                    articleList.map((listItem, index) =>
                                        renderListItem(listItem, index)
                                    )}
                            </List>
                        </Box>
                    </Stack>
                </ModalBody>

                <ModalFooter display={"flex"} justifyContent={"center"}>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
    return renderComponent();
};

export default ThesisNotice;
