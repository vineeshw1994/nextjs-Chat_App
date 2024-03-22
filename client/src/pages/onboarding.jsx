import Image from "next/image";
import React, { useState } from "react";
import { useStateProvider } from "@/context/StateContext";
import Input from "@/components/common/Input";
import Avatar from "@/components/common/Avatar";

function onboarding() {
  const [{ userInfo }] = useStateProvider();
  const [name, setName] = useState(userInfo?.name || "");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState("/default_avatar.png");

  return (
    <div className="bg-panel-header-background h-screen w-screen text-white flex flex-col items-center justify-center ">
      <div className="flex items-center justify-center gap-2">
        <Image src="/whatsapp.gif" alt="whatsapp" width={200} height={150} />
        <span className="text-7xl">whatsapp</span>
      </div>
      <h2 className="text-2xl">create your profile</h2>
      <div className="flex gap-6 mt-6">
        <div className="flex flex-col items-center justify-center gap-6 mt-5">
          <Input name="Display Name" state={name} setState={setName} label />
          <Input name="About" state={about} setState={setAbout} label />
        </div>
        <div>
          <Avatar type='xl' image={image} setImage={setImage} />
        </div>
      </div>
    </div>
  )
}

export default onboarding;
