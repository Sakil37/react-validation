import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Forgetpass = () => {
  //
  const auth = getAuth();
  const navigate = useNavigate();
  const [loder, setLoder] = useState(false);
  const [resetemail, setresetemail] = useState("");
  const [errorreset, seterrorreset] = useState("");
  //
  const handelreset = () => {
    if (resetemail == "") {
      seterrorreset("Inter Your reset email");
    } else {
      sendPasswordResetEmail(auth, resetemail)
        .then(() => {
          setLoder(false);
          toast("reset succes", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          } );
          setTimeout(() => {
            navigate("/home");
          }, 2000);
        } )
        // 
        .catch((error) => {
          seterrorreset("invalid-email");
          const errorCode = error.code;
          console.log(errorCode);
          const errorMessage = error.message;
          // ..
          setLoder(false);
        });
      setLoder( true );
    
    }
  };
  //
  const backlogin = () => {
    navigate("/login");
  };
  //
  const handelresetinput = (e) => {
    setresetemail(e.target.value);
  };
  //
  return (
    <div className="w-[500px] mx-auto bg-gray-100 h-auto px-10 py-12 rounded-md mt-20 text-center">
      <ToastContainer/>
      <h1 className="text-black font-sans font-bold text-3xl">
        Reset Password
      </h1>
      <hr className="mt-3 mb-3" />
      <div className="mt-5">
        <label htmlFor="email" className="text-black font-semibold text-1xl">
          Email:
        </label>
        <input
          onChange={handelresetinput}
          type="email"
          className="ml-5 px-2 py-1 rounded-md outline-none"
          placeholder="Inter Your Email"
        />
        <p className="mt-3 text-red-600">{errorreset}</p>
      </div>
      <button
        onClick={handelreset}
        className="text-black font-mono font-bold border-2 border-rounded rounded-md border-black px-2 py-1 mt-5"
      >
        {loder ? (
          <div
            className="float-right inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
          </div>
        ) : (
          "Send"
        )}
      </button>
      <button
        onClick={backlogin}
        className="text-black ml-2 font-mono font-bold border-2 border-rounded rounded-md border-black px-2 py-1 mt-5"
      >
        Login
      </button>
    </div>
  );
};

export default Forgetpass;
