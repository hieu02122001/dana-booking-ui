import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from "@chakra-ui/react"
import React from "react"
import http from "../../config/axiosConfig";
import { PATHS } from "../../utils/paths";

export default function SubsReady({ data }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  function handleNoClick () {
    console.log(data);
    http
      .put(`${PATHS.landlordSubscriptions}/${data.id}/status/fail`)
      .then((res) => {
        window.location.reload()
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleYesClick () {
    console.log(data);
    http
      .put(`${PATHS.landlordSubscriptions}/${data.id}/status/running`)
      .then((res) => {
        window.location.reload()
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <Button size="xs" colorScheme="yellow" onClick={onOpen}>SẴN SÀNG</Button>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Xác nhận dịch vụ?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Bạn vui lòng nhấn Có nếu muốn bắt đầu dịch vụ hoặc nhấn Không để huỷ dịch vụ.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Huỷ
            </Button>
            <Button colorScheme='red'  onClick={handleNoClick} ml={3}>
              Không
            </Button>
            <Button colorScheme='green'  onClick={handleYesClick} ml={3}>
              Có
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}