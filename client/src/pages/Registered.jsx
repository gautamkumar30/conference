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
          console.log(userInfo);
          fetch("http://localhost:4000/conference/registered", {
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
      <h1 className="text-heading">Registered Conferences</h1>
      {/* Dev purposes */}
      {/* <p>
        Current User: {userInfo.id} || {userInfo.username}
      </p> */}
      {conferenceDocs &&
        conferenceDocs.map((conference) => {
          return (
            <ConferenceCard
              key={conference.conferenceId._id}
              id={conference.conferenceId._id}
              title={conference.conferenceId.title}
              theme={conference.conferenceId.theme}
              date={conference.conferenceId.date}
              venue={conference.conferenceId.venue}
              organizer={
                conference.organizer?.username
                  ? conference.organizer.username
                  : conference.conferenceId.description
              }
            />
          );
        })}
    </div>
  );
};

export default Registered;
