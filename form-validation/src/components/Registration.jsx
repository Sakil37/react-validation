import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Registration = () => {
  const navigate = useNavigate();
  const [useremail, setuseremail] = useState("");
  const [useremailerror, setuseremailerror] = useState("");
  const [userpassword, setuserpassword] = useState("");
  const [userpassworderror, setuserpassworderror] = useState("");
  const [loder, setloder] = useState("");
  const auth = getAuth();
  const handelemail = (e) => {
    setuseremail(e.target.value);
    setuseremailerror("");
  };
  const handelpassword = (e) => {
    setuserpassword(e.target.value);
    setuserpassworderror("");
  };
  const handelform = (event) => {
    event.preventDefault();
    if (useremail == "") {
      setuseremailerror("Inter your email");
      setuserpassworderror("Inter your Password");
    } else if (userpassword == "") {
      setuserpassworderror("Inter your Password");
    } else {
      setloder(true);
      createUserWithEmailAndPassword(auth, useremail, userpassword)
        .then((user) => {
          setloder(false);
          setuseremail("");
          setuserpassword("");
          toast("🦄 Wow so easy!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        })
        .catch((error) => {
          const errorCode = error.code;
          // const errorMessage = error.message;
          // console.log(errorCode);
          setuseremailerror("this email already exist");
          setloder(false);
          console.log(errorCode);
        });
    }
  };
  return (
    <div className="w-[500px] mx-auto bg-gray-100 h-auto px-10 py-12 rounded-md mt-20 text-center">
      <ToastContainer />
      <h1 className="text-black font-sans font-bold text-3xl">Registration</h1>
      <hr className="mt-3 mb-3" />
      <form onSubmit={handelform}>
        <hr className="mt-3" />
        <div className="mt-5">
          <label htmlFor="email" className="text-black font-semibold text-1xl">
            Email:
          </label>
          <input
            onChange={handelemail}
            value={useremail}
            type="email"
            id="email"
            className="ml-5 px-2 py-1 rounded-md outline-none"
            placeholder="Inter Your Email"
          />
          <p className="mt-3 text-red-600">{useremailerror}</p>
        </div>
        <hr className="mt-3" />
        <div className="mt-5">
          <label
            htmlFor="password"
            className="text-black font-semibold text-1xl"
          >
            Password:
          </label>
          <input
            value={userpassword}
            onChange={handelpassword}
            type="password"
            id="password"
            className="ml-2 px-2 py-1 rounded-md outline-none"
            placeholder="Inter Your Password"
          />
          <p className="mt-3 text-red-600">{userpassworderror}</p>
        </div>
        <button
          type="submit"
          className="text-black font-mono font-bold border-2 border-rounded rounded-md border-black px-2 py-1 mt-5"
        >
          {
            loder ? (
            <div
              className="float-right inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
            </div>
          ) : (
            "submit"
            )
          }
        </button>

        <p className="mt-5 text-black">
          Have an account?
          <Link
            to="login"
            className=" font-semibold font-mono  ml-2 cursor-pointer text-red-300"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Registration;
