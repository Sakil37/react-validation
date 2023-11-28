import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [reset, setreset] = useState(false);
  const [loder, setLoder] = useState(false);
  const [email, setEmail] = useState("");
  const [erroremail, seterrorEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorpassword, seterrorpassword] = useState("");
  const handellogin = (event) => {
    event.preventDefault();
    if (email == "") {
      seterrorEmail("Inter Your email");
    }
    if (password == "") {
      seterrorpassword("Inter your password");
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((loginuser) => {
          setLoder(true);
          setEmail("");
          setPassword("");
          setTimeout(() => {
            navigate("/home");
          }, 2000);
          toast("🦄 login succes", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .catch((error) => {
          setreset(true);
          setLoder(false);
          const errorCode = error.code;
          // const errorMessage = error.message;
          console.log(errorCode);
          if (errorCode == "auth/user-not-found") {
            seterrorEmail("user not found");
          } else if (errorCode == "auth/wrong-password") {
            seterrorpassword("wrong password");
          }
        });
    }
  };
  //
  const handelloginemail = (event) => {
    setEmail(event.target.value);
  };
  //
  const handelloginpassword = (event) => {
    setPassword(event.target.value);
  };
  //
  const handelreset = () => {
    navigate("/forget");
  };
  //
  return (
    <div className="container mx-auto">
      <ToastContainer />
      <div className="w-[500px] mx-auto bg-gray-100 h-auto px-10 py-12 rounded-md mt-20 text-center">
        <h1 className="text-black font-sans font-bold text-3xl"> Login</h1>
        <hr className="mt-3 mb-3" />
        <form onSubmit={handellogin}>
          <hr className="mt-3" />
          <div className="mt-5">
            <label
              htmlFor="email"
              className="text-black font-semibold text-1xl"
            >
              Email:
            </label>
            <input
              value={email}
              onChange={handelloginemail}
              type="email"
              id="email"
              className="ml-5 px-2 py-1 rounded-md outline-none"
              placeholder="Inter Your Email"
            />
            <p className="mt-3 text-red-600">{erroremail}</p>
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
              value={password}
              onChange={handelloginpassword}
              type="password"
              id="password"
              className="ml-2 px-2 py-1 rounded-md outline-none"
              placeholder="Inter Your Password"
            />
            <p className="mt-3 text-red-600">{errorpassword}</p>
          </div>
          <button
            type="submit"
            className="text-black font-mono font-bold border-2 border-rounded rounded-md border-black px-2 py-1 mt-5"
          >
            {loder ? (
              <div
                className="float-right inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
              </div>
            ) : (
              "login"
            )}
          </button>
          {reset ? (
            <button
              onClick={handelreset}
              className="text-black font-mono font-bold border-2 border-rounded rounded-md border-black px-2 py-1 mt-5 ml-3"
            >
              Reset
            </button>
          ) : (
            ""
          )}
          <p className="mt-5 text-black">
            Are you new account?
            <Link
              className=" ml-4 font-semibold font-mono cursor-pointer text-red-300 "
              to="/"
            >
              Registration
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
