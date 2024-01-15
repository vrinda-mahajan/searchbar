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
    <div className="">
      <label htmlFor="chips-input" className="chips">
        <span>Chip x</span>
        {selectedProfiles.map((profile) => (
          <Chip profile={profile} selectedProfiles={selectedProfiles} setSelectedProfiles={setSelectedProfiles} />
        ))}
        <div>
          <input
            onClick={() => setShowList(true)}
            onChange={(e) => searchProfiles(e.target.value)}
            type="text"
            id="chips-input"
          />
          {showList && <ShowProfileList profiles={profiles} setSelectedProfiles={setSelectedProfiles} />}
        </div>
      </label>
    </div>
  );
}

export default App;
