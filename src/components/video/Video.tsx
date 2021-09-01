import * as React from "react";
import classNames from "classnames";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-hls-quality-selector";
import "videojs-hls-quality-selector/dist/videojs-hls-quality-selector.css";
import styles from "./Video.module.css";

interface VideoProps {
  src: string;
  className?: string;
  options?: any;
  autoResolution?: boolean;
  onError?: React.DOMAttributes<HTMLVideoElement>["onError"];
}

type VideoPlayer = videojs.Player & {
  updateSrc: (...args: any[]) => void;
};

const Video: React.FC<VideoProps> = ({
  src,
  options,
  className,
  onError = () => {},
}) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const playerRef = React.useRef<VideoPlayer>();

  const posterError = React.useRef(false);

  React.useEffect(() => {
    if (playerRef.current && playerRef.current.dispose) {
      playerRef.current.dispose();
    }
    if (!videoRef.current) {
      return;
    }
    playerRef.current = videojs(
      videoRef.current,
      {
        controls: true,
        fluid: true,
        hlsQualitySelector: { displayCurrentQuality: true },
        ...options,
      },
      () => {
        playerRef.current?.src([{ src, type: "application/x-mpegURL" }]);
      }
    ) as VideoPlayer;

    return () => {
      playerRef.current?.dispose();
    };
  }, []);

  React.useEffect(() => {
    playerRef.current?.width(options?.width);
  }, [options?.width]);

  React.useEffect(() => {
    playerRef.current?.height(options?.height);
  }, [options?.height]);

  React.useEffect(() => {
    playerRef.current?.src([{ src, type: "application/x-mpegURL" }]);
  }, [src]);

  return (
    <div className={classNames(className, styles.wrapper)}>
      <video
        ref={videoRef}
        className="video-js"
        onError={(event) => {
          if (posterError.current) {
            onError(event);
          }
        }}
      />
    </div>
  );
};

export default Video;
