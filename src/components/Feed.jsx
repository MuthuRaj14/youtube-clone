import React from "react";
import { useState, useEffect } from "react";
import Videos from "./Videos.jsx";
import { Box, Stack, Typography } from "@mui/material";
import Sidebar from "./Sidebar.jsx";
import { fetchFromAPI } from "../utils/fetchFormAPI.js";
const Feed = () => {
  const [selectedCategory, setSeletedCategory] = useState("New");
  const[videos,setVideos]=useState([])
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await fetchFromAPI(`search?part=snippet&q=${selectedCategory}&maxResults=50`);
        setVideos(data.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchVideos();
  }, [selectedCategory]);
   
  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSeletedCategory={setSeletedCategory}
        />
        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: "#fff" }}
        >
          Copyright 2024 MuthuRaj KMMR
        </Typography>
      </Box>
      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white" }}
        >
          {selectedCategory} <span style={{ color: "#F31503" }}>videos</span>
        </Typography>
        <Videos videos={videos}></Videos>
      </Box>
    </Stack>
  );
};

export default Feed;
