import React, { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";

function CapturePhoto({setImage, hide}) {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          setStream(mediaStream);
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    startCamera();

    return () => {
      if (stream && stream.getTracks) {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  const capturePhoto = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    setImage(canvas.toDataURL("image/png"));
    hide(false);
  };

  return (
    <div className="absolute h-4/6 w-2/6 top-1/4 left-1/3 gap-3 flex items-center justify-center bg-gray-900 rounded-lg">
      <div className="flex flex-col gap-4 w-full items-center justify-center">
        <div onClick={() => hide(false)} className="pt-1 pr-2 flex items-end justify-end">
          <IoClose className="h-10 w-10 cursor-pointer" />
        </div>
        <div className="flex justify-center">
          <video id="video" width="400" height="300" autoPlay ref={videoRef}></video>
        </div>
        <button className="h-16 w-16 bg-white rounded-full cursor-pointer border-8 border-teal-light p-2 mb-10" onClick={capturePhoto}></button>
      </div>
    </div>
  );
}

export default CapturePhoto;
