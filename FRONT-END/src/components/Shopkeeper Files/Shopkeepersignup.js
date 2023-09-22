import {React,useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup() {

  const [Fullname,setFullname]=useState("");
  const [Email,setEmail]=useState("");
  const [OTP1,setOTP1]=useState(null);
  const [Phone,setPhone]=useState(null);
  const [OTP2,setOTP2]=useState(null);
  const [Createpassword,setCreatepassword]=useState("");
  const [Reenterpassword,setReenterpassword]=useState("");

  const navigate = useNavigate();

  const BAckCall =()=>{
    navigate("/Shopkeeper");
  }

  const CollectData = async () => {
    if (Fullname === "") {
      alert("Full name is required.");
      return;
    }
    else if (Email === "") {
      alert("Email is required.");
      return;
    }
    else if (Phone === null || Phone.length < 10 || Phone.length > 10) {
      if(Phone === null) alert("Phone number is required.");
      else alert("Please enter 10 digits phone number.");
      return;
    }
    else if ((Createpassword === "") || (Createpassword.length < 12)) {
      alert("Create your password atleast 12 charter.");
      return;
    }
    else if (Reenterpassword === "") {
      alert("Re enter your password.");
      return;
    }
    else if(Reenterpassword !== Createpassword)
    {
      alert("Re-enter password and create password are different.");
      return;
    }

    try {
        let result = await fetch('http://localhost:4000/shopkeepersignup', {
        method: 'post',
        body: JSON.stringify({ name: Fullname, email: Email, phone: Phone, password: Createpassword}),
        headers: {'Content-Type': 'application/json'}
      });
        result = await result.json();
        const ShopId = result.shopid;
        if(result.success){
         console.log("Signup successfully.");
         const ShopkeeperInfo = { email: Email, password: Createpassword, shopid: ShopId};
         localStorage.setItem('ShopkeeperInfo', JSON.stringify(ShopkeeperInfo));
         navigate("/Shopkeeper-security-page");
        }
        else{
          alert("User with this email and phone already exists.");
        }
      } 
        catch (error) {
          alert("Server error, please try again.");
        console.log(error);
      }};

  return (
    <div>
        {/*Stylesheet*/}
        <style media="screen" dangerouslySetInnerHTML={{__html: "\n      *,\n*:before,\n*:after{\n    padding: 0;\n    margin: 0;\n    box-sizing: border-box;\n}\nbody{\n    background-color: #080710;\n}\n.background{\n    width: 430px;\n    height: 1400px;\n    position: absolute;\n    transform: translate(-50%,-50%);\n    left: 50%;\n    top: 50%;\n}\n.background .shape{\n    height: 200px;\n    width: 200px;\n    position: absolute;\n    border-radius: 50%;\n}\n.shape:first-child{\n    background: linear-gradient(\n        #1845ad,\n        #23a2f6\n    );\n    left: -80px;\n    top: 340px;\n}\n.shape:last-child{\n    background: linear-gradient(\n        to right,\n        #ff512f,\n        #f09819\n    );\n    right: -30px;\n    bottom: -80px;\n}\nform{\n    height: 1000px;\n   margin-top: 230px; width: 400px;\n    background-color: rgba(255,255,255,0.13);\n    position: absolute;\n    transform: translate(-50%,-50%);\n    top: 50%;\n    left: 50%;\n    border-radius: 10px;\n    backdrop-filter: blur(10px);\n    border: 2px solid rgba(255,255,255,0.1);\n    box-shadow: 0 0 40px rgba(8,7,16,0.6);\n    padding: 50px 35px;\n}\nform *{\n    font-family: 'Poppins',sans-serif;\n    color: #ffffff;\n    letter-spacing: 0.5px;\n    outline: none;\n    border: none;\n}\nform h3{\n    font-size: 32px;\n    font-weight: 500;\n    line-height: 42px;\n  margin-bottom: 33px; text-align: center;\n}\n\nlabel{\n    display: block;\n    margin-top: 30px;\n    font-size: 16px;\n    font-weight: 500;\n}\ninput{\n    display: block;\n    height: 50px;\n    width: 100%;\n    background-color: rgba(255,255,255,0.07);\n    border-radius: 3px;\n    padding: 0 10px;\n    margin-top: 8px;\n    font-size: 14px;\n    font-weight: 300;\n}\n::placeholder{\n    color: #e5e5e5;\n}\nbutton{\n    margin-top: 50px;\n    width: 100%;\n    background-color: #ffffff;\n    color: #080710;\n    padding: 15px 0;\n    font-size: 18px;\n    font-weight: 600;\n    border-radius: 5px;\n  margin-top: 10px;  cursor: pointer;\n}\n.social{\n  margin-top: 30px;\n  display: flex;\n}\n.social div{\n  background: red;\n  width: 150px;\n  border-radius: 3px;\n  padding: 5px 10px 10px 5px;\n  background-color: rgba(255,255,255,0.27);\n  color: #eaf0fb;\n  text-align: center;\n}\n.social div:hover{\n  background-color: rgba(255,255,255,0.47);\n}\n.social .fb{\n  margin-left: 25px;\n}\n.social i{\n  margin-right: 4px;\n}\n\n    " }} />
        <div className="background">
          <div className="shape" />
          <div className="shape" />
        </div>
        <form>
        <div className='backbuttondiv'><a onClick={BAckCall} class="backbutton">&#8249;</a></div> 
        <h3>Shopkeeper sign up</h3>
          <label htmlFor="username">Full name<span style={{color: "red"}}>*</span></label>
          <input type="text" value={Fullname} onChange={(e)=>setFullname(e.target.value)}  placeholder="Enter your full name."/>
          <label htmlFor="username">Email<span style={{color: "red"}}>*</span></label>
          <input type="text" value={Email} onChange={(e)=>setEmail(e.target.value)}  placeholder="Enter your email."/>
          <label htmlFor="username">Enter Email OTP</label>
          <input type="number" value={OTP1} onChange={(e)=>setOTP1(e.target.value)} placeholder="Enter email OTP."/>
          <label htmlFor="username">Phone<span style={{color: "red"}}>*</span></label>
          <input type="number" value={Phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Enter your phone number."/>
          <label htmlFor="username">Enter phone OTP</label>
          <input type="number" value={OTP2} onChange={(e)=>setOTP2(e.target.value)} placeholder="Enter phone OTP."/>
          <label htmlFor="password">Create Password<span style={{color: "red"}}>*</span></label>
          <input type="password" value={Createpassword} onChange={(e)=>setCreatepassword(e.target.value)} placeholder="Create your password atleast 12 charter."/>
          <label htmlFor="password">Re-enter Password<span style={{color: "red"}}>*</span></label>
          <input type="password" value={Reenterpassword} onChange={(e)=>setReenterpassword(e.target.value)}  placeholder="Re-enter your password."/>
          <button type='button' onClick={CollectData} className='allbuttonSignup'>Sign up</button>
        </form>
    </div>
  )
}
