import { View, Text } from 'react-native'
import React, { useCallback, useState } from 'react'
import YoutubePlayer from "react-native-youtube-iframe";


function getYouTubeVideoId(url: string): string | null {
  const regex =
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;

  const match = url.match(regex);
  return match ? match[1] : null;
}

const YoutubePlay = ({videoUri}:{videoUri:string}) => {
    const videoId =  getYouTubeVideoId(videoUri)
    const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state: string) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);
  console.log(videoId)
  return (
    <View>
      <YoutubePlayer key={videoUri} videoId={videoId}
      height={220}
       play={playing}
       onChangeState={onStateChange}
    
    />
    </View>
  )
}

export default YoutubePlay