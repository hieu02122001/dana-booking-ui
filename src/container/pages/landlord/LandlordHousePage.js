import { useNavigate } from 'react-router-dom';
import Card from '../../../components/Card/CardHouse'
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/authContext';
import { PATHS } from '../../../utils/paths';
import http from '../../../config/axiosConfig';
import { Button } from '@chakra-ui/react';
import { BsFillHouseAddFill } from 'react-icons/bs';

export default function LandlordHousePage() {
  const navigate = useNavigate();
  const [houseList, setHouseList] = useState([]);
  const { user } = useAuth();

  const getHouseList = () => {
    if (!localStorage.token) {
      navigate(PATHS.landlordLogin);
    }
    http
      .get(`${PATHS.landlordHouses}`)
      .then((res) => {
        const list = res?.data?.rows?.map((item) => {
          const houses = {
            id: item.id,
            name: item.name,
            description: item.description,
            image: item.image,
            district: item.district ? item.district.name : "(None)",
            address: item.address,
            roomCount: item.roomCount,
            rentedRoomCount: item.rentedRoomCount,
            isActivated: item.isActivated ? "Yes" : "No",
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          };
          return houses;
        });
        setHouseList(list);
        console.log(list);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //
  useEffect(() => {
    getHouseList();
  }, [user]);
  //
  return (
    <div>
      <div className="flex flex-row justify-between">
        <h1 className="font-semibold text-primary text-2xl">
          QUẢN LÝ NHÀ TRỌ
        </h1>
        <Button
          leftIcon={<BsFillHouseAddFill />}
          onClick={() => navigate(PATHS.landlordAddHouses)}
          className="ml-auto"
          colorScheme="green"
          variant="outline"
        >
          Thêm
        </Button>
      </div>
      {
        houseList.map((item) => {
          return <Card data={item} key={item.id}/>
        })
      }
    </div>
  );
}
