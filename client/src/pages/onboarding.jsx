import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useStateProvider } from "@/context/StateContext";
import Input from "@/components/common/Input";
import Avatar from "@/components/common/Avatar";
import axios from "axios";
import { ONBOARD_USER_ROUTE } from "@/utils/ApiRoutes";
import { useRouter } from "next/router";

function onboarding() {
  const [{ userInfo, newUser }, dispatch] = useStateProvider();
  const [name, setName] = useState(userInfo?.name || "");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState("/default_avatar.png");

  const router = useRouter();

  useEffect(() => {
    if (!newUser && !userInfo?.email) {
      router.push("/login");
    } else if (!newUser && userInfo?.email) {
      router.push("/");
    }
  }, [newUser, userInfo, router]);

  const onboardUserHandler = async () => {
    if (!name || !about || !image) {
      return alert("Please fill all the fields");
    }
    const email = userInfo.email;
    try {
      const { data } = await axios.post(ONBOARD_USER_ROUTE, {
        email,
        name,
        about,
        image,
      });
      if (data.success){
        dispatch({ type: reducerCases.SET_NEW_USER, newUser: false });
        dispatch({
          type: reducerCases.SET_USER_INFO,
          userInfo: {
            id:data.data._id,
            name:data.data.name,
            email:data.data.email,
            profileImage: data.data.profilePicture,
            status: "about",
          },
        });
        alert("Profile Created Successfully");
        router.push("/");
      }
    } catch (error) {
      alert(error.message);
    }
  };

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
          <div className="flex items-center justify-center">
            <button
              className="flex items-center justify-center gap-7 bg-search-input-container-background p-5 rounded-lg "
              onClick={onboardUserHandler}
            >
              Create Profile
            </button>
          </div>
        </div>
        <div>
          <Avatar type="xl" image={image} setImage={setImage} />
        </div>
      </div>
    </div>
  );
}

export default onboarding;
