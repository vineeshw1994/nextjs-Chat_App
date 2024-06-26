import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import ContextMenu from "./ContextMenu";
import Image from "next/image";
import PhotoPicker from "./PhotoPicker";
import PhotoLibrary from "./PhotoLibrary";
import CapturePhoto from "./CapturePhoto";

function Avatar({ type, image, setImage }) {
  const [hover, setHover] = useState(false);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [contextMenuCordinates, setContextMenuCordinates] = useState({ x: 0, y: 0 });
  const [grapPhoto, setGrapPhoto] = useState(false);
  const [showPhotoLibrary, setShowPhotoLibrary] = useState(false);
  const [capturePhoto, setCapturePhoto] = useState(false);

  const contextMenuOptions = [
    {
      name: 'Take Photo', callback: () => {
        setCapturePhoto(true);
      }
    },
    {
      name: 'Choose From Library', callback: () => {
        setShowPhotoLibrary(true);
      }
    },
    {
      name: 'Upload Photo', callback: () => {
        setGrapPhoto(true);
      }
    },
    {
      name: 'Romve Photo', callback: () => {
        setImage("/default_avatar.png")
      }
    },
  ]

  const photoPickerChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const data = document.createElement('img')
    reader.onload = (e) => {
      data.src = e.target.result;
      data.setAttribute("data-src", e.target.result)
      reader.readAsDataURL(file);
      setTimeout(() => {
        setImage(data.src)
      }, 100)
    }
  }

  const showContextMenu = (e) => {
    e.preventDefault();
    setIsContextMenuVisible(true);
    setContextMenuCordinates({ x: e.pageX, y: e.pageY });
  }

  useEffect(() => {
    if (grapPhoto) {
      const data = document.getElementById("photo-picker")
      data.click();
      document.body.onfocus = (e) => {
        setTimeout(() => {
          setGrapPhoto(false);
        }, 1000)
      }
    }
  }, [grapPhoto])

  return <>
    <div className="flex items-center justify-center">

      {
        type === "sm" && (
          <div className="relative h-10 w-10">
            <Image src={image} height={10} width={10} alt="avatar" className=" rounded-full" />
          </div>
        )}
      {
        type === "lg" && (
          <div className="relative h-14 w-14">
            <Image src={image} height={200} width={200} alt="avatar" className=" rounded-full" />
          </div>
        )}
      {
        type === "xl" && (
          <div className="relative cursor-pointer z-0" onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
            <div className={`bg-photopicker-overlay-background h-60 w-60 absolute top-0 left-0 flex items-center rounded-full justify-center flex-col text-center gap-2 ${hover ? "visible" : "hidden"} `} onClick={e => showContextMenu(e)} id="context-opener">
              <FaCamera className="text-2xl" id="context-opener" onClick={e => showContextMenu(e)} />
              <span id="context-opener" onClick={e => showContextMenu(e)}>
                Change <br /> Profile <br /> Photo
              </span>
            </div>
            <div className=" h-60 w-60 ">
              <Image src={image} height={300} width={300} alt="avatar" className=" rounded-full" />
            </div>
          </div>
        )}

    </div>
    {
      isContextMenuVisible && (<ContextMenu options={contextMenuOptions}
        cordinates={contextMenuCordinates}
        contextMenu={isContextMenuVisible}
        setContextMenu={setIsContextMenuVisible} />
      )}
    {
      capturePhoto && (
        <CapturePhoto setImage={setImage} hide={setCapturePhoto} />
      )
    }
    {
      showPhotoLibrary && (
        <PhotoLibrary setImage={setImage} hidePhotoLibrary={setShowPhotoLibrary} />
      )
    }
    {grapPhoto && (
      <PhotoPicker onChange={photoPickerChange} />
    )
    }
  </>;
}

export default Avatar;
