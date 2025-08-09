import React, { useEffect, useState } from "react";
import { Card, Tag, Button, message } from "antd";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from '@ant-design/icons';

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [cancelRequests, setCancelRequests] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("myRequests")) || [];
    setRequests(stored);
  }, []);

  const handleCancel = (id) => {
    const requestedItems = JSON.parse(localStorage.getItem('myRequests')) || [];
    const cancelItem = requestedItems.find(req => req.id === id);
    const prevCancelled = JSON.parse(localStorage.getItem('cancelledRequests')) || [];
    const cancelWithTime = {
      ...cancelItem, cancelTime: new Date().toLocaleString()
    };
    const updatedCancelled = [...prevCancelled, cancelWithTime];
    localStorage.setItem('cancelledRequests', JSON.stringify(updatedCancelled));
    setCancelRequests(updatedCancelled);

    const updatedRequests = requestedItems.filter(req => req.id !== id)
    localStorage.setItem('myRequests', JSON.stringify(updatedRequests));
    setRequests(updatedRequests);
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('myRequests')) || [];
    setRequests(stored);

    const cancelled = JSON.parse(localStorage.getItem('cancelledRequests')) || [];
    setCancelRequests(cancelled);
  }, []);

  return (
  <div className="max-w-4xl mx-auto p-4 pt-[70px]">
    <h2 className="text-2xl font-semibold mb-6">My Borrow Requests</h2>

    {/* When no active requests */}
    {requests.length === 0 && (
      <div className="text-center flex flex-col-reverse justify-center items-center space-y-5">
        <p className="font-semibold text-xl">
          You haven't requested any items yet.
        </p>
        <img
          style={{ width: "250px" }}
          src="https://cdn4.iconfinder.com/data/icons/office-vol-1-11/16/clipboard-empty-list-shipping-512.png"
        />
        <Link to="/">
          <button className=" px-2 mb-2 bg-[#D3145A] text-lg font-semibold text-white p-1 w-full cursor-pointer">
            <ArrowLeftOutlined /> Go back to home
          </button>
        </Link>
      </div>
    )}

    {/* Active requests section */}
    {requests.length > 0 && (
      <div>
        {requests.map((item) => (
          <Card
            key={item.id}
            size="small"
            title={
              <Link
                to={`/items/${item.id}`}
                className="text-lg font-semibold hover:underline"
              >
                <span className="text-[#D3145A]">{item.name}</span>
              </Link>
            }
            extra={<Tag color="orange">{item.category}</Tag>}
            style={{marginBottom: '10px'}}
            className="shadow-md rounded-lg"
          >
            <div className="flex justify-between items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-30 h-30 object-contain rounded"
              />
              <div className="flex items-center justify-between text-sm">
                <div className="flex flex-col justify-between text-sm">
                <p><strong>Owner:</strong> {item.owner}</p>
                <p><strong>Condition:</strong> {item.condition}</p>
                <p><strong>Status:</strong> Pending</p>
                <p className="bg-amber-200 px-1"><strong>Request date:</strong>
                <p> {item.requestTime} </p>
                </p>
                </div>
                </div>
                <Button
                  danger
                  size="medium"
                  className="p-0 mt-1"
                  onClick={() => handleCancel(item.id)}
                >
                  Cancel Request
                </Button>
              
              
            </div>
          </Card>
        ))}
      </div>
    )}

    {/* Cancelled requests section — always show if any */}
    {cancelRequests.length > 0 && (
      <div>
        <h2 className="text-xl text-[#D3145A] font-semibold mb-2 mt-10">Cancelled Requests</h2>
        {cancelRequests.map((item) => (
          <Card
            key={item.id}
            size="small"
            title={
              <Link
                to={`/items/${item.id}`}
                className="text-lg font-semibold hover:underline"
              >
                <span className="text-gray-500">{item.name}</span>
              </Link>
            }
            extra={<Tag color="grey">{item.category}</Tag>}
            style={{marginBottom: '10px'}}
            className="shadow-md rounded-lg"
          >
            <div className="flex justify-between items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-30 h-30 object-contain rounded grayscale-100"
              />
              <div className="flex items-center justify-between text-sm">
              <div className="flex flex-col justify-between text-sm">
                <p><strong>Owner:</strong> {item.owner}</p>
                <p><strong>Condition:</strong> {item.condition}</p>
                <p><strong>Status:</strong> Cancelled</p>
                <p><strong>Request Date:</strong> {item.requestTime}</p>
                <p className="bg-red-200 px-2">
                  <strong>Cancel Date:</strong> 
                  <p>{item.cancelTime}</p>
                </p>
              </div>
              </div>
              <Link to={`/items/${item.id}`}>
              <button className="p-4 py-1 cursor-pointer border border-amber-500 text-amber-500 font-medium rounded-md">Request Again</button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    )}
  </div>
);


};


export default MyRequests;
