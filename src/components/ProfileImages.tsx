import React, { useState } from "react";
import { User } from "../api/users";
import { FaImage, FaPortrait } from "react-icons/fa";
import FullscreenImageViewer from "./FullscreenImageViewer";

import fallbackImg from "../assets/defaultAvatar.png";
import classnames from "classnames";

interface Props {
  cover_image_url: string;
  profile_image_url: string;
  user?: User;
  handleProfileImgChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  handleCoverImgChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
}
const ProfileImages = (props: Props) => {
  const [showProfileImg, setShowProfileImg] = useState(false);
  const [showCoverImg, setShowCoverImg] = useState(false);

  const {
    cover_image_url,
    profile_image_url,
    user,
    handleProfileImgChange,
    handleCoverImgChange,
  } = props;

  const btnClassNames = classnames(
    "absolute grid place-items-center cursor-pointer top-0",
    "left-0 bottom-0 right-0 m-auto z-10 bg-primary/50 w-10 h-10 rounded-full"
  );
  const fileClassNames = "fixed top-[-9999px] z[-1] w-0 h-0 overflow-hidden";
  return (
    <div className="relative">
      <img
        onClick={() => setShowCoverImg(true)}
        className="object-cover relative w-full aspect-[3/1] md:h-48 cursor-pointer"
        alt=""
        style={{
          backgroundImage: `url(${cover_image_url})`,
          backgroundPosition: "center",
          backgroundColor: "gray",
          backgroundSize: "cover",
        }}
      />
      {handleCoverImgChange && (
        <>
          <label htmlFor="cover-img" className={btnClassNames}>
            <FaImage className="text-2xl text-bg" />
          </label>
          <input
            className={fileClassNames}
            accept=".jpg,.png,.gif,.jpeg"
            type="file"
            id="cover-img"
            onChange={handleCoverImgChange}
          />
        </>
      )}

      <div className="absolute w-fit z-10 left-4 bottom-[-3rem] md:bottom-[-4rem]">
        {handleProfileImgChange && (
          <>
            <label htmlFor="profile-img" className={btnClassNames}>
              <FaPortrait className="text-2xl text-bg" />
            </label>
            <input
              className={fileClassNames}
              accept=".jpg,.png,.gif,.jpeg"
              id="profile-img"
              type="file"
              onChange={handleProfileImgChange}
            />
          </>
        )}

        <img
          onClick={() => setShowProfileImg(true)}
          className="cursor-pointer border-2 border-bg bg-bg w-20 h-20 md:w-32 md:h-32 rounded-full object-cover"
          src={profile_image_url || fallbackImg}
          alt={user?.name}
        />
      </div>
      {showCoverImg && (
        <FullscreenImageViewer
          image={cover_image_url}
          handleClose={() => setShowCoverImg(false)}
        />
      )}

      {showProfileImg && (
        <FullscreenImageViewer
          image={profile_image_url}
          handleClose={() => setShowProfileImg(false)}
        />
      )}
    </div>
  );
};

export default ProfileImages;
