import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Videos from "./Videos.jsx";
import { Box, Typography } from "@mui/material";
import { fetchFromAPI } from "../utils/fetchFormAPI.js";
const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const { searchTerm } = useParams();
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await fetchFromAPI(`search?part=snippet&q=${searchTerm}&maxResults=50`);
        setVideos(data.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchVideos();
  }, [searchTerm]);
  

  return (
    <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
      <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
        Search results for:{" "}
        <span style={{ color: "#F31503" }}>{searchTerm}</span> videos
      </Typography>
      <Videos videos={videos}></Videos>
    </Box>
  );
};

export default SearchFeed;
