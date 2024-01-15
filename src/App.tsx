import { useEffect, useState } from "react";
import { profilesList } from "./data";
import Chip from "./components/chip";
import { ProfileI } from "./interface/profileInterface";
import ShowProfileList from "./components/listContainer";

function App() {
  const [showList, setShowList] = useState(false);
  const [profiles, setProfiles] = useState(profilesList);
  const [selectedProfiles, setSelectedProfiles] = useState<
    ProfileI[]
  >([]);

  useEffect(() => {
    const filteredProfiles = profilesList.filter(
      (profile) => !selectedProfiles.includes(profile)
    );
    setProfiles(filteredProfiles);
  }, [selectedProfiles]);
  
  const searchProfiles = (text: string) => {
    const filteredProfiles = profilesList.filter((profile) => {
      const regex = new RegExp(`${text}`, "gi");
      return profile.name.match(regex);
    });
    setProfiles(filteredProfiles);
  };
  
  return (
    <div className="bg-[#f9f9fa] h-screen">
      <label htmlFor="chips-input" className="relative flex flex-wrap border-b-2 border-blue-500 py-2 gap-2">
        {selectedProfiles.map((profile) => (
          <Chip profile={profile} selectedProfiles={selectedProfiles} setSelectedProfiles={setSelectedProfiles} />
        ))}
        <div>
          <input
            onClick={() => setShowList(true)}
            onChange={(e) => searchProfiles(e.target.value)}
            type="text"
            id="chips-input"
            className="outline-none bg-[#f9f9fa]"
          />
          <div className="absolute mt-3 w-">
          {showList && <ShowProfileList profiles={profiles} setSelectedProfiles={setSelectedProfiles} />}
          </div>
        </div>
      </label>
    </div>
  );
}

export default App;
