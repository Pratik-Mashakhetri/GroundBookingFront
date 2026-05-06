import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserNav } from "./UserNav";

export const MyBookings = () => {

  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("userinfo");

    if (!storedUser) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    const user = JSON.parse(storedUser);
    fetchBookings(user.id);
  }, []);

  const fetchBookings = async (userId) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/booking/user/${userId}`
      );
      setBookings(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching bookings");
    }
  };

  // ✅ Cancel Booking
  const cancelBooking = async (bookingId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel?");
    if (!confirmCancel) return;

    try {
      await axios.put(`http://localhost:8080/booking/cancel/${bookingId}`);

      const user = JSON.parse(localStorage.getItem("userinfo"));
      fetchBookings(user.id);

    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Cancel failed");
    }
  };

  // ✅ Dynamic Status
const getDisplayStatus = (b) => {
  const now = new Date();
  const start = new Date(b.startTime);
  const end = new Date(b.endTime);

  // 🔴 backend override
  if (b.status === "CANCELLED") return "CANCELLED";

  // ✅ auto logic
  if (end < now) return "COMPLETED";
  if (start <= now && end >= now) return "STARTED";

  return "BOOKED";
};

  // ✅ Badge Color
  const getStatusColor = (b) => {
    const status = getDisplayStatus(b);

    switch (status) {
      case "CANCELLED":
        return "bg-danger";        // 🔴
      case "COMPLETED":
        return "bg-primary";       // 🔵
      case "STARTED":
        return "bg-warning text-dark"; // 🟡
      case "BOOKED":
        return "bg-success";       // 🟢
      default:
        return "bg-secondary";
    }
  };

  // ✅ Button Text
  const getButtonText = (b) => {
    const status = getDisplayStatus(b);

    if (status === "CANCELLED") return "Cancelled";
    if (status === "COMPLETED") return "Completed";
    if (status === "STARTED") return "Started";
    return "Cancel Booking";
  };

  // ✅ Button Style (🔥 THIS FIXES YOUR ISSUE)
  const getButtonStyle = (b) => {
    const status = getDisplayStatus(b);

    switch (status) {
      case "CANCELLED":
        return "btn btn-secondary"; // gray
      case "COMPLETED":
        return "btn btn-primary";   // blue
      case "STARTED":
        return "btn btn-warning text-dark"; // yellow
      case "BOOKED":
        return "btn btn-danger";    // red
      default:
        return "btn btn-secondary";
    }
  };

  // ✅ Disable logic
  const isCancelDisabled = (b) => {
    const status = getDisplayStatus(b);
    return status !== "BOOKED";
  };

  return (
    <div>
      <UserNav />

      <div className="container mt-4">
        <h2 className="text-center mb-4">My Bookings</h2>

        {bookings.length === 0 ? (
          <p className="text-center">No bookings found</p>
        ) : (
          <div className="row">
            {bookings.map((b) => (
              <div className="col-md-4 mb-4" key={b.id}>
                <div className="card shadow h-100">

                  {/* Image */}
                  {b.ground?.images?.length > 0 ? (
                    <img
                      src={`http://localhost:8080/images/${b.ground.images[0]}`}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                      alt="ground"
                    />
                  ) : (
                    <img
                      src="https://via.placeholder.com/400x200"
                      className="card-img-top"
                      alt="no-img"
                    />
                  )}

                  {/* Body */}
                  <div className="card-body d-flex flex-column">

                    <h5><strong>{b.ground?.name}</strong></h5>
                    <p className="text-muted">{b.ground?.location}</p>

                    <p>
                      <strong>Start:</strong><br />
                      {new Date(b.startTime).toLocaleString()}
                    </p>

                    <p>
                      <strong>End:</strong><br />
                      {new Date(b.endTime).toLocaleString()}
                    </p>

                    <p>
                      <strong>Total:</strong> ₹{b.totalAmount}
                    </p>

                    {/* Status */}
                    <p>
                      <strong>Status: </strong>
                      <span className={`badge ${getStatusColor(b)}`}>
                        {getDisplayStatus(b)}
                      </span>
                    </p>

                    {/* 🔥 BIG BUTTON FIXED */}
                    <button
                      className={`${getButtonStyle(b)} mt-auto w-100`}
                      style={{ borderRadius: "10px" }}
                      disabled={isCancelDisabled(b)}
                      onClick={() => cancelBooking(b.id)}
                    >
                      {getButtonText(b)}
                    </button>

                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};