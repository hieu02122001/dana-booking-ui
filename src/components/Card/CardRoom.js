import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../utils/paths";

export default function CardChakra({ data }) {
  const navigate = useNavigate();

  function handleViewClick () {
    navigate(`${PATHS.landlordRooms}/view/${data.id}`)
  }

  function handleEditClick () {
    navigate(`${PATHS.landlordRooms}/edit/${data.id}`)
  }

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "500px" }}
        maxH={{ base: "100%", sm: "400px"}}
        src={data.image || "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"}
        alt="House"
      />

      <Stack>
        <CardBody>
          <Heading size="md">{data.name}</Heading>
          
          <Text py="2">
            {`${data.description}`}
          </Text>

          <Text py="2">
            {`Price: ${data.price} VND`}
          </Text>

          <Text py="2">
            {`Renter: ${data.user ? data.user.fullName : "(NONE)"}`}
          </Text>
        </CardBody>

        <CardFooter>
          <Button marginRight="10px" variant="solid" colorScheme="green" onClick={handleViewClick}>
            View
          </Button>

          <Button variant="solid" colorScheme="blue" onClick={handleEditClick}>
            Edit
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
}
