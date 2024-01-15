import React from "react";
import { ProfileI } from "../interface/profileInterface";
import { IoMdClose } from "react-icons/io";
interface chipPropsI {
  profile: ProfileI;
  selectedProfiles: ProfileI[];
  setSelectedProfiles: React.Dispatch<React.SetStateAction<ProfileI[]>>;
}

export default function Chip({
  profile,
  selectedProfiles,
  setSelectedProfiles,
}: chipPropsI) {
  const removeChipHandler = (id: number) => {
    const removedSelectedProfiles = selectedProfiles.filter(
      (profile) => profile.id !== id
    );
    setSelectedProfiles(removedSelectedProfiles);
  };

  return (
    <span className="flex items-center rounded-full  text-gray-500 bg-gray-200 ">
      <img className="h-7 mr-1" src={profile.profileImg} />
      <p className="">{profile.name}</p>
      <IoMdClose
        className="size-5 mt-1 mr-1 cursor-pointer"
        onClick={() => removeChipHandler(profile.id)}
      />
    </span>
  );
}
