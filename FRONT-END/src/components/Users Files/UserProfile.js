import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';


export default function Userprofile() {
  
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
    console.log("click")
    setIsDropdownOpen(false);
  }

  
  const fetchUserProfile = async () => {
    try {
    const userInfo = JSON.parse(localStorage.getItem("UserInfo"));
    const TokenCall = userInfo.token;
    if (userInfo) {
    const { phone, name, email,image} = userInfo;
    setPhone(phone);
    setName(name);
    setEmail(email);
    setImageSRC(image);
    }

    let result = await fetch('http://localhost:4000/userprofile',{
    method: 'GET',
    headers: {
      Authorization: TokenCall
    }
    });
      result = await result.json();
      if (result.success) {
        console.log("Fetching user profile successful.");
      } else {
        console.error('Error fetching user profile');
        navigate('/Log-in');
      }
    } catch (error) {
      navigate('/Log-in');
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    
    const handleClickOutside = (event) => {
      const dropdown = document.getElementById('Dropdownuser');
      if (dropdown && !dropdown.contains(event.target)) {
        closeDropdown();
      }
    };
  
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
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
    }else{
    setShowSave(false);}
    handleUpload();
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
  
  
  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('email', Email);
      formData.append('name', Name);
      formData.append('phone', Phone);
      formData.append('city', City);
      formData.append('state', State);
      formData.append('pincode', Pincode);
      formData.append('address', Address);
      formData.append('dateofbirth', DateOfBirth);
  
    } catch (error) {
      alert("Error occurred while processing the request. Please try again.");
      console.error(error);
    }
  };
  
  const sendToServer = async (formData) => {
    try {
      let result = await fetch('http://localhost:4000/userupdateprofile', {
        method: 'put',
        body: formData,
      });
  
      result = await result.json();
  
      if (result.success) {
        const UserInfo = {
          name: result.responseData.name || '',
          phone: result.responseData.phone || '',
          city: result.responseData.city || '',
          state: result.responseData.state || '',
          dateofbirth: result.responseData.dateofbirth || '',
          pincode: result.responseData.pincode || '',
          address: result.responseData.address || '',
          image: result.responseData.image || '',
        };
  
        localStorage.setItem('UserInfo', JSON.stringify(UserInfo));
        navigate("/userprofile");
      } else {
        alert("Request was not successful. Please try again.");
      }
    } catch (error) {
      alert("An error occurred while processing your request. Please try again.");
      console.error(error);
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
            <li className="nav-item dropdown" onClick={toggleDropdown} onBlur={closeDropdown} id="Dropdownuser">
      <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{cursor: "pointer"}}>
        {CorrectName()}
      </a>
      <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`} aria-labelledby="navbarDropdown" style={{cursor: "pointer"}}>
        <a onClick={EditCall} className="dropdown-item">Update profile</a>
        <a onClick={HelpCenter} className="dropdown-item">Help center</a>
        <a onClick={ChangePassword} className="dropdown-item">Change Password</a>
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
      <h1 className="header-title" style={{color: "white"}}><div>&nbsp;&nbsp;{Name.charAt(0).toUpperCase() + Name.slice(1)}</div></h1>
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
