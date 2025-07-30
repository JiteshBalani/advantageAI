import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Button, Tag, message, Tooltip } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Items from '../Homepage/Items';
import Loader from '../../components/Loader';

const { Meta } = Card;

const conditionColors = {
  'Like New': 'blue',
  'Excellent': 'green',
  'Very Good': 'lime',
  'Good': 'gray',
};

const ItemPage = () => {
  const { id } = useParams();
  const userItems = JSON.parse(localStorage.getItem("userItems")) || [];
  const allItems = [...Items, ...userItems];
  const [loading, setLoading] = React.useState(false);
  const item = allItems.find(i => i.id === id);

  const handleBorrowRequest = () => {
    const existing = JSON.parse(localStorage.getItem('myRequests')) || [];

    const alreadyRequested = existing.find(req => req.id === item.id);
    setLoading(true)
    setTimeout(() => {
      if (alreadyRequested) {
        message.info('You have already requested this item.');
        setLoading(false);
        return;
      }

      const requestWithTime = {
        ...item, requestTime: new Date().toLocaleString()
      };

      const updated = [...existing, requestWithTime];
      localStorage.setItem('myRequests', JSON.stringify(updated));
      setLoading(false);
      message.success(`Borrow request submitted to ${item.owner}`);
    }, 1000)
  };

  if (!item) {
    return (
      <div className="p-8 pt-[70px]">
        <p className="text-xl font-semibold text-red-500">Item not found.</p>
        <Link to="/">
          <Button icon={<ArrowLeftOutlined />}>Back to Home</Button>
        </Link>
      </div>
    );
  }

  const isAvailable = item.available === 'yes' && item.sold === false;
  if (loading) {
    return <Loader />
  }
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
            <button className='bg-amber-400 text-lg p-2 border font-medium cursor-pointer'
              onClick={handleBorrowRequest}
            >{loading ? 'Requesting...' : 'Request to Borrow'}</button>
          </div>
        ) : <div className="mt-6 flex justify-end ">
          <Tooltip placement="topLeft" title='Already Borrowed' color='#D3145A'>
            <button className='bg-amber-400 cursor-not-allowed grayscale-100 text-lg p-2 border font-medium'
            >Request to Borrow</button>
          </Tooltip>
        </div>}
      </Card>
    </div>
  );
};

export default ItemPage;
