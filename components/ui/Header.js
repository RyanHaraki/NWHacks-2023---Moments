import React from "react";
import Logo from "../../public/moments-logo.svg";

const Header = ({ wallet }) => {
  const router = useRouter();
  const { ref, visible, setVisible } = useOutsideAlerter();

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-300">
      <Image src={Logo} alt="Logo" className="w-10 h-10 cursor-pointer" />

      <div ref={ref}>
        <button
          onClick={() => setVisible(!visible)}
          className="hover:bg-gray-100 rounded-md p-2 flex items-center justify-center text-gray-400"
        >
          {user?.displayName || "Login"} <FaChevronDown className={"ml-2"} />
        </button>
        {visible && (
          <div
            className={
              "absolute top-14 right-4 rounded-md border border-gray-300 bg-white overflow-hidden"
            }
            onClick={() => visible && setVisible(false)}
          >
            <button
              onClick={() => router.push("/dashboard")}
              className={
                "text-left text-sm hover:bg-blue-700 hover:text-white w-full px-4 py-2"
              }
            >
              Dashboard
            </button>
            <button
              onClick={() => router.replace("https://tally.so/r/mZ9W6V")}
              className={
                "text-left text-sm hover:bg-blue-700 hover:text-white w-full px-4 py-2"
              }
            >
              Request Feature
            </button>
            {user && (
              <button
                onClick={logUserOut}
                className={
                  "text-left text-sm hover:bg-blue-700 hover:text-white w-full px-4 py-2"
                }
              >
                Log Out
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
