import { useNavigate } from 'react-router-dom';
import Card from '../../../components/Card/Card'
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/authContext';
import { PATHS } from '../../../utils/paths';
import http from '../../../config/axiosConfig';

export default function LandlordHousePage() {
  const navigate = useNavigate();
  const [houseList, setHouseList] = useState([]);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const getHouseList = () => {
    if (!localStorage.token) {
      navigate(PATHS.landlordLogin);
    }
    setIsLoading(true);
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
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }
  //
  useEffect(() => {
    getHouseList();
  }, [user]);
  //
  return (
    <div>
      {
        houseList.map((item) => {
          return <Card data={item} key={item.id}/>
        })
      }
    </div>
  );
}
