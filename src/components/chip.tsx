import React from "react";
import { ProfileI } from "../interface/profileInterface";

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
    <span>
      <p>{profile.name}</p>
      <p onClick={() => removeChipHandler(profile.id)}>X</p>
    </span>
  );
}
