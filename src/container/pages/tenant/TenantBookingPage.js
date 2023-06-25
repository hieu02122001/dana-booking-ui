import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from "../../../config/axiosConfig";
import Loading from "../../../components/loading/Loading";
import Empty from "../../../components/empty/Empty";
import ReservationBooking from "../../reservationBooking/ReservationBooking";
import { useAuth } from "../../../context/authContext";
import { toast } from "react-toastify";
import { PATHS } from "../../../utils/paths";

const TenantBookingPage = () => {
  const params = useParams();
  const status = params.status;
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState([]);

  console.log("bookings", bookings);
  useEffect(() => {
    setIsLoading(true);
    http
      .get(`${PATHS.tenantBookings}?status=${status}&&userId=${user.id}`)
      .then((res) => {
        setBookings(res?.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [status, user]);

  const handleReject = (id) => {
    http.put(`${PATHS.tenantBookings}/${id}/status/rejected`).then((res) => {
      toast.success("Huỷ đặt phòng thành công");
      navigate(`${PATHS.tenantBookings}/rejected`);
    });
  };

  const handlePayment = (id) => {
    http.put(`${PATHS.tenantBookings}/${id}/status/success`).then((res) => {
      toast.success("Thanh toán thành công");
      navigate(`${PATHS.tenantBookings}/success`);
    });
  };

  return (
    <div className="px-5 pt-5 w-full">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 gap-6 w-full">
          {bookings && bookings.count > 0 ? (
            bookings.rows.map((item) => {
              return (
                <ReservationBooking
                  key={item?.id}
                  booking={item}
                  handlePayment={handlePayment}
                  handleReject={handleReject}
                  handleReviewFromUser={true}
                />
              );
            })
          ) : (
            <Empty />
          )}
        </div>
      )}
    </div>
  );
};

export default TenantBookingPage;
