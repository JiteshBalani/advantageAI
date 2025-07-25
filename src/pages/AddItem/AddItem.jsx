import React, { useState } from "react";
import { Input, Select, Form, message } from "antd";

const { Option } = Select;

const AddItem = () => {
  const [form] = Form.useForm();

  const handleAddItem = (values) => {
    const newItem = {
      id: "itm_" + Date.now(),
      ...values,
      sold: false,
      borrowedBy: null,
    };

    const existing = JSON.parse(localStorage.getItem("userItems")) || [];
    localStorage.setItem("userItems", JSON.stringify([...existing, newItem]));

    message.success(`Item "${values.name}" added successfully!`);
    form.resetFields();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#D3145A]">Add New Item</h2>

      <Form
        layout="vertical"
        form={form}
        onFinish={handleAddItem}
        className="space-y-4"
      >
        <Form.Item
          name="name"
          label="Item Name"
          rules={[{ required: true, message: "Please enter item name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please select category" }]}
        >
          <Select placeholder="Select category">
            <Option value="Tools">Tools</Option>
            <Option value="Outdoors">Outdoors</Option>
            <Option value="Kitchen">Kitchen</Option>
            <Option value="Fitness">Fitness</Option>
            <Option value="Games">Games</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="owner"
          label="Owner Name"
          rules={[{ required: true, message: "Please enter owner name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="condition"
          label="Condition"
          rules={[{ required: true, message: "Please select condition" }]}
        >
          <Select placeholder="Select condition">
            <Option value="Like New">Like New</Option>
            <Option value="Excellent">Excellent</Option>
            <Option value="Very Good">Very Good</Option>
            <Option value="Good">Good</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="available"
          label="Available"
          rules={[{ required: true, message: "Please select availability" }]}
        >
          <Select placeholder="Select availability">
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="image"
          label="Image URL"
          rules={[{ required: true, message: "Please enter image URL" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="location"
          label="Location (Landmark Only)"
          rules={[{ required: false }]}
        >
          <Input placeholder="e.g., Near Bandra Station" />
        </Form.Item>

        <div className="text-center mt-6">
          <button className="bg-[#D3145A] text-white p-2 border font-semibold text-lg" htmlType="submit">
            Add Item
          </button>
        </div>
      </Form>
    </div>
  );
};

export default AddItem;
