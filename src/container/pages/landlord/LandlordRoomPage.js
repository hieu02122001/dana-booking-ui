import { useNavigate, useParams } from "react-router-dom";
import CardRoom from "../../../components/Card/CardRoom";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/authContext";
import { PATHS } from "../../../utils/paths";
import http from "../../../config/axiosConfig";
import { Button } from "@chakra-ui/react";
import { BsFillDoorOpenFill } from "react-icons/bs";

export default function LandlordRoomPage() {
  const navigate = useNavigate();
  const [roomList, setRoomList] = useState([]);
  const { houseId } = useParams();
  const [houseName, setHouseName] = useState("");
  const { user } = useAuth();

  http
    .get(`${PATHS.landlordHouses}/${houseId}`)
    .then((res) => {
      setHouseName(res.data.name);
    })
    .catch((err) => {
      console.log(err);
    });

  const getRoomList = () => {
    if (!localStorage.token) {
      navigate(PATHS.landlordLogin);
    }
    http
      .get(`${PATHS.landlordRooms}?houseId=${houseId}`)
      .then((res) => {
        const list = res?.data?.rows?.map((item) => {
          const houses = {
            id: item.id,
            name: item.name,
            houseId: item.houseId,
            userId: item.userId,
            user: item.user || null,
            images: item.images,
            price: item.price,
            description: item.description || "(NONE)",
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          };
          return houses;
        });
        setRoomList(list);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //
  useEffect(() => {
    getRoomList();
  }, [user]);
  //
  return (
    <div>
      <div className="flex flex-row justify-between">
        <h1 className="font-bold text-2xl text-primary">{houseName}</h1>
        <Button
          leftIcon={<BsFillDoorOpenFill />}
          onClick={() =>
            navigate(PATHS.landlordAddRooms, { state: { houseId } })
          }
          className="ml-auto"
          colorScheme="green"
          variant="outline"
        >
          Thêm
        </Button>
      </div>
      {roomList.map((item) => {
        return <CardRoom data={item} key={item.id} />;
      })}
    </div>
  );
}
