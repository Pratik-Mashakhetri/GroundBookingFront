import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserNav } from "./UserNav";

export const BookGround = () => {
  const [grounds, setGrounds] = useState([]);
  const [selectedGround, setSelectedGround] = useState(null);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchGrounds();
  }, []);

  const fetchGrounds = () => {
    axios
      .get("http://localhost:8080/Allgrounds")
      .then((res) => setGrounds(res.data))
      .catch(() => alert("Error fetching grounds"));
  };

  // ✅ OPEN MODAL
  const openBooking = (ground) => {
    setSelectedGround(ground);
    setStartTime("");
    setEndTime("");
  };

  // ✅ CLOSE MODAL
  const closeModal = () => {
    setSelectedGround(null);
  };

  // ✅ BOOK API CALL
  const handleBooking = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      if (!startTime || !endTime) {
        alert("Please select time");
        return;
      }

      const bookingData = {
        userId: user.id,
        groundId: selectedGround.id,
        startTime,
        endTime,
      };

      const res = await axios.post(
        "http://localhost:8080/booking/create",
        bookingData
      );

      alert(res.data);
      closeModal();

    } catch (err) {
      console.error(err);
      alert("Booking failed");
    }
  };

  return (
    <div>
      <UserNav />

      <div className="container mt-4">
        <h2 className="text-center mb-4">Book Grounds</h2>

        <div className="row">
          {grounds.map((g) => (
            <div className="col-md-4 mb-4 d-flex" key={g.id}>
              <div className="card shadow w-100">

                {/* CAROUSEL */}
                {g.images && g.images.length > 0 ? (
                  <div
                    id={`carousel${g.id}`}
                    className="carousel slide"
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-inner">
                      {g.images.map((img, index) => (
                        <div
                          key={index}
                          className={`carousel-item ${index === 0 ? "active" : ""}`}
                        >
                          <img
                            src={`http://localhost:8080/images/${img}`}
                            className="d-block w-100"
                            style={{ height: "250px", objectFit: "cover" }}
                            alt="ground"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <img
                    src="https://via.placeholder.com/400x250"
                    className="d-block w-100"
                    style={{ height: "250px", objectFit: "cover" }}
                    alt="no-img"
                  />
                )}

                {/* BODY */}
                <div className="card-body">
                  <h5>{g.name}</h5>
                  <p>{g.location}</p>
                  <p>₹{g.pricePerHour}/hr</p>
                  <p>{g.type}</p>

                  <button
                    className="btn btn-success w-100"
                    onClick={() => openBooking(g)}
                  >
                    Book Now
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ BOOKING MODAL */}
      {selectedGround && (
        <div className="modal show d-block" style={{ background: "rgba(0,0,0,0.6)" }}>
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">
                  Book: {selectedGround.name}
                </h5>
                <button className="btn-close" onClick={closeModal}></button>
              </div>

              <div className="modal-body">
                <label>Start Time</label>
                <input
                  type="datetime-local"
                  className="form-control mb-3"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />

                <label>End Time</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>
                  Cancel
                </button>

                <button className="btn btn-primary" onClick={handleBooking}>
                  Confirm Booking
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};