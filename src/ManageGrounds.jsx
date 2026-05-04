import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNAv from "./AdminNAv";
import "./css/managegrounds.css";
import { useNavigate } from "react-router-dom";

// IMPORTANT: make sure bootstrap JS is imported somewhere (index.js)
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

export const ManageGrounds = () => {
  const [grounds, setGrounds] = useState([]);
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

  const handleDelete = (id) => {
    if (
      window.confirm(
        "This action cannot be undone.\nDo you really want to delete this ground?"
      )
    ) {
      axios
        .delete(`http://localhost:8080/deleteground/${id}`)
        .then(() => {
          alert("Ground Deleted");
          fetchGrounds();
        })
        .catch(() => alert("Delete failed"));
    }
  };

  return (
    <div>
      <AdminNAv />

      <div className="container mt-4">
        <h2 className="text-center mb-4">Manage Grounds</h2>

        <div className="row">
          {grounds.map((g) => (
            <div className="col-md-4 mb-4 d-flex" key={g.id}>
              <div className="card shadow w-100 ground-card">

                {/* ✅ CAROUSEL START */}
                {g.images && g.images.length > 0 ? (
                  <div
                    id={`carousel${g.id}`}
                    className="carousel slide"
                    data-bs-ride="carousel"
                    data-bs-interval="2500"
                  >
                    {/* INDICATORS */}
                    {g.images.length > 1 && (
                      <div className="carousel-indicators">
                        {g.images.map((_, index) => (
                          <button
                            key={index}
                            type="button"
                            data-bs-target={`#carousel${g.id}`}
                            data-bs-slide-to={index}
                            className={index === 0 ? "active" : ""}
                          ></button>
                        ))}
                      </div>
                    )}

                    {/* IMAGES */}
                    <div className="carousel-inner">
                      {g.images.map((img, index) => (
                        <div
                          key={index}
                          className={`carousel-item ${index === 0 ? "active" : ""
                            }`}
                        >
                          <img
                            src={`http://localhost:8080/images/${img}`}
                            className="d-block w-100"
                            style={{
                              height: "250px",
                              objectFit: "cover",
                            }}
                            alt="ground"
                          />
                        </div>
                      ))}
                    </div>

                    {/* CONTROLS */}
                    {g.images.length > 1 && (
                      <>
                        <button
                          className="carousel-control-prev"
                          type="button"
                          data-bs-target={`#carousel${g.id}`}
                          data-bs-slide="prev"
                        >
                          <span className="carousel-control-prev-icon"></span>
                        </button>

                        <button
                          className="carousel-control-next"
                          type="button"
                          data-bs-target={`#carousel${g.id}`}
                          data-bs-slide="next"
                        >
                          <span className="carousel-control-next-icon"></span>
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  <img
                    src="https://via.placeholder.com/400x250?text=No+Image"
                    className="d-block w-100"
                    style={{ height: "250px", objectFit: "cover" }}
                    alt="no-img"
                  />
                )}
                {/* ✅ CAROUSEL END */}

                {/* BODY */}
                <div className="card-body">
                  <h5>Name: {g.name}</h5>
                  <p>Location: {g.location}</p>
                  <p> Charges: 
                    ₹{g.pricePerHour}/hr | ₹{g.pricePerDay}/day
                  </p>
                  <p>Type: {g.type}</p>
                  <p className="ground-desc">Description: {g.description}</p>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-warning w-50"
                      onClick={() => navigate(`/update-ground/${g.id}`)}
                    >
                      Update
                    </button>

                    <button
                      className="btn btn-danger w-50"
                      onClick={() => handleDelete(g.id)}
                    >
                      Delete
                    </button>
                  </div>


                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};