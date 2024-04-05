import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const FormChild = ({ id, label, placeholder }) => {
  return (
    <div className="flex flex-col gap-4" id={id}>
      <label className="text-primary text-[18px]">{label}</label>
      <input
        type="text"
        className="h-[40px] border-primary border-[1px] rounded-lg px-4 py-6 focus:border-none focus:border-primary bg-transparent"
        // placeholder="Eg. The Art of Research and Development"
        placeholder={placeholder}
        value={"temp value"}
        readOnly
      />
    </div>
  );
};

const formList = [
  {
    id: "title",
    label: "Title",
    placeholder: "Eg. The Art of Research and Development",
  },
  { id: "date", label: "Date", placeholder: "Eg. 10 April 2024" },
  { id: "venue", label: "Venue", placeholder: "Eg. Chennai, India" },
  {
    id: "registrationamount",
    label: "Registration Amount",
    placeholder: "Eg. $100",
  },
  {
    id: "description",
    label: "Description",
    placeholder: "Eg. Description of the conference",
  },
  { id: "theme", label: "Theme", placeholder: "Eg. Blockchain" },
];

const CreateConference = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [isCreateDisabled, setIsCreateDisabled] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/profile", { credentials: "include" }).then(
      (response) => {
        response.json().then((userInfo) => {
          setUserInfo(userInfo);
        });
      }
    );
  }, []);

  // eslint-disable-next-line no-unused-vars
  const formData = {
    title: "Research",
    date: "1 April",
    venue: "Bangalore",
    // organizer: userInfo.id,
    organizer: userInfo?.id,
  };

  async function create(ev) {
    ev.preventDefault();
    setIsCreateDisabled(true);
    console.log("create function triggered");

    const form = ev.target;

    const formData = {
      title: form[0].value,
      date: form[1].value,
      venue: form[2].value,
      registrationAmount: form[3].value,
      description: form[4].value,
      theme: form[5].value,
      organizer: userInfo?.id,
    };

    console.log(formData);

    const response = await fetch("http://localhost:4000/conference/create", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("This is response data");
      console.log(responseData);

      // alert("Conference created successfully!");
      toast.success("Conference created successfully!");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      toast.error("Unable to create the conference");
    }
  }
  return (
    <div className="page-wrapper">
      {/* <h1 className="text-heading">Organize a Conference</h1> */}
      {/* For dev purposes */}
      <h1 className="text-heading">Organize</h1>
      {/* For dev purposes */}
      <p>{userInfo?.username}</p>
      <form onSubmit={create}>
        <div className="grid grid-row-3 grid-cols-2 gap-x-16 gap-y-10">
          {formList.map((item) => (
            <FormChild
              key={item.id}
              id={item.title}
              label={item.label}
              placeholder={item.placeholder}
            />
          ))}
          {/* <button type="submit" className="border-2">
            Create
          </button> */}
        </div>
        <button
          type="submit"
          className="button-cta mt-14"
          disabled={isCreateDisabled}
        >
          {isCreateDisabled ? "Creating" : "Create"}
        </button>
      </form>
      <Toaster />
    </div>
  );
};

export default CreateConference;
