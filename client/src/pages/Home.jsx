import { useContext, useEffect } from "react";
import ConferenceCard from "../components/widgets/ConferenceCard";
import { UserContext } from "../contexts/UserContext";

const Home = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:4000/profile", { credentials: "include" }).then(
      (response) => {
        response.json().then((userInfo) => {
          setUserInfo(userInfo);
        });
      }
    );
  }, []);

  return (
    // <div className="grow-1 w-full max-w-maxwidth h-max p-10 flex flex-col gap-10 overflow-hidden">
    <div className="page-wrapper">
      {/* <h1 className="text-heading">Welcome Gautam,</h1> */}
      <h1 className="text-heading">Welcome {userInfo.username},</h1>
      <div className="w-full h-[200px] rounded-[20px] rounded-br-[100px] overflow-hidden">
        <img
          src="dashboardpic.png"
          alt="Conference image"
          className="w-full h-[200px] object-cover"
        />
      </div>

      <div className="flex flex-row justify-between">
        <h3 className="text-subheading">Registered Conferences</h3>
        <p className="text-secondary font-semibold text-[16px]">VIEW ALL</p>
      </div>
      <ConferenceCard />
      <ConferenceCard />
      <ConferenceCard />
    </div>
  );
};

export default Home;
