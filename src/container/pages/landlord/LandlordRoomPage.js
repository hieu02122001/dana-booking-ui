import { useNavigate, useParams } from "react-router-dom";
import CardRoom from "../../../components/Card/CardRoom";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/authContext";
import { PATHS } from "../../../utils/paths";
import http from "../../../config/axiosConfig";

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
      <h1 className="font-bold text-2xl text-primary">HOUSE: {houseName}</h1>
      {roomList.map((item) => {
        return <CardRoom data={item} key={item.id} />;
      })}
    </div>
  );
}
