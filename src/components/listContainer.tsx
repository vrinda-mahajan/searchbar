import { ProfileI } from "../interface/profileInterface";

interface ProfileListPropsI {
  profiles: ProfileI[];
  setSelectedProfiles: React.Dispatch<React.SetStateAction<ProfileI[]>>;
}

export default function ShowProfileList({
  profiles,
  setSelectedProfiles,
}: ProfileListPropsI) {

  const profileClickHandler = (profile: ProfileI) => {
    setSelectedProfiles((prev) => [...prev, profile]);
  };
  
  return (
    <ul>
      {profiles.map((profile) => (
        <li key={profile.id} onClick={() => profileClickHandler(profile)}>
          {profile.name}
        </li>
      ))}
    </ul>
  );
}
