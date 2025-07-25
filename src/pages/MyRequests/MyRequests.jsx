import React, { useEffect, useState } from "react";
import { Card, Tag, Button, message } from "antd";
import { Link } from "react-router-dom";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("myRequests")) || [];
    setRequests(stored);
  }, []);

  const handleCancel = (id) => {
    const updated = requests.filter((item) => item.id !== id);
    localStorage.setItem("myRequests", JSON.stringify(updated));
    setRequests(updated);
    message.success("Request canceled.");
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">My Borrow Requests</h2>

      {requests.length === 0 ? (
        <div className="text-center flex flex-col justify-center items-center space-y-5">
        <p className="font-semibold text-xl">You haven't requested any items yet.</p>
        <img style={{width: '500px'}} src="https://cdn4.iconfinder.com/data/icons/office-vol-1-11/16/clipboard-empty-list-shipping-512.png" />
        <Link to='/'><button className="border-black border-2 bg-[#D3145A] text-lg font-semibold text-white p-2 w-full"> 🔙Go back to home</button></Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {requests.map((item) => (
            <Card
              key={item.id}
              size="small"
              title={
                <Link to={`/items/${item.id}`} className="text-lg font-semibold  hover:underline">
                  <span className="text-[#D3145A]">{item.name}</span>
                </Link>
              }
              extra={<Tag color="orange">{item.category}</Tag>}
              className="shadow-md rounded-lg"
            >
              <div className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-contain rounded"
                />
                <div className="flex flex-col justify-between text-sm">
                  <p><strong>Owner:</strong> {item.owner}</p>
                  <p><strong>Condition:</strong> {item.condition}</p>
                  <p><strong>Status:</strong> Pending</p>

                  <Button
                    // type="link"
                    danger
                    size="medium"
                    className="p-0 mt-1"
                    onClick={() => handleCancel(item.id)}
                  >
                    Cancel Request
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRequests;
