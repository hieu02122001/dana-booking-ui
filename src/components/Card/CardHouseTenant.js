import {
  Button,
  ButtonGroup,
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
  const words = text.split(" ");
  const truncatedText = words.slice(0, wordLimit).join(" ");

  return (
    <Text>
      {truncatedText}
      {words.length > wordLimit && "..."}
    </Text>
  );
};

export default function CardHouseTenant({ data }) {
  const navigate = useNavigate();
  function handleHouseClick (houseId) {
    navigate(`${PATHS.tenantHouses}/${houseId}`)
  }
  return (
    <div>
      <Card maxW="sm">
        <CardBody>
          <Image
            height="200px"
            width="300px"
            src={data?.image ||"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{data?.name}</Heading>
            <Text>
              {`${data?.address}, ${data?.district}`}
            </Text>
            <TruncatedText text={data?.description} wordLimit={13} />
            <Text>
              {`Còn: ${data?.roomCount - data?.rentedRoomCount} phòng`}
            </Text>
            <Text color="blue.600" fontSize="2xl">
              {`${data?.priceMin}đ - ${data?.priceMax}đ`}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter justifyContent="center">
            <Button variant="solid" colorScheme="blue" onClick={() => handleHouseClick(data.id)}>
              Xem chi tiết
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
