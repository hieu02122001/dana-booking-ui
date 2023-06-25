import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../utils/paths";


const TruncatedText = ({ text, wordLimit }) => {
  const truncatedText = text.slice(0, wordLimit);

  return (
    <Text>
      {truncatedText}{text.length > wordLimit && "..."}
    </Text>
  );
};

export default function CardRoomTenant({ data }) {
  console.log(data);
  const navigate = useNavigate();
  function handleRoomClick (roomId) {
    navigate(`${PATHS.tenantRooms}/${roomId}`)
  }
  return (
    <div>
      <Card maxW="sm" maxH="xl">
        <CardBody>
          <Image
            height="200px"
            width="300px"
            src={data?.images[0] ||"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{`${data?.name}, ${data?.houseName}`}</Heading>
            <TruncatedText text={`${data?.houseAddress}`} wordLimit={35} />
            <TruncatedText text={data?.description} wordLimit={75} />
            <Text color="blue.600">
              {`${data?.price}đ`}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter justifyContent="center">
            <Button variant="solid" colorScheme="blue" onClick={() => handleRoomClick(data.id)}>
              Xem chi tiết
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
