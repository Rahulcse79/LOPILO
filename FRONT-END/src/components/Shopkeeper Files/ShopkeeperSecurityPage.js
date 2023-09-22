import React,{useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function ShopkeeperSecurityPage() {

  const [Name,setName]=useState("");
  const [ShopId,setShopId]=useState(null);
  const [Password,setPassword]=useState("");
  const [Email,setEmail]=useState("");
  const [NewSecurityCode,setNewSecurityCode]=useState("");
  const [ReenterNewSecurityCode,setReenterNewSecurityCode]=useState("");
  const [ShowExit,setShowExit]=useState(false);
  const [ShowLastMessage,setShowLastMessage]=useState(false);
  const [RedAlert,setRedAlert]=useState(false);

  const navigate = useNavigate();

  const BackCall=()=>{
     if(ShowExit){
     localStorage.clear();
     navigate("/Shopkeeper");
     }
     else
     {
      alert("Please do not go back; set your security code right now.");
     }
  }

  const HomeCall=()=>{
    localStorage.clear();
    navigate("/");
  }

  const SubmitCall = async () => {
    if (NewSecurityCode === "") {
      alert("Create security code.");
      return;
    }
    else if (ReenterNewSecurityCode === "") {
      alert("Re-enter security code security code.");
      return;
    }

    const ShopkeeperInfo = localStorage.getItem('ShopkeeperInfo');
    const userObject = JSON.parse(ShopkeeperInfo);
    if(userObject)
    {
      if(userObject.email){setEmail(userObject.email)}
      if(userObject.password){setPassword(userObject.password)}
      if(userObject.shopid){setShopId(userObject.shopid)}
    try {
        let result = await fetch('http://localhost:4000/shopkeeperforgotsecuritypassword', {
        method: 'put',
        body: JSON.stringify({email: Email, password: Password, shopid: ShopId, securitycode: NewSecurityCode}),
        headers: {'Content-Type': 'application/json'}
      });
      result = await result.json();

    if(result.success){
      localStorage.clear();
      setShowExit(true);
      setShowLastMessage(true);       
     }
     else{
       alert("Error");
     }}
     catch (error) {
     alert("Server error, please try again.");
     console.error(error);
   };}else
   {
     alert("Please make sure to note it down or take a screenshot of shop id and forgot your security code.");
     setShowExit(true);
     setRedAlert(true);
   }
  }

  return (
    <div>
        <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-dark" data-spy="affix" data-offset-top={510} style={{marginBottom: "10px"}}>
          <div className="container">
            <div className="collapse mt-sm-20 navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a onClick={BackCall} className="nav-link" style={{cursor: "pointer",color: "white"}}>{"< "}Back</a>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  {ShowExit && (<a  className="nav-link" onClick={HomeCall} style={{cursor: "pointer", color: "#007bff"}}>Exit</a>)}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      <div style={{marginBottom: "20px"}}>
      <section className="bg-dark sectionshopkeeper">
      <div>
      <h6 className="text-light"> Hello {Name.toLowerCase()}, you have successfully created your account. Please make sure to note it down or take a screenshot.</h6>
      <h4 className="text-light">SHOP ID: {ShopId}</h4>
      </div>
      </section>
      </div>

      <div className="form-container">
      <form>
        <h4>Set your security code</h4>
        <div className="form-group">
          <label htmlFor="name" className="label">Enter code</label>
          <input type="text" value={NewSecurityCode} onChange={(e)=>setNewSecurityCode(e.target.value)} className="input-field" required placeholder='Enter your security code.'/>
        </div>
        <div className="form-group">
          <label htmlFor="name" className="label">Re-enter code</label>
          <input type="text" value={ReenterNewSecurityCode} onChange={(e)=>setReenterNewSecurityCode(e.target.value)} className="input-field" required placeholder='Re-enter security code.'/>
        </div>
        <button type="button" onClick={SubmitCall} className="submit-button">Submit</button>
      </form>
    </div>
    {ShowExit && ShowLastMessage && (<div style={{marginTop: "10px",marginBottom: "10px"}}>
      <section className="bg-dark sectionshopkeeper"><div>
      <h6 className="text-light">You have successfully set your security code, You may now exit.</h6> </div> </section> </div>
      )}
    
    {ShowExit && RedAlert && (<div style={{marginTop: "10px",marginBottom: "10px"}}>
      <section className="bg-dark sectionshopkeeper"><div>
      <h6 style={{color: "red"}}>An internal error occurred. Don't worry. Please make sure to note down your shop ID and, in case you forget your security code, you can recover it. If you have any queries or encounter any issues, feel free to reach out to the Lopilo Help Center, You may now exit.</h6> </div> </section> </div>
      )}

    </div>
  )
}
