/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";

const ListAllCategory = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the server
    axios
      .get("http://localhost:3001/api/fetchData")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
  }, []);

  return (
    <div style={{ position: "absolute", top: 100 }}>
      <h2>Fetched Data</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListAllCategory;
