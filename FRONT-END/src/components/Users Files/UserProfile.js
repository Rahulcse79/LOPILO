import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';


export default function Userprofile() {
  
  const [Name,setName]=useState("");
  const [Email,setEmail]=useState("");
  const [AddAutoInput,setAddAutoInput]=useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenSuggestion, setIsDropdownOpenSuggestion] = useState(false);
  const [ShowEmailPhone, setShowEmailPhone] = useState(true);
  const [AddSuggestionShow, setAddSuggestionShow] = useState(false); 
  const [ShowImage, setShowImage] = useState(false);
  const [ShowSave, setShowSave] = useState(false);
  const [ImageSRC, setImageSRC]=useState(null)
  const [UpdateName, setUpdateName]=useState(Name)
  const [UpdateSearch, setUpdateSearch]=useState("");
  const [Phone, setPhone]=useState(null)
  const [previewURL, setPreviewURL] = useState("");
  const [DateOfBirth, setDateOfBirth] = useState(null);
  const [Address, setAddress] = useState("");
  const [Pincode,setPincode]= useState(null);
  const [City,setCity]=useState("");
  const [State,setState]= useState("");
  const [SuggestionArray,setSuggestionArray]= useState([]);
  const [AnsSuggestionArray,setAnsSuggestionArray]= useState([]);

  const navigate = useNavigate(); 

  class Trie {
    constructor(data) {
        this.data = data;
        this.children = new Array(26).fill(null);
        this.isTerminal = false;
    }
  }

  function insert(root, word) {
 
    if (word.length === 0) {
        root.isTerminal = true;
        return;
    }
    const ch = word[0];
    const idx = ch.charCodeAt(0) - 'a'.charCodeAt(0);
    let child;
    if (root.children[idx] !== null) {
        child = root.children[idx];
    } else {
        child = new Trie(ch);
        root.children[idx] = child;
    }
    insert(child, word.substr(1));
}

function FindSuggestion(curr, prefix, temp) {
  if (curr.isTerminal === true) {
      temp.push(prefix);
  }
  for (let ch = 'a'; ch <= 'z'; ch = String.fromCharCode(ch.charCodeAt(0) + 1)) {
      const idx = ch.charCodeAt(0) - 'a'.charCodeAt(0);
      const next = curr.children[idx];
      if (next) {
          prefix += ch;
          FindSuggestion(next, prefix, temp);
          prefix = prefix.slice(0, -1);
      }
  }
}

function suggestion(root, word) {
  const ans = [];
  let prefix = "";
  let prev = root;
  for (let i = 0; i < word.length; i++) {
      const ch = word[i];
      const idx = ch.charCodeAt(0) - 'a'.charCodeAt(0);
      const curr = prev.children[idx];
      if (curr !== null) {
          prefix += ch;
          const temp = [];
          FindSuggestion(curr, prefix, temp);
          ans.push(temp);
          prev = curr;
      } else {
          return ans;
      }
  }
  return ans;
}

const SuggestionMainFunction = async (v) => {
  const root = new Trie('-');
  
  for (const it of v) {
      insert(root, it);
  }

  const ans = await suggestion(root, UpdateSearch);

  if (UpdateSearch.length > 1) {
      setAnsSuggestionArray(ans[(UpdateSearch.length) - 1]);
  }
}


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
    ComeingSuggestationData();
    SuggestionMainFunction(SuggestionArray);
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

  const Suggestion = () =>{
    let str = UpdateSearch.replace(/\s/g, '');
    SuggestionMainFunction(SuggestionArray);
  }

  const CheckValidString = (AddAutoInput) => {
    for(let i = 0; i < AddAutoInput.length; i++) {
      const charCode = AddAutoInput.charCodeAt(i);
      if(charCode < 97 || charCode > 122) {
        return 0;
      }
    }
  
    return 1;
  }

  const ComeingSuggestationData = async() => {   
    try {
        let result = await fetch('http://localhost:4001/addautosuggestion', {  
            method: 'get',
            headers: {'Content-Type': 'application/json'}
        });
        result = await result.json();
        if(result.success){
            const suggestionDataArray = result.existingUser.map(user => user.suggestionstring);
            setSuggestionArray(suggestionDataArray);
        } else {
            alert("Suggestion Data Failed.");
        }
    } catch (error) {
        alert("Server error, please try again.");
        console.log(error);
    }
}

  const AddStrignInAutoSuggestionAPICall = async() => {   
    
    if(AddAutoInput === "")
    {
      alert("String is required.");
      return;
    }
    else if(!CheckValidString(AddAutoInput))
    {
      alert("Invalid String.");
      return;
    }
    
    try {
      let result = await fetch('http://localhost:4001/addautosuggestion', {  
      method: 'post',
      body: JSON.stringify({ suggestionstring: AddAutoInput}),
      headers: {'Content-Type': 'application/json'}
    });
    result = await result.json();
      if(result.success){
    
        alert("Added successfully.");
        setAddAutoInput("");
      }
      else{
        alert("Already string added.");
      }
    } 
      catch (error) {
      alert("Server error, please try again.");
      console.log(error);
    }

  }

  const AddStringCloseUpdateCall = () => {
    setShowEmailPhone(true);
    setAddSuggestionShow(false);
  }

  const CloseUpdateCall = () => {
    setShowEmailPhone(true);
    setAddSuggestionShow(false);
    setShowSave(false);
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
    setShowEmailPhone(false);
  }

  const StoreStringCall=()=>{
    setShowSave(false);
    setShowEmailPhone(false);
    setAddSuggestionShow(true);
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
          <input type="text" className="form-control" value={UpdateSearch} onChange={(e) => {setUpdateSearch(e.target.value); SuggestionMainFunction(SuggestionArray);}}  placeholder="Search" aria-label="Search" aria-describedby="basic-addon2" />
    <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button">Search</button>
          
          <li className="nav-item dropdown" id="Dropdownuser1">
      <a className="nav-link dropdown-toggle" id="navbarDropdown1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      </a>
      <div className={`dropdown-menu ${ (UpdateSearch.length>0)? 'show' :''}`} aria-labelledby="navbarDropdown" style={{cursor: "pointer", marginLeft: "-277px",marginTop: "1px"}}>
        {AnsSuggestionArray.map((item, index) => (
          <a key={index} className="dropdown-item">{item}</a>
        ))}
      </div>
    </li>
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
        <a onClick={StoreStringCall} className="dropdown-item">Store string suggestion</a>
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
      {ShowSave && (<div className="form-container" style={{marginTop: "20px"}}>
     <form>
        <h4>Update your profile</h4>
        <div className="form-group">
          <label htmlFor="name" className="label">Profile photo</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} style={{cursor: "pointer"}}/>
        </div>
        <div className="form-group">
          <label htmlFor="name" className="label">Update name</label>
          <input type="text" value={UpdateName} onChange={(e)=>setUpdateName(e.target.value)} className="input-field" required placeholder='Enter your name.'/>
        </div>
        <button type="button" onClick={SaveCall} className="submit-button">Save</button>
        <button type="button" onClick={CloseUpdateCall} className="submit-button" style={{marginTop: "10px"}}>Back</button>
      </form>
      </div>)}

      {AddSuggestionShow && (<div className="form-container" style={{marginTop: "20px"}}>
     <form>
        <h4>Add string in Api</h4>
        <div className="form-group">
          <label htmlFor="name" className="label">Enter string</label>
          <input type="text" value={AddAutoInput} onChange={(e)=>setAddAutoInput(e.target.value)} className="input-field" required placeholder='Enter string.'/>
        </div>
        <button type="button" onClick={AddStrignInAutoSuggestionAPICall} className="submit-button">Add</button>
        <button type="button" onClick={AddStringCloseUpdateCall} className="submit-button" style={{marginTop: "10px"}}>Back</button>
      </form>
      </div>)}

      {ShowEmailPhone && (<div>
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
