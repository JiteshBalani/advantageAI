import React, { useEffect, useState } from "react";
import { Card, Tag } from "antd";
import { Link } from "react-router-dom";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("myRequests")) || [];
    setRequests(stored);
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Borrow Requests</h2>

      {requests.length === 0 ? (
        <p className="text-gray-600">You haven't requested any items yet.</p>
      ) : (
        requests.map((item) => (
          <Card
            key={item.id}
            className="mb-4"
            title={
              <Link to={`/items/${item.id}`} >
                <span className="bg-amber-500 text-black p-3">{item.name}</span>
              </Link>
            }
            extra={<Tag color="#f50">{item.category}</Tag>}
          >
          <div className="flex justify-between items-center">
          <div>
            <img
                alt={item.name}
                src={item.image}
                style={{ height: "150px", objectFit: "contain" }}
              />
          </div>
          <div>

            <p>
              <strong>Owner:</strong> {item.owner}
            </p>
            <p>
              <strong>Condition:</strong> {item.condition}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {item.available === "yes" ? "Available" : "Unavailable"}
            </p>
          </div>
          </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default MyRequests;
