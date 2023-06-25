import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from "@chakra-ui/react"
import React from "react"
import http from "../../config/axiosConfig";
import { PATHS } from "../../utils/paths";

export default function BookingPending({ data }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  function handleApproveClick () {
    http
      .put(`${PATHS.landlordBookings}/${data.id}/status/approved`)
      .then((res) => {
        window.location.reload()
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleRejectClick () {
    http
      .put(`${PATHS.landlordBookings}/${data.id}/status/rejected`)
      .then((res) => {
        window.location.reload()
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <Button size="xs" colorScheme="yellow" onClick={onOpen}>CHỜ XÁC NHẬN</Button>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Xác nhận đăng ký thuê trọ?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Bạn muốn xác nhận đăng ký thuê trọ?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Huỷ
            </Button>
            <Button colorScheme='red'  onClick={handleRejectClick} ml={3}>
              Từ chối
            </Button>
            <Button colorScheme='green'  onClick={handleApproveClick} ml={3}>
              Xác nhận
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}