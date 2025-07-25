import React, { useState } from "react";
import { Card, Col, Row, Badge, Input, Button, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Items from "./MockItems";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setLoading } from '../../app/loaderSlice';
import Loader from '../../components/Loader';

const { Meta } = Card;

const Homepage = () => {

  const userItems = JSON.parse(localStorage.getItem("userItems")) || [];
  const allItems =[...Items, ...userItems];
  const [items, setItems] = useState(allItems);
  console.log(allItems);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const search = e.target.value.toLowerCase();
    const filteredItems = allItems.filter(item => item.name.toLowerCase().includes(search));
    setItems(filteredItems);
  }

  const sort = (key, direction = 'asc') => {
    const sorted = [...allItems].sort((a, b) => {
      const valA = a[key]?.toString().toLowerCase();
      const valB = b[key]?.toString().toLowerCase();

      if (direction === 'asc') {
        return valA.localeCompare(valB);
      } else {
        return valB.localeCompare(valA);
      }
    });
    setItems(sorted);
  };

  const filterItems = (key, value) => {
    if(value === 'All Items' || value === 'Category'){
      setItems(allItems)
      return;
    }
    const filteredItems = Items.filter(item => item[key]?.toLowerCase().includes(value.toLowerCase()));
    setItems(filteredItems);
  }

  const conditionStyles = {
    "Excellent": "text-green-600 font-semibold border p-1 text-center text-md",
    "Very Good": "text-amber-400 font-semibold border p-1 text-center text-md",
    "Like New": "text-blue-500 font-semibold border p-1 text-center text-md",
  };

  const getConditionClass = (condition) =>
    conditionStyles[condition] || "text-gray-500 font-semibold border p-1 text-center text-md";

  return (
    <div style={{ padding: "2px" }}>
      <div className="mb-2 p-2 rounded-xl flex flex-col md:flex-row md:items-center md:space-x-6 space-y-3 md:space-y-0">
        {/* Search box */}
        <div className="flex items-center flex-1">
          <Input
            size="large"
            className="flex-1 bg-transparent "
            placeholder="Search an item"
            onChange={handleSearch}
            suffix={<SearchOutlined style={{ color: "black" }} />}
          />
        </div>
      <Button onClick={() => setItems(Items)}>Reset Item List</Button>

        {/* Sort section */}
        <div className="flex items-center font-semibold space-x-2">
          <span className="font-semibold">Sort:</span>
          <Button onClick={() => sort('name', 'asc')} size="small">A-Z</Button>
          <Button onClick={() => sort('name', 'des')} size="small">Z-A</Button>
          <Button onClick={() => sort('category', 'asc')} size="small">Category</Button>
          <Button onClick={() => sort('owner', 'asc')} size="small">Owner</Button>
        </div>

        {/* Filter section */}
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Filter:</span>
          <Select
            defaultValue="Category"
            style={{ width: 120 }}
            onChange={(val) => filterItems("category", val)}
          >
            <Option value="Category">Category</Option>
            <Option value='Tools' >Tools</Option>
            <Option value='Outdoors'>Outdoors</Option>
            <Option value='Kitchen'>Kitchen</Option>
            <Option value='Fitness'>Fitness</Option>
            <Option value='Games'>Games</Option>
          </Select>
          <Select
            defaultValue="All Items"
            style={{ width: 120 }}
            onChange={(val) => filterItems('available', val)}
          >
            <Option onClick={() => setItems(Items)} value="All Items">All Items</Option>
            <Option value='yes'>Available</Option>
            <Option value='no'>Borrowed</Option>
            {/* Add filter options */}
          </Select>
        </div>
      </div>
      <div className="text-xl font-semibold py-4">
        Discover amazing items shared by your neighbors.
      </div>
      <Row gutter={[16, 16]}>
        {allItems.map((item) => (
          <Col key={item.id} xs={24} sm={12} md={8} lg={6} xl={6}>
            <Link to={`/items/${item.id}`}>
            <Badge.Ribbon text={item.category} color="volcano">
              <Card
                hoverable
                cover={
                  <img
                    alt={item.name}
                    src={item.image}
                    style={{ height: "300px", objectFit: "contain" }}
                  />
                }
              >
                <Meta
                  title={item.name}
                  description={
                    <div className="text-gray-600">
                      <div>{item.description}</div>
                      <div>
                        <strong>Category:</strong> {item.category}
                      </div>
                      <div>
                        <strong>Owner:</strong> {item.owner}
                      </div>
                      <div className="flex justify-between items-center">
                        <strong >
                          <div className={getConditionClass(item.condition)}>
                            {item.condition}
                          </div>
                        </strong>
                        <Link to={`/items/${item.id}`}><div className='cursor-pointer font-semibold underline text-md'>View Details</div></Link>
                        {item.borrowedBy === null ? (
                          <div className="font-semibold text-black text-md border bg-amber-400 p-1 text-center">
                            Available
                          </div>
                        ) : (
                          <div className="bg-[#D3145A] text-center text-md border-black border text-white font-semibold p-1">
                            {" "}
                            Borrowed
                          </div>
                        )}
                      </div>

                    </div>
                  }
                />
              </Card>
            </Badge.Ribbon>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Homepage;
