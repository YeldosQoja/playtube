type Props = {
  filename: string;
};

export const VideoPlayer = ({ filename }: Props) => {
  return (
    <video
      width={720}
      height={540}
      controls>
      <source
        src={`http://localhost:3000/videos/${filename}`}
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
  );
};
