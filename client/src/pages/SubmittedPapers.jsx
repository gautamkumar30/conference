import { useParams } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useState } from "react";
import { ScrollText } from "lucide-react";
import { StickyNote } from "lucide-react";

const PaperCard = ({ paper }) => {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row gap-7 justify-center items-center">
        <div className="w-[60px] h-[60px] flex justify-center items-center opacity-95 bg-primary rounded-full">
          <StickyNote color="#ffffff" size={26} strokeWidth={1.7} />
        </div>
        <div>
          <p className="text-primary font-semibold text-[18px] tracking-tight">
            {paper.title}
          </p>
          <p className="text-primary font-medium text-[18px] mt-1 tracking-tight opacity-80">
            {paper.userId.username}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-0 items-end justify-center">
        <p className="text-[25px] font-semibold text-primary leading-0">
          {paper.totalRating}
        </p>
        <Popover>
          <PopoverTrigger className="text-secondary text-[14px] font-semibold">
            RATE NOW
          </PopoverTrigger>
          <PopoverContent>
            <div>some content</div>
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
        <p>{userInfo?.id}</p>
        {paperDocs && paperDocs.map((paper) => <PaperCard paper={paper} />)}
      </div>
    </div>
  );
};

export default SubmittedPapers;
