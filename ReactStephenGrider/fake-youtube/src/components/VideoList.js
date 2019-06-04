import React from "react";
import VideoItem from "./VideoItem";

const VideoList = props => {
    const list = props.videos.map(el => (
        <VideoItem
            key={el.id.videoId}
            video={el}
            onVideoSelect={props.onVideoSelect}
        />
    ));

    return <div className="ui relaxed divided list">{list}</div>;
};

export default VideoList;
