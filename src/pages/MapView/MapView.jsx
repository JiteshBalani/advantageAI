import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import { Select } from "antd";
import { Link } from "react-router-dom";
import Items from "../Homepage/Items";

const { Option } = Select;

// Default coordinates for fallback (e.g., Mumbai)
const DEFAULT_COORDS = [19.0760, 72.8777];

const getRandomCoords = () => {
  const latOffset = Math.random() * 0.05;
  const lngOffset = Math.random() * 0.05;
  return [DEFAULT_COORDS[0] + latOffset, DEFAULT_COORDS[1] + lngOffset];
};

const generateMockLocations = (items) => {
  return items.map((item) => ({
    ...item,
    coords: item.coords || getRandomCoords(),
  }));
};

const LocationMarker = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 12);
    }
  }, [position, map]);

  return position ? <Marker position={position} icon={L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconSize: [30, 30]
  })} /> : null;
};

const MapView = () => {
  const mockItems = JSON.parse(localStorage.getItem("userItems")) || [];
  const allItems = generateMockLocations([...mockItems, ...Items]);

  const [items, setItems] = useState(allItems);
  const [userPosition, setUserPosition] = useState(null);

  // Geolocation
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserPosition([latitude, longitude]);
      },
      (err) => {
        console.warn("Geolocation error:", err);
        setUserPosition(DEFAULT_COORDS);
      }
    );
  }, []);

  const handleFilter = (key, value) => {
    if (value === "All") return setItems(allItems);
    const filtered = allItems.filter(
      (item) => item[key]?.toLowerCase() === value.toLowerCase()
    );
    setItems(filtered);
  };

  return (
    <div className="p-10 pt-[70px]">
      <div className="flex gap-4 mb-4">
        <Select
          defaultValue="All"
          style={{ width: 160 }}
          onChange={(val) => handleFilter("category", val)}
        >
          <Option value="All">All Categories</Option>
          <Option value="Tools">Tools</Option>
          <Option value="Outdoors">Outdoors</Option>
          <Option value="Kitchen">Kitchen</Option>
          <Option value="Fitness">Fitness</Option>
          <Option value="Games">Games</Option>
        </Select>

        <Select
          defaultValue="All"
          style={{ width: 160 }}
          onChange={(val) => handleFilter("available", val)}
        >
          <Option value="All">All Availability</Option>
          <Option value="yes">Available</Option>
          <Option value="no">Not Available</Option>
        </Select>
      </div>

      <MapContainer center={DEFAULT_COORDS} zoom={10} style={{ height: "80vh", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <LocationMarker position={userPosition} />

        {/* <MarkerClusterGroup> */}
          {items.map((item) => (
            <Marker key={item.id} position={item.coords}>
              <Popup>
                <div className="text-center w-40">
                  <img src={item.image} alt={item.name} className="w-full h-20 object-cover mb-2 rounded" />
                  <div className="font-bold text-sm">{item.name}</div>
                  <div className="text-xs text-gray-500 mb-1">{item.category}</div>
                  <Link to={`/items/${item.id}`} className="text-blue-600 underline text-xs">
                    View Details
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        {/* </MarkerClusterGroup> */}
      </MapContainer>
    </div>
  );
};

export default MapView;
