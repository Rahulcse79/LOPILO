import {React,useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup() {

  const [Fullname,setName]=useState("");
  const [Email,setEmail]=useState("");
  const [OTP1,setOTP1]=useState("");
  const [Phone,setPhone]=useState("");
  const [OTP2,setOTP2]=useState("");
  const [Createpassword,setPassword1]=useState("");
  const [Reenterpassword,setPassword2]=useState("");
  const navigate = useNavigate();

  const CollectData = async()=>{
    let result = await fetch('http://localhost:4000/usersignup',{
        method: 'post',
        body: JSON.stringify({Fullname,Email,Phone,Createpassword,Reenterpassword}),
        headers: {
            'Content-Type':'application/json'
        }
    });
    result = await result.json();
    console.log(result);
    navigate("/");
 }

  return (
    <div>
        {/*Stylesheet*/}
        <style media="screen" dangerouslySetInnerHTML={{__html: "\n      *,\n*:before,\n*:after{\n    padding: 0;\n    margin: 0;\n    box-sizing: border-box;\n}\nbody{\n    background-color: #080710;\n}\n.background{\n    width: 430px;\n    height: 600px;\n    position: absolute;\n    transform: translate(-50%,-50%);\n    left: 50%;\n    top: 50%;\n}\n.background .shape{\n    height: 200px;\n    width: 200px;\n    position: absolute;\n    border-radius: 50%;\n}\n.shape:first-child{\n    background: linear-gradient(\n        #1845ad,\n        #23a2f6\n    );\n    left: -80px;\n    top: -80px;\n}\n.shape:last-child{\n    background: linear-gradient(\n        to right,\n        #ff512f,\n        #f09819\n    );\n    right: -30px;\n    bottom: -80px;\n}\nform{\n    height: 645px;\n   margin-top: 30px; width: 400px;\n    background-color: rgba(255,255,255,0.13);\n    position: absolute;\n    transform: translate(-50%,-50%);\n    top: 50%;\n    left: 50%;\n    border-radius: 10px;\n    backdrop-filter: blur(10px);\n    border: 2px solid rgba(255,255,255,0.1);\n    box-shadow: 0 0 40px rgba(8,7,16,0.6);\n    padding: 50px 35px;\n}\nform *{\n    font-family: 'Poppins',sans-serif;\n    color: #ffffff;\n    letter-spacing: 0.5px;\n    outline: none;\n    border: none;\n}\nform h3{\n    font-size: 32px;\n    font-weight: 500;\n    line-height: 42px;\n  margin-bottom: 33px; text-align: center;\n}\n\nlabel{\n    display: block;\n    margin-top: 30px;\n    font-size: 16px;\n    font-weight: 500;\n}\ninput{\n    display: block;\n    height: 50px;\n    width: 100%;\n    background-color: rgba(255,255,255,0.07);\n    border-radius: 3px;\n    padding: 0 10px;\n    margin-top: 8px;\n    font-size: 14px;\n    font-weight: 300;\n}\n::placeholder{\n    color: #e5e5e5;\n}\nbutton{\n    margin-top: 50px;\n    width: 100%;\n    background-color: #ffffff;\n    color: #080710;\n    padding: 15px 0;\n    font-size: 18px;\n    font-weight: 600;\n    border-radius: 5px;\n  margin-top: 10px;  cursor: pointer;\n}\n.social{\n  margin-top: 30px;\n  display: flex;\n}\n.social div{\n  background: red;\n  width: 150px;\n  border-radius: 3px;\n  padding: 5px 10px 10px 5px;\n  background-color: rgba(255,255,255,0.27);\n  color: #eaf0fb;\n  text-align: center;\n}\n.social div:hover{\n  background-color: rgba(255,255,255,0.47);\n}\n.social .fb{\n  margin-left: 25px;\n}\n.social i{\n  margin-right: 4px;\n}\n\n    " }} />
        <div className="background">
          <div className="shape" />
          <div className="shape" />
        </div>
        <form>
        <div className='backbuttondiv'>
          <a href="/" class="backbutton">&#8249;</a>
          </div> 
          <h3>Sign up</h3>
          <input type="text" value={Fullname} onChange={(e)=>setName(e.target.value)}  placeholder="Full name"/>
          <input type="text" value={Email} onChange={(e)=>setEmail(e.target.value)}  placeholder="Email"/>
          <input type="number" value={OTP1} onChange={(e)=>setOTP1(e.target.value)} placeholder="Enter Email OTP"/>
          <input type="number" value={Phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Phone"/>
          <input type="number" value={OTP2} onChange={(e)=>setOTP2(e.target.value)} placeholder="Enter phone OTP"/>
          <input type="password" value={Createpassword} onChange={(e)=>setPassword1(e.target.value)} placeholder="Create Password"/>
          <input type="password" value={Reenterpassword} onChange={(e)=>setPassword2(e.target.value)}  placeholder="Re-enter Password"/>
          <button type='button' onClick={CollectData} className='allbuttonSignup'>Sign up</button>
        </form>
    </div>
  )
}
