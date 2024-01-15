import { useEffect, useRef, useState } from "react";
import { profilesList } from "./data";
import Chip from "./components/chip";
import { ProfileI } from "./interface/profileInterface";
import ShowProfileList from "./components/listContainer";

function App() {
  const [showList, setShowList] = useState<boolean>(false);
  const [profiles, setProfiles] = useState<ProfileI[]>(profilesList);
  const [selectedProfiles, setSelectedProfiles] = useState<ProfileI[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  // handles the outside click- to close the suggestion box.
  useEffect(() => {
    let closeList = (e: any) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowList(false);
      }
    };
    document.addEventListener("mousedown", closeList);
    return () => document.removeEventListener("mousedown", closeList);
  });

  // filtering out the profiles included in chips from the global profile list.
  const getFilteredProfiles = () => {
    const filteredProfiles = profilesList.filter(
      (profile) => !selectedProfiles.includes(profile)
    );
    return filteredProfiles;
  };

  useEffect(() => {
    const filteredProfiles = getFilteredProfiles();
    setProfiles(filteredProfiles);
    setInputText("")
  }, [selectedProfiles]);

  const searchProfiles = (text: string) => {
    setInputText(text)
    const filteredProfiles = getFilteredProfiles().filter((profile) => {
      const regex = new RegExp(`${text}`, "gi");
      return profile.name.match(regex);
    });
    setProfiles(filteredProfiles);
  };

  return (
    <div className="bg-[#f9f9fa] h-screen">
      <label
        htmlFor="chips-input"
        className="relative flex flex-wrap border-b-2 border-blue-500 py-2 gap-2"
      >
        {selectedProfiles.map((profile) => (
          <Chip
          key={profile.id}
            profile={profile}
            selectedProfiles={selectedProfiles}
            setSelectedProfiles={setSelectedProfiles}
          />
        ))}
        <div ref={inputRef}>
          <input
            onClick={() => setShowList(true)}
            onChange={(e) => searchProfiles(e.target.value)}
            type="text"
            id="chips-input"
            value={inputText}
            className="outline-none bg-[#f9f9fa]"
          />
          <div className="absolute mt-3 w-">
            {showList && (
              <ShowProfileList
                profiles={profiles}
                setSelectedProfiles={setSelectedProfiles}
              />
            )}
          </div>
        </div>
      </label>
    </div>
  );
}

export default App;
