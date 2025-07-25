import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Button, Tag, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Items from '../Homepage/MockItems'; 
const { Meta } = Card;

const conditionColors = {
  'Like New': 'blue',
  'Excellent': 'green',
  'Very Good': 'lime',
  'Good': 'gray',
};

const ItemPage = () => {
  const { id } = useParams();
  const item = Items.find(i => i.id === id);
  
  const handleBorrowRequest = () => {
  const existing = JSON.parse(localStorage.getItem('myRequests')) || [];

  // Avoid duplicate requests
  const alreadyRequested = existing.find(req => req.id === item.id);
  if (alreadyRequested) {
    message.info('You have already requested this item.');
    return;
  }

  // Save to localStorage
  const updated = [...existing, item];
  localStorage.setItem('myRequests', JSON.stringify(updated));

  // Show success message
  message.success(`Borrow request submitted to ${item.owner}`);
};

  if (!item) {
    return (
      <div className="p-8">
        <p className="text-xl font-semibold text-red-500">Item not found.</p>
        <Link to="/">
          <Button type="link" icon={<ArrowLeftOutlined />}>Back to Home</Button>
        </Link>
      </div>
    );
  }

  const isAvailable = item.available === 'yes' && item.sold === false;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/">
        <Button type="link" icon={<ArrowLeftOutlined />}>Back to Home</Button>
      </Link>

      <Card
        className="mt-4"
        cover={
          <img
            alt={item.name}
            src={item.image}
            className="h-96 object-contain "
          />
        }
      >
        <Meta
          title={<span className="text-2xl font-semibold">{item.name}</span>}
          description={
            <div className="text-gray-700 mt-4 space-y-2 text-md">
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Category:</strong> <Tag color="volcano">{item.category}</Tag></p>
              <p><strong>Owner:</strong> <Tag>{item.owner}</Tag></p>
              <p>
                <strong>Condition:</strong>{' '}
                <Tag color={conditionColors[item.condition] || 'default'}>
                  {item.condition}
                </Tag>
              </p>
              <p>
                <strong>Status:</strong>{' '}
                {isAvailable ? (
                  <Tag color="green">Available</Tag>
                ) : item.sold ? (
                  <Tag color="red">Sold</Tag>
                ) : (
                  <Tag color="orange">Borrowed by: {item.borrowedBy || 'Unknown'}</Tag>
                )}
              </p>
            </div>
          }
        />

        {isAvailable ? (
          <div className="mt-6 flex justify-end">
            <button className='bg-amber-400 text-lg p-2 border font-medium'
                    onClick={handleBorrowRequest}
            >Request to Borrow</button>
          </div>
        ) : null}
      </Card>
    </div>
  );
};

export default ItemPage;
