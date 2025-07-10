// src/components/public/VideoPlayer.tsx
"use client";

// Fungsi untuk mengekstrak ID video dari URL YouTube
const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

type VideoPlayerProps = {
  videoUrl: string;
};

export default function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  const videoId = getYouTubeId(videoUrl);

  if (!videoId) {
    return <p>Invalid YouTube URL</p>;
  }

  return (
    // Container untuk menjaga rasio aspek 16:9
    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}