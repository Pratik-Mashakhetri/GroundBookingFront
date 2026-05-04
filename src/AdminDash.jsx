import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNAv from "./AdminNAv";

export default function AdminDash() {


    const [grounds, setGrounds] = useState([]);

    // Fetch all grounds
    const fetchGrounds = () => {
        axios
            .get("http://localhost:8080/Allgrounds")
            .then((res) => setGrounds(res.data))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetchGrounds();
        
    }, []);

    // Delete ground
    const deleteGround = (id) => {
        axios
            .delete(`http://localhost:8080/deleteground/${id}`)
            .then((res) => {
                alert(res.data);
                fetchGrounds();
            })
            .catch((err) => {
                alert(err.response.data);
            });
    };
    return (
        <div>
            <AdminNAv></AdminNAv>
           <h1>Welcome To Admin Dashboard</h1> 

            <div style={{ padding: "20px" }}>
                <h2>Admin Ground Management</h2>

                <table border="1" width="100%" cellPadding="10">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Type</th>
                            <th>Price/Hour</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {grounds.map((g) => (
                            <tr key={g.id}>
                                <td>{g.id}</td>
                                <td>{g.name}</td>
                                <td>{g.location}</td>
                                <td>{g.type}</td>
                                <td>{g.pricePerHour}</td>
                                <td>
                                    <button>Edit</button>
                                    <button onClick={() => deleteGround(g.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
