import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { StickyNote } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../contexts/UserContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { toCapitalCase } from "../utils/toCapitalCase";

const PaperCard = ({ paper }) => {
  const [userRating, setUserRating] = useState(null);

  async function submitRating() {
    console.log(typeof userRating);
    const response = fetch(
      "http://localhost:4000/papers/" + paper._id + "/update-rating",
      {
        method: "PUT",
        body: JSON.stringify({ userRating: parseFloat(userRating) }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const myPromise = response;

    toast.promise(
      myPromise,
      {
        loading: "Recording response",
        success: "Response saved!",
        error: "An error occured",
      },
      {
        style: {
          minWidth: "250px",
        },
      }
    );
  }
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row gap-7 justify-center items-center">
        <div className="w-[60px] h-[60px] flex justify-center items-center opacity-95 bg-primary rounded-full">
          <StickyNote color="#ffffff" size={26} strokeWidth={1.7} />
        </div>
        <div>
          <p className="text-primary font-semibold text-[18px] tracking-tight">
            {/* {paper._id} */}
            {toCapitalCase(paper.title)}
          </p>
          <p className="text-primary font-medium text-[18px] mt-1 tracking-tight opacity-80">
            {paper.userId.username}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-0 items-end justify-center">
        <p className="text-[25px] font-semibold text-primary leading-0">
          {paper.totalRating.toFixed(1)}
          {/* Dev purposes */}
          {/* <br />
          {paper.totalRaters} */}
        </p>
        <Popover>
          <PopoverTrigger className="text-secondary text-[14px] font-semibold">
            RATE NOW
          </PopoverTrigger>
          <PopoverContent>
            <input
              type="number"
              className="w-full text-[14px] py-2 px-4 border-[0.7px] border-gray-400 rounded-lg"
              placeholder="Your rating out of 5"
              value={userRating}
              onChange={(ev) => setUserRating(ev.target.value)}
            />
            <button className="button-cta mt-4 w-full" onClick={submitRating}>
              Rate
            </button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

const SubmittedPapers = () => {
  const { id: conferenceId } = useParams();

  const { userInfo, setUserInfo } = useContext(UserContext);

  const [paperDocs, setPaperDocs] = useState(null);

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
    fetch("http://localhost:4000/conference/" + conferenceId + "/papers").then(
      (res) => {
        res.json().then((res) => {
          console.log(res);
          setPaperDocs(res);
        });
      }
    );
  }, []);

  return (
    <div className="page-wrapper">
      <div className="flex flex-col gap-10">
        <h1 className="text-heading">Submitted Papers</h1>
        {/* Dev purposes */}
        {/* <p>{userInfo?.id}</p> */}
        {paperDocs &&
          paperDocs.map((paper) => <PaperCard key={paper._id} paper={paper} />)}
      </div>
      <Toaster />
    </div>
  );
};

export default SubmittedPapers;
