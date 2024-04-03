import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../utils/navigation.jsx";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext.jsx";
import { LogOut } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const { pathname } = location;

  const { setUserInfo } = useContext(UserContext);

  const navigate = useNavigate();

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    // setUsername(null);
    setUserInfo(null);
    // alert("Logged out");
    navigate("/login");
  }

  return (
    <aside className="border-0 w-80 flex justify-center items-center grow-0 shrink-0">
      <div className="fixed w-64 h-[90%] border-r-2 border-[#23316940] p-6 flex flex-col items-center gap-5">
        <div className="w-[70px] h-[70px] rounded-full bg-primary mb-7 "></div>
        <div className="flex flex-col gap-6 justify-center">
          {routes.map((route) => (
            <Link
              to={route.route}
              className="flex flex-row gap-4 group"
              key={route.label}
            >
              <div
                className={`opacity-60 group-hover:opacity-100 ${
                  pathname === route.route && `opacity-100`
                }`}
              >
                {route.component}
              </div>
              <p
                className={`text-primary font-semibold opacity-60 text-[15px] text-center group-hover:opacity-100 ${
                  pathname === route.route && `opacity-100`
                } `}
              >                
                {route.label.toUpperCase()}
              </p>
            </Link>
          ))}
          <button
            onClick={logout}
            // className="text-primary font-semibold opacity-60 text-[15px] text-center group-hover:opacity-100"
            className="flex flex-row gap-4 group"
          >
            <div className={`opacity-60 group-hover:opacity-100`}>
              <LogOut strokeWidth={1.8} color={"#233169"} />
            </div>
            <p
              className={`text-primary font-semibold opacity-60 text-[15px] text-center group-hover:opacity-100`}
            >
              {"Log Out".toUpperCase()}
            </p>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
