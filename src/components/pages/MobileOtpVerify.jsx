import { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";
import OTPInput from "react-otp-input";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth, db } from "../utilities/firebase";
import Spinner from "../header/Spinner";
import { client } from "../main/client";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../Contexts/UserContext";

const MobileOtpVerify = ({ userId ,setShowDialog, setRefech, setUser}) => {
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ph, setPh] = useState("");
  const [otp, setOtp] = useState("");
  const {setCurrentUser} = useAuth()
  const [showOtp, setShowOtp] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  function onCaptchaVerify() {
    if (!window.RecaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        }
      );
    }
  }

  async function onSignup(event) {
    event.preventDefault();
    setLoading(true);
    onCaptchaVerify();
    const appVerifier = window.recaptchaVerifier;
    const phoneNumber = "+91" + ph;

    try {
        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
        setConfirmationResult(confirmationResult); // Store confirmation result
        setLoading(false);
        setShowOtp(true)
        toast.success("OTP Sent Successfully");
      } catch (error) {
        setLoading(false);
        toast.error(error.message);
      }
  }

  async function onOtpverify() {
    event.preventDefault();
    try {
        await confirmationResult.confirm(otp);
        // User successfully verified, but we don't need to set the user state here
        // You can proceed to update the user's mobile number if needed
        updateUserNumber();
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        toast.error(error.message);
      }
  }
  async function updateUserNumber() {
    
      setIsLoading(true);
      try {
       
       
        
        const updatedUser = await client.patch(userId).set({mobileNumber : ph}).commit();
        const firebaseUser = await getDoc(doc(db, "users", userId));
        setCurrentUser(firebaseUser.data())
        setShowDialog(false)
        setIsLoading(false)
        setUser(updatedUser)
        
        console.log("User mobile number updated:", updatedUser);
      } catch (error) {
        console.error("Error updating user mobile number:", error);
      }
    
  }
  if (isLoading) return <Spinner />;
  return (
    <div className="flex flex-col items-center justify-center bg-white  rounded-3xl w-full p-4">
      <div className="flex flex-col justify-center items-center gap-4 p-2 md:p-4 lg:p-6 w-full">
        {!showOtp ? (
          <>
          <form onSubmit={onSignup}>
            <h1 className="text-2xl md:text-4xl text-center font-bold my-6 uppercase">
              Enter Your Phone Number
            </h1>
            <div className=" py-3 px-2 md:px-6 border-2 flex items-center border-black rounded-2xl w-full ">
              <span className="text-lg w-1/5 md:text-2xl font-semibold ">
                +91
              </span>
              <input
                value={ph}
                onChange={(e) => setPh(e.target.value)}
                type="number"
                placeholder="Enter your number"
                className="remove-arrow w-4/5 text-lg  md:text-2xl font-semibold outline-none"
              />
            </div>
            <button
              onClick={onSignup}
              disabled={loading}
              className="mt-4 flex items-center justify-center gap-2 w-full text-white h-14 rounded-xl outline-none text-base font-semibold bg-gradient-to-r to-blue-700  from-blue-500"
            >
              {loading ? (
                <TailSpin
                  height="30"
                  width="30"
                  color="white"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              ) : (
                "Send OTP"
              )}
            </button>
            </form>
            <div id="recaptcha-container" className="mt-6"></div>
          </>
        ) : (
          <>
          <form onSubmit={onOtpverify}>
            <h1 className=" text-2xl md:text-4xl text-center font-bold my-2 uppercase text-black w-full">
              Enter The OTP
            </h1>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              shouldAutoFocus
              renderInput={(props) => (
                <input
                  {...props}
                  type="number"
                  className="remove-arrow border-2 w-1/5 max-w-[40px] rounded-xl text-center text-2xl font-semibold"
                  style={{
                    
                   
                    marginRight: "12px",
                  }}
                />
              )}
            ></OTPInput>
            <button
              onClick={onOtpverify}
              disabled={loading}
              className="mt-4 flex items-center justify-center gap-2 w-full text-white h-14 rounded-xl outline-none text-base font-semibold bg-gradient-to-r to-blue-700  from-blue-500"
            >
              {loading ? (
                <TailSpin
                  height="30"
                  width="30"
                  color="white"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              ) : (
                "Verify OTP"
              )}
            </button>
            </form>
          </>

        )}
      </div>
    </div>
  );
};

export default MobileOtpVerify;
