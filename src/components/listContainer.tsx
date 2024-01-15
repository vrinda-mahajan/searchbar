import { ProfileI } from "../interface/profileInterface";

interface ProfileListPropsI {
  inputText: string;
  profiles: ProfileI[];
  setSelectedProfiles: React.Dispatch<React.SetStateAction<ProfileI[]>>;
}

export default function ShowProfileList({
  inputText,
  profiles,
  setSelectedProfiles,
}: ProfileListPropsI) {
  const profileClickHandler = (profile: ProfileI) => {
    setSelectedProfiles((prev) => [...prev, profile]);
  };
  //   for highlighting the searched text -by extracting part of the name string
  const getHighlightedName = (name: string) => {
    let startString = name.substring(
      0,
      name.toLowerCase().indexOf(inputText.toLowerCase())
    );
    let endString = name.substring(
      name.toLowerCase().indexOf(inputText.toLowerCase()) + inputText.length
    );
    let highlightedString = inputText;
    return { startString, endString, highlightedString };
  };

  return (
    <ul className="shadow-lg top-11">
      {profiles.map((profile) => {
        const { startString, endString, highlightedString } =
          getHighlightedName(profile.name);
        return (
          <li
            key={profile.id}
            onClick={() => profileClickHandler(profile)}
            className="flex px-3 py-[6px] items-center hover:bg-gray-100 "
          >
            <img className="size-10 mr-1" src={profile.profileImg} />
            <p className="text-gray-700 mr-7">
              {startString}
              <span className="text-gray-400">{highlightedString}</span>
              {endString}
            </p>
            <span className="text-gray-300">{profile.email}</span>
          </li>
        );
      })}
    </ul>
  );
}
