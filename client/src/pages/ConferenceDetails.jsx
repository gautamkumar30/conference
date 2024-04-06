import { useState, useContext } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
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
import { toTitleCase } from "../utils/toTitleCase";
import toast, { Toaster } from "react-hot-toast";

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
  organizer: "Couldn't fetch organizer",
  theme: "Couldn't fetch theme",
  date: "Couldn't fetch date",
  venue: "Couldn't fetch venue",
  description: "Couldn't fetch description",
};

const ConferenceDetails = () => {
  const { id: conferenceId } = useParams();
  // console.log(id);

  const [conferenceDoc, setConferenceDoc] = useState(templateData);

  const { userInfo, setUserInfo } = useContext(UserContext);

  const [userRole, setUserRole] = useState(null);

  const [paperData, setPaperDoc] = useState(null);

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

        // console.log(conferenceDoc.organizer?._id == userInfo.id);

        // if (conferenceDoc.organizer?._id == userInfo.id) {
        //   setUserRole("organizer");
        //   console.log(userRole);
        // }
      });
    });
  }, []);

  async function checkUserStatus() {
    console.log("Inside check user status");

    // console.log(conferenceDoc.organizer._id + " " + userInfo.id);

    const res = await fetch(
      "http://localhost:4000/conference/" +
        conferenceId +
        "/check-user-status/" +
        userInfo.id
    );

    // console.log(res);
    const temp = await res.json();

    setUserRole(temp.role);
    console.log(userRole);
  }

  if (userInfo.username) {
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
        // body: JSON.stringify({ userId: userInfo?.id }),
        // headers: { "Content-Type": "application/json" },
      }
    );

    if (attendeeDoc.status === 201) {
      const temp = await attendeeDoc.json();
      console.log(temp);
      toast.success("Registered successfully!");
    }
  }

  async function submitPaper() {
    // console.log({ userId: userInfo?.id, ...paperData });
    const response = await fetch(
      "http://localhost:4000/conference/" + conferenceId + "/submit-paper",
      {
        method: "POST",
        body: JSON.stringify({ userId: userInfo?.id, ...paperData }),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.status === 201) {
      console.log(await response.json());
      toast.success("Paper submitted successfully!");
    }
  }

  return (
    <div className="page-wrapper">
      <div className="bg-secondary w-full h-[200px] rounded-t-3xl"></div>
      <div className="flex flex-col gap-1">
        <p className="text-primary font-medium text-[16px] opacity-60">
          {conferenceDoc.theme
            ? conferenceDoc.theme.toUpperCase()
            : templateData.theme.toUpperCase()}
        </p>
        <h1 className="text-heading">
          {/* {conferenceDoc.title || templateData.title}
           */}
          {toTitleCase(conferenceDoc?.title) || toTitleCase(templateData.title)}
        </h1>
        <p className="text-primary font-semibold text-[20px] opacity-60">
          {conferenceDoc.organizer?.username || templateData.organizer}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-primary font-medium text-[18px] opacity-60">
          <span className="inline-block text-primary font-bold text-[18px] opacity-90 w-[140px]">
            Location
          </span>
          : {conferenceDoc.venue || templateData.venue}
        </p>
        <p className="text-primary font-medium text-[18px] opacity-60">
          <span className="inline-block w-[140px] text-primary font-bold text-[18px] opacity-90">
            Date
          </span>
          : {conferenceDoc.date || templateData.date}
        </p>
        <p className="text-primary font-medium text-[18px] opacity-60">
          <span className="inline-block w-[140px] text-primary font-bold text-[18px] opacity-90">
            Description
          </span>
          : {conferenceDoc.description || templateData.description}
        </p>
        <p className="text-primary font-medium text-[18px] opacity-60">
          <span className="inline-block w-[140px] text-primary font-bold text-[18px] opacity-90">
            Chairperson
          </span>
          : Harish Chopra, Neeraj Shah
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

        {/* Dynamically render based on User Role */}

        {console.log(userRole)}

        {userRole === "organizer" && (
          <button className="button-cta max-w-[250px]">{userRole}</button>
        )}

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
                  Upload the paper to a cloud platform and provide the title and
                  cloud link of the paper.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-[16px] tracking-tight">
                    Title
                  </label>
                  <input
                    placeholder="Eg. Green Energy Sustainability"
                    className="text-[14px] col-span-3 py-2 px-4 border-[0.7px] border-gray-400 rounded-lg"
                    value={paperData?.title}
                    onChange={(ev) => {
                      setPaperDoc({ ...paperData, title: ev.target.value });
                    }}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right">Link</label>
                  <input
                    placeholder="Eg. https://drive.google.com/paper"
                    className="text-[14px] col-span-3 py-2 px-4 border-[0.7px] border-gray-400 rounded-lg"
                    value={paperData?.link}
                    onChange={(ev) => {
                      setPaperDoc({ ...paperData, link: ev.target.value });
                    }}
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
      <Toaster />
    </div>
  );
};

export default ConferenceDetails;
