import {React,useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function ForgotPage() {

  const [Username,setUsername]=useState("");
  const [Otp,setOtp]=useState(null);
  const [Password,setPassword]=useState("");
  const [ReenterPassword,setReenterPassword]=useState("");
  
  const navigate = useNavigate();

  const CollectData = async () => {
    if (Username === "") {
      alert("Username is required.");
      return;
    }
    else if (Password === "") {
      alert("New Password is required.");
      return;
    }
    else if (Password.length < 12) {
      alert("Create your password atleast 12 charter.");
      return;
    }
    else if (ReenterPassword === "") {
      alert("Re-enter password is required.");
      return;
    }
    else if (Password !== ReenterPassword) {
      alert("New password and re-enter password are different.");
      return;
    }

    try {
        await fetch('http://localhost:4000/forgotpassword',{
        method: 'post',
        body: JSON.stringify({Username,Password}),
        headers: {'Content-Type': 'application/json'}
      });
        navigate("/Log-in");
    } 
      catch (error) {
      console.error(error);
    }};
    
  return (
    <div>
       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css" />
        {/*Stylesheet*/}
        <style media="screen" dangerouslySetInnerHTML={{__html: "\n      *,\n*:before,\n*:after{\n    padding: 0;\n    margin: 0;\n    box-sizing: border-box;\n}\nbody{\n    background-color: #080710;\n}\n.background{\n    width: 430px;\n    height: 520px;\n    position: absolute;\n    transform: translate(-50%,-50%);\n    left: 50%;\n    top: 50%;\n}\n.background .shape{\n    height: 200px;\n    width: 200px;\n    position: absolute;\n    border-radius: 50%;\n}\n.shape:first-child{\n    background: linear-gradient(\n        #1845ad,\n        #23a2f6\n    );\n    left: -80px;\n    top: -80px;\n}\n.shape:last-child{\n    background: linear-gradient(\n        to right,\n        #ff512f,\n        #f09819\n    );\n    right: -30px;\n    bottom: -80px;\n}\nform{\n    height: 590px;\n    width: 400px;\n    background-color: rgba(255,255,255,0.13);\n    position: absolute;\n    transform: translate(-50%,-50%);\n    top: 50%;\n    left: 50%;\n    border-radius: 10px;\n    backdrop-filter: blur(10px);\n    border: 2px solid rgba(255,255,255,0.1);\n    box-shadow: 0 0 40px rgba(8,7,16,0.6);\n    padding: 50px 35px;\n}\nform *{\n    font-family: 'Poppins',sans-serif;\n    color: #ffffff;\n    letter-spacing: 0.5px;\n    outline: none;\n    border: none;\n}\nform h3{\n    font-size: 32px;\n    font-weight: 500;\n    line-height: 42px;\n  text-align: center;\n}\n\nlabel{\n    display: block;\n    margin-top: 15px;\n    font-size: 16px;\n    font-weight: 500;\n}\ninput{\n    display: block;\n    height: 50px;\n    width: 100%;\n    background-color: rgba(255,255,255,0.07);\n    border-radius: 3px;\n    padding: 0 10px;\n    margin-top: 8px;\n    font-size: 14px;\n    font-weight: 300;\n}\n::placeholder{\n    color: #e5e5e5;\n}\nbutton{\n    margin-top: 50px;\n    width: 100%;\n    background-color: #ffffff;\n    color: #080710;\n    padding: 15px 0;\n    font-size: 18px;\n    font-weight: 600;\n    border-radius: 5px;\n  margin-top: 10px;  cursor: pointer;\n}\n.social{\n  margin-top: 30px;\n  display: flex;\n}\n.social div{\n  background: red;\n  width: 150px;\n  border-radius: 3px;\n  padding: 5px 10px 10px 5px;\n  background-color: rgba(255,255,255,0.27);\n  color: #eaf0fb;\n margin-top: -14px; text-align: center;\n}\n.social div:hover{\n  background-color: rgba(255,255,255,0.47);\n}\n.social .fb{\n  margin-left: 25px;\n}\n.social i{\n  margin-right: 4px;\n}\n\n    " }} />
        <div className="background">
          <div className="shape" />
          <div className="shape" />
        </div>
        <form>
          <div className='backbuttondiv'>
          <a href="/Log-in" class="backbutton">&#8249;</a>
          </div> 
          <h3>Forgot password</h3>
          <label htmlFor="username">Username<span style={{color: "red"}}>*</span></label>
          <input type="text" value={Username} onChange={(e)=>setUsername(e.target.value)} placeholder="Email or Phone"/>
          <label htmlFor="password">Enter OTP</label>
          <input type="number" value={Otp} onChange={(e)=>setOtp(e.target.value)} placeholder="Enter OTP"/>
          <label htmlFor="password">New password<span style={{color: "red"}}>*</span></label>
          <input type="password" value={Password} onChange={(e)=>setPassword(e.target.value)} placeholder="New password"/>
          <label htmlFor="password">Re-enter new password<span style={{color: "red"}}>*</span></label>
          <input type="password" value={ReenterPassword} onChange={(e)=>setReenterPassword(e.target.value)} placeholder="Re-enter new password"/>
          <button type='button' onClick={CollectData} className='allbuttonForgot'>Continue</button>
        </form>
    </div>
  )
}
