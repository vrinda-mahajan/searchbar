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
    <ul className="shadow-lg top-11">
      {profiles.map((profile) => (
        <li
          key={profile.id}
          onClick={() => profileClickHandler(profile)}
          className="flex px-3 py-[6px] items-center hover:bg-gray-100 "
        >
          <img className="size-10 mr-1" src={profile.profileImg} />
          <p className="text-gray-700 mr-7">{profile.name}</p>
          <span className="text-gray-300">{profile.email}</span>
        </li>
      ))}
    </ul>
  );
}
