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
      <Button colorScheme="yellow" onClick={onOpen}>CHỜ THANH TOÁN</Button>
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
            Bạn có muốn Thanh toán?
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