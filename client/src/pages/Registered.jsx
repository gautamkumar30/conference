import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useEffect } from "react";
import { useState } from "react";
import ConferenceCard from "../components/widgets/ConferenceCard";

const Registered = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);

  const [conferenceDocs, setConferenceDocs] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/profile", { credentials: "include" }).then(
      (response) => {
        response.json().then((userInfo) => {
          setUserInfo(userInfo);
        });
      }
    );

    fetch("http://localhost:4000/conference").then((response) => {
      response.json().then((res) => setConferenceDocs(res));
    });
  }, []);

  console.log(conferenceDocs);

  return (
    <div className="page-wrapper">
      <h1>Registered</h1>
      <p>Current User: {userInfo.id}</p>
      {conferenceDocs &&
        conferenceDocs.map((conference) => {
          return (
            <ConferenceCard
              key={conference._id}
              id={conference._id}
              title={conference.title}
              theme={conference._id}
              date={conference.date}
              venue={conference.venue}
              organizer={
                conference.organizer?.username || "Organizer unavailable"
              }
            />
          );
        })}
    </div>
  );
};

export default Registered;
