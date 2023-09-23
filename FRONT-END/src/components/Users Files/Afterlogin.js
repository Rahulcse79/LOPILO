import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

export default function Afterlogin() {
  

 
  //  localStorage.clear(); pending.
  const [Name,setName]=useState("");
  const [Email,setEmail]=useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [ShowImage, setShowImage] = useState(false);
  const [ShowSave, setShowSave] = useState(false);
  const [ImageSRC, setImageSRC]=useState(null)
  const [UpdateName, setUpdateName]=useState(Name)
  const [Phone, setPhone]=useState(null)
  const [previewURL, setPreviewURL] = useState("");
  const [DateOfBirth, setDateOfBirth] = useState(null);
  const [Address, setAddress] = useState("");
  const [Pincode,setPincode]= useState(null);
  const [City,setCity]=useState("");
  const [State,setState]= useState("");

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  }

  useEffect(() => {
    const userObject = JSON.parse(localStorage.getItem('userInfo'));
    if (userObject) {

      setName(userObject.name || "");
      setEmail(userObject.email || "");
      setPhone(userObject.phone || null);
      setPreviewURL(userObject.image || "");
      setAddress(userObject.address || "")
      setPincode(userObject.pincode || null)
      setCity(userObject.city || "")
      setState(userObject.state || "")
      setDateOfBirth(userObject.dateofbirth || null)

    } else {
      alert("Timeout, please log in again.");
      setTimeout(() => {
        // add spinner 
        navigate("/");
      }, 5000);
    }
  }, []);

  const CorrectName=()=>{
    let FirstName = Name.split(' ')[0];
    FirstName = FirstName.charAt(0).toUpperCase() + FirstName.slice(1);
    return FirstName
  }

  const HelpCenter=()=>{
    navigate("/HelpCenter");
  }

  const LogOut=()=>{
    localStorage.clear();
    navigate("/Log-in");
  }
  
  const ChangePassword=()=>{
    navigate("/ChangePassword");
  }

  const EditCall=()=>{
    setShowSave(true);
  }

  const SaveCall = ()=>{
    
    if(previewURL != ""){
    setShowImage(true);
    }
    setShowSave(false);
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImageSRC(file);
  
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewURL(reader.result);
    };
    reader.readAsDataURL(file);
  };
  
 //name,image,dateofbirth,address,pincode,phone,city,state
  const handleUpload = () => {
    if (ImageSRC) {
      const formData = new FormData();
      formData.append('image', ImageSRC);

      fetch('http://localhost:3000/userupdateprofile', {
        method: 'put',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          console.log('Image uploaded successfully:', data);
        })
        .catch(error => {
          console.error('Error uploading image:', error);
        });
    } else {
      console.error('No file selected.');
    }
  };

 
  return (
    <div>
     <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light" data-spy="affix" data-offset-top={510} style={{marginBottom: "10px"}}>
      <div className="container">
        <div className="collapse mt-sm-20 navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
          <h1 className="header-title">LOPILO</h1>
          </ul>
          <ul className="navbar-nav mr-auto">
          <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon2" />
          <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button">Search</button>
          </div>
          </div>
          </ul>
          <ul className="navbar-nav ml-auto">
          <li className="nav-item" style={{display: "flex",justifyContent: "space-between",alignItems: "center"}}>
              { ShowImage && previewURL && (<img src={previewURL} alt="Logo" className="UserImageOFProfile"/>)}
            </li>
          <li className="nav-item dropdown" onClick={toggleDropdown} onBlur={closeDropdown}>
              <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{cursor: "pointer"}}>{CorrectName()}</a>
              <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`} aria-labelledby="navbarDropdown" style={{cursor: "pointer"}}>
              <a onClick={EditCall} className="dropdown-item" >Update profile</a>
              <a onClick={HelpCenter} className="dropdown-item" >Help center</a>
              <a onClick={ChangePassword} className="dropdown-item" >Change Password</a>
              <a onClick={LogOut} className="dropdown-item">Logout</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div>
    <header className="header4">
    <div className="header-content">
    <div className="header-mono" style={{display: "flex",alignItems: "center"}}>
      <div style={{marginTop: "90px",marginLeft: "50px",display: "flex",alignItems: "center"}}>
      {ShowImage && previewURL && (<img src={previewURL} alt="Logo" className="UserImageOFProfileQW"/>)}
      <h1 className="header-title" style={{color: "white"}}><div>&nbsp;&nbsp;{Name.charAt(0).toUpperCase() + Name.slice(1).toLowerCase()}</div></h1>
      </div>
      </div>
    </div>
    <div>
    </div>
    </header>
    </div>
      {ShowSave?(<div className="form-container" style={{marginTop: "20px"}}>
     <form>
        <h4>Update your profile</h4>
        <div className="form-group">
          <label htmlFor="name" className="label">Profile photo</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} style={{}}/>
        </div>
        <div className="form-group">
          <label htmlFor="name" className="label">Update name</label>
          <input type="text" value={UpdateName} onChange={(e)=>setUpdateName(e.target.value)} className="input-field" required placeholder='Enter your name.'/>
        </div>
        <button type="button" onClick={SaveCall} className="submit-button">Save</button>
      </form>
      </div>):
      (<div>
        {/*Section*/}
      <div>
      <section className="bg-dark sectionshopkeeper2" style={{display: "flex",justifyContent: "space-between",alignItems: "center"}}>
      <div>
      <h6 className="text-light" style={{marginLeft: "100px"}}>Email:&nbsp; {Email}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Phone: {Phone}</h6>
      </div> 
      </section>
      </div>

      </div>)}
    </div>
  )
}
