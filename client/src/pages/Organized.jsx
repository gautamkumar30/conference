import { useContext } from "react";
import { useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { useState } from "react";
import ConferenceCard from "../components/widgets/ConferenceCard";

const Organized = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [conferenceDocs, setConferenceDocs] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/profile", { credentials: "include" }).then(
      (response) => {
        response.json().then((userInfo) => {
          setUserInfo(userInfo);
          console.log(userInfo);
          fetch("http://localhost:4000/conference/organized", {
            method: "POST",
            body: JSON.stringify({ userId: userInfo?.id }),
            headers: { "Content-Type": "application/json" },
          }).then((response) => {
            response.json().then((res) => {
              setConferenceDocs(res);
            });
          });
        });
      }
    );
  }, []);

  console.log(conferenceDocs);

  return (
    <div className="page-wrapper">
      <h1>Organized Conferences</h1>
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

export default Organized;
