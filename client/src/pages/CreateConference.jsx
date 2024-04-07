import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../contexts/UserContext";

const formList = [
  {
    id: "title",
    label: "Title",
    placeholder: "Eg. Green energy sustainability",
    type: "text",
  },
  { id: "date", label: "Date", placeholder: "Eg. 10 April 2024", type: "text" },
  {
    id: "venue",
    label: "Venue",
    placeholder: "Eg. Le Royal Meridien, Chennai",
    type: "text",
  },
  {
    id: "registrationamount",
    label: "Registration Amount",
    placeholder: "Eg. $100",
    type: "number",
  },
  {
    id: "description",
    label: "Description",
    placeholder: "Eg. Description of the conference",
    type: "text",
  },
  {
    id: "theme",
    label: "Theme",
    placeholder: "Eg. Green Energy",
    type: "text",
  },
];

// eslint-disable-next-line react/prop-types
const FormChild = ({ id, label, placeholder }) => {
  return (
    <div className="flex flex-col gap-4" id={id}>
      <label className="text-primary text-[18px]">{label}</label>
      <input
        type="text"
        className="h-[40px] border-primary border-[1px] rounded-lg px-4 py-6 focus:border-none focus:border-primary bg-transparent"
        placeholder={placeholder}
      />
    </div>
  );
};

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

  async function create(ev) {
    ev.preventDefault();
    setIsCreateDisabled(true);
    console.log("create function triggered");

    const form = ev.target;

    console.log(form);

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

    if (response.status === 200) {
      const responseData = await response.json();
      console.log("This is response data");
      console.log(responseData);

      toast.success("Conference created successfully!");

      setTimeout(() => {
        navigate("/conference/organized");
      }, 2000);
    } else {
      toast.error("Unable to create the conference");
    }
  }
  return (
    <div className="page-wrapper">
      <h1 className="text-heading">Create Conference</h1>
      {/* For dev purposes */}
      {/* <p>{userInfo?.username}</p> */}
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
