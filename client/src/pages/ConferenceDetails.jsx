import { useState, useContext } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

const PaperCard = () => {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row gap-7">
        <div className="w-[70px] h-[70px] bg-secondary rounded-xl"></div>
        <div>
          <p className="text-primary font-semibold text-[20px]">
            Paper on Green Energy Sustainability{" "}
          </p>
          <p className="text-primary font-medium text-[18px] mt-1">
            John Mishra
          </p>
        </div>
      </div>
      <div>
        <p className="text-[30px] font-semibold text-primary">4.5</p>
      </div>
    </div>
  );
};

const templateData = {
  id: "Couldn't fetch id",
  title: "Couldn't fetch title",
  organizer: "Couldn't fetch title",
  theme: "Couldn't fetch title",
  date: "Couldn't fetch title",
  venue: "Couldn't fetch title",
  description: "Couldn't fetch description",
};

const ConferenceDetails = () => {
  const { id: conferenceId } = useParams();
  // console.log(id);

  const [conferenceDoc, setConferenceDoc] = useState(templateData);

  const { userInfo, setUserInfo } = useContext(UserContext);

  const [userRole, setUserRole] = useState("non-attendee");

  const [paperTitle, setPaperTitle] = useState("");
  const [paperLink, setPaperLink] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/profile", { credentials: "include" }).then(
      (response) => {
        response.json().then((userInfo) => {
          setUserInfo(userInfo);
        });
      }
    );
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/conference/" + conferenceId).then((res) => {
      res.json().then((res) => {
        // console.log(res);
        setConferenceDoc(res);
      });
    });
  }, []);

  if (userInfo.username) {
    // console.log(userInfo)
    async function checkUserStatus() {
      const res = await fetch(
        "http://localhost:4000/conference/660a57a1a522443ad93abf98/check-user-status/" +
          userInfo.id
      );

      const temp = await res.json();

      console.log(temp.role);

      setUserRole(temp.role);
    }

    checkUserStatus();
  }

  async function registerForConference() {
    const attendeeDoc = await fetch(
      "http://localhost:4000/conference/" +
        conferenceId +
        "/register-attendee/" +
        userInfo?.id,
      {
        method: "POST",
      }
    );

    const temp = await attendeeDoc.json();

    console.log(temp);
  }

  async function submitPaper() {
    const paperDoc = await fetch(
      "http://localhost:4000/conference/" + conferenceId + "/submit-paper",
      {
        method: "POST",
        body: JSON.stringify({ userId: userInfo?.id }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const temp = await paperDoc.json();

    console.log(temp);
  }

  const ctaTypes = [
    {
      role: "non-attendee",
      label: "Register",
      function: registerForConference,
    },
    {
      role: "attendee",
      label: "Submit Paper",
      function: registerForConference,
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="bg-secondary w-full h-[200px] rounded-t-3xl"></div>
      <div className="flex flex-col gap-3">
        <p className="text-primary font-medium text-[18px] opacity-60">
          {conferenceDoc.theme || templateData.theme}
        </p>
        <h1 className="text-heading">
          {conferenceDoc.title || templateData.title}
        </h1>
        <p className="text-primary font-semibold text-[18px] opacity-60">
          {conferenceDoc.organizer?.username || templateData.organizer}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-primary font-medium text-[18px] opacity-60">
          <span className="text-primary font-bold text-[18px] opacity-90">
            Location:{" "}
          </span>
          {conferenceDoc.venue || templateData.venue}
        </p>
        <p className="text-primary font-medium text-[18px] opacity-60">
          <span className="text-primary font-bold text-[18px] opacity-90">
            Date:{" "}
          </span>
          {conferenceDoc.date || templateData.date}
        </p>
        <p className="text-primary font-medium text-[18px] opacity-60">
          <span className="text-primary font-bold text-[18px] opacity-90">
            Description:{" "}
          </span>
          {conferenceDoc.description || templateData.description}
        </p>
        <p className="text-primary font-medium text-[18px] opacity-60">
          <span className="text-primary font-bold text-[18px] opacity-90">
            Chairperson:{" "}
          </span>
          Harish Chopra, Neeraj Shah
        </p>
      </div>
      {/* Wrapper for top papers */}
      <div className="flex flex-col gap-10">
        <h1 className="text-subheading">Top Papers</h1>
        <div className="flex flex-col gap-10 justify-center">
          <PaperCard />
          <PaperCard />
          <PaperCard />
        </div>

        {userRole === "non-attendee" && (
          <button
            className="button-cta max-w-[250px]"
            onClick={registerForConference}
          >
            Register
          </button>
        )}

        {userRole === "attendee" && (
          <Dialog>
            <DialogTrigger className="button-cta max-w-[250px]">
              Submit Paper
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Paper details</DialogTitle>
                <DialogDescription>
                  The title of the paper and the drive link to the paper can be
                  provided
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-[16px] tracking-tight">
                    Title
                  </label>
                  <input
                    placeholder="Eg. Paper on Green Energy Sustainability"
                    className="col-span-3 py-2 px-4 border-[0.7px] border-gray-400 rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right">Link</label>
                  <input
                    placeholder="Eg. https://drive.google.com/paper-on-green-energy-sustainability"
                    className="col-span-3 py-2 px-4 border-[0.7px] border-gray-400 rounded-lg"
                  />
                </div>
              </div>
              <DialogFooter>
                <button
                  className="text-white text-[14px] bg-primary py-2 px-4 rounded-lg"
                  onClick={submitPaper}
                >
                  Submit Paper
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
        <p>{userInfo?.id}</p>
      </div>
    </div>
  );
};

export default ConferenceDetails;
