import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { Link, useParams } from "react-router-dom";
import { Typography, Box, Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import Videos from "./Videos";
import { fetchFromAPI } from "../utils/fetchFormAPI";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState([]); // Initialize to an empty array
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideoDetail(data.items[0])
    );

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
    .then((response) => {
      // Check if the response contains the expected data
      if (response.items) {
        setVideos(response.items);
      }
    })
    .catch((error) => {
      console.error('Error fetching related videos:', error);
    });
  }, [id]);

  // Check if videoDetail exists before rendering its content
  if (!videoDetail?.snippet) return <Typography>Loading...</Typography>;

  const {
    snippet: { title, channelTitle, channelId },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            {/* Check if snippet exists before rendering */}
            <Typography variant="h5" color="white" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#FFF" }}
              py={1}
              px={2}
            >
              <Typography variant={{ sm: "subtitle1", md: "h6" }} color="#FFF">
                {channelTitle}
                <CheckCircle sx={{fontSize:"12px" , color:'gray' ,ml:"5px"}} />
              </Typography>
              <Stack direction='row' gap='20px' alignItems='center'>
                <Typography variant="body1" sx={{opacity:0.7}}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{opacity:0.7}}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Stack>
      <Box px={2} py={{md:1 , xs:5}} justifyContent='center' alignItems='center'>
        <Videos videos={videos}/>
      </Box>
    </Box>
  );
};

export default VideoDetail;
