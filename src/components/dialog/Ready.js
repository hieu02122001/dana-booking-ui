import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from "@chakra-ui/react"
import React from "react"
import http from "../../config/axiosConfig";
import { PATHS } from "../../utils/paths";

export default function Draft({ data }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  function handleYesClick () {
    console.log(data);
    http
      .put(`${PATHS.adminSubscriptions}/${data.id}/status/paying`)
      .then((res) => {
        window.location.reload()
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>SẴN SÀNG</Button>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Xác nhận chuyển trạng thái?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Bạn có muốn chuyển sang trạng thái CHỜ THANH TOÁN?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Không
            </Button>
            <Button colorScheme='blue' onClick={handleYesClick} ml={3}>
              Có
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}