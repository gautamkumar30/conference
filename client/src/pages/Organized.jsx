import { useContext } from "react";
import { useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { useState } from "react";
import ConferenceCard from "../components/widgets/ConferenceCard";
import { Link } from "react-router-dom";

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
      <h1 className="text-heading">Organized Conferences</h1>
      {/* Dev purposes */}
      {/* <p>Current User: {userInfo.id}</p> */}

      {conferenceDocs == null && (
        <div className="w-full h-[300px] flex flex-col justify-center items-center">
          <p className="text-subheading text-secondary animate-pulse">
            Loading conferences ....
          </p>
        </div>
      )}
      {conferenceDocs?.length < 1 && (
        <div className="w-full h-[300px] flex flex-col justify-center items-center gap-10">
          <p className="text-subheading text-secondary">
            You have not organized any conferences yet
          </p>
          <Link to="/conference/create" className="button-cta">
            Organize a conference
          </Link>
        </div>
      )}
      {conferenceDocs &&
        conferenceDocs.map((conference) => {
          return (
            <ConferenceCard
              key={conference._id}
              id={conference._id}
              title={conference.title}
              theme={conference.theme}
              date={conference.date}
              venue={conference.venue}
              organizer={
                conference.organizer?.username || conference.description
              }
            />
          );
        })}
    </div>
  );
};

export default Organized;
