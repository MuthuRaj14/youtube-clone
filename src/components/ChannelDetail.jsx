import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import  Videos from './Videos';
import ChannelCard from './ChannelCard'
import { fetchFromAPI } from '../utils/fetchFormAPI';

const ChannelDetail = () => {
  const { id } = useParams();
  const [channelDetail, setChannelDetail] = useState(null);
  const[videos , setVideos]=useState([])

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) =>
      setChannelDetail(data?.items[0])
    );
    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date&maxResults=50`).then((data) =>
  setVideos(data?.items)
);

  }, [id]);


  return (
    <Box minHeight='95vh'>
      <Box>
        <div style={{background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(224,95,184,1) 0%, rgba(190,1,132,1) 52%, rgba(86,172,240,1) 100%)', zIndex:10 , height:'300px'}}/>
        <ChannelCard channelDetail={channelDetail} marginTop="-110px"/>
      </Box>
      <Box display='flex' p='2'>
        <Box sx={{mr:{sm:'100px'}}}/>
          <Videos videos={videos}/>
        
      </Box>
    </Box>
  );
};

export default ChannelDetail;
