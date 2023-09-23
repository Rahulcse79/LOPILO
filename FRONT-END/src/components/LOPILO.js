import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Lopilo = () => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState(null);
  const [Message, setMessage] = useState("");

  const navigate = useNavigate();

  const HomeCall =()=>{
    navigate("/");
  }

  const AboutCall =()=>{
    navigate("/");
  }

  const PhotosCall =()=>{
    navigate("/Photos");
  }

  const ShopkeeperCall =()=>{
    localStorage.clear();  
    navigate("/Shopkeeper");
  }

  const LoginCall =()=>{
    localStorage.clear();
    navigate("/Log-in");
  }

  const SignupCall =()=>{
    localStorage.clear();
    navigate("/Sign-up");
  }
  
  const CollectData = async () => {
    if (Phone === null) {
      alert("Phone is required.");
      return;
    }
    else if (Phone.length !== 10) {
      alert("Please enter 10 digit phone number.");
      return;
    }

    try {
        let result = await fetch('http://localhost:4000/message', {
        method: 'post',
        body: JSON.stringify({ name: Name, email: Email, phone: Phone, message: Message}),
        headers: {'Content-Type': 'application/json'}
      });
      result = await result.json();

    if(result.success){
      alert("Your message has been sent successfully.");
      navigate("/");
     }
     else{
       alert("Please enter the correct details.");
     }}
     catch (error) {
      alert("Server error, please try again.");
     console.error(error);
   };
  }

  return (
      <div>
        {/*Main image section*/}
        <header className="header">
        <div className="container">
            <div className="header-content">
              <h1 className="header-title">LOPILO</h1>
              <h6 className="header-mono">Find the best wine shop in India</h6>
              </div>
          </div>
        </header>
        <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-white" data-spy="affix" data-offset-top={510}>
          <div className="container">
            <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse mt-sm-20 navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a onClick={HomeCall} className="nav-link" style={{cursor: "pointer"}}>Home</a>
                </li>
                <li className="nav-item">
                  <a onClick={AboutCall} className="nav-link" style={{cursor: "pointer"}}>About</a>
                </li>
                <li className="nav-item">
                  <a onClick={PhotosCall} className="nav-link" style={{cursor: "pointer"}}>Photos</a>
                </li>
              </ul>
              <ul className="navbar-nav brand">
              <img src={require("./Image/Bottle.avif")} alt="" className="brand-img" />
              </ul>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a onClick={ShopkeeperCall} className="nav-link" style={{cursor: "pointer"}}>Shopkeeper</a>
                </li>
                <li className="nav-item">
                  <a onClick={LoginCall} className="nav-link" style={{cursor: "pointer"}}>Log in</a>
                </li>
                <li className="nav-item last-item">
                  <a onClick={SignupCall} className="nav-link" style={{cursor: "pointer"}}>Sign up</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

         {/*top 10 wines*/}
        <section className="section bg-dark py-5">
          <div className="container text-center">
            <h2 className="text-light mb-5 font-weight-normal" style={{marginTop: "90px"}}>Top 10 wines</h2>
          </div>
        </section>

        <section className="section" id="service">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-sm-6">
                <div className="card mb-5">
                  <div className="card-header has-icon">
                    <i className="ti-vector text-danger" aria-hidden="true" />
                  </div>
                  <div className="card-body px-4 py-3">
                    <h5 className="mb-3 card-title text-dark">Johnnie Walker</h5>
                    <p className="subtitle">Johnnie Walker is a brand of Scotch whisky produced by Diageo in Scotland. It originated in the Scottish burgh of Kilmarnock in East Ayrshire. The brand was first established by grocer John Walker.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="card mb-5">
                  <div className="card-header has-icon">
                    <i className="ti-write text-danger" aria-hidden="true" />
                  </div>
                  <div className="card-body px-4 py-3">
                    <h5 className="mb-3 card-title text-dark">Lagavulin</h5>
                    <p className="subtitle">Lagavulin distillery is a malt whisky distillery in the village of Lagavulin on the south of the island of Islay, Scotland. It distills spirit that will become Islay single malt Scotch whisky. Lagavulin is owned by Diageo, a multinational beverage alcohol company headquartered in London.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="card mb-5">
                  <div className="card-header has-icon">
                    <i className="ti-package text-danger" aria-hidden="true" />
                  </div>
                  <div className="card-body px-4 py-3">
                    <h5 className="mb-3 card-title text-dark">Dewar's</h5>
                    <p className="subtitle">Dewar's is a brand of blended Scotch whisky produced by Bacardi in Scotland.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="card mb-5">
                  <div className="card-header has-icon">
                    <i className="ti-map-alt text-danger" aria-hidden="true" />
                  </div>
                  <div className="card-body px-4 py-3">
                    <h5 className="mb-3 card-title text-dark">Glenfiddich</h5>
                    <p className="subtitle">Glenfiddich distillery is a Speyside single malt Scotch whisky distillery owned by William Grant & Sons in the Scottish burgh of Dufftown in Moray. The name Glenfiddich derives from the Scottish Gaelic Gleann Fhiodhaich meaning "valley of the deer", which is reflected in Glenfiddich's stag logo.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="card mb-5">
                  <div className="card-header has-icon">
                    <i className="ti-bar-chart text-danger" aria-hidden="true" />
                  </div>
                  <div className="card-body px-4 py-3">
                    <h5 className="mb-3 card-title text-dark">Woodford Reserve</h5>
                    <p className="subtitle">Woodford Reserve is a brand of premium small batch Kentucky straight bourbon whiskey produced in Woodford County, Kentucky, by the Brown-Forman Corporation.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="card mb-5">
                  <div className="card-header has-icon">
                    <i className="ti-support text-danger" aria-hidden="true" />
                  </div>
                  <div className="card-body px-4 py-3">
                    <h5 className="mb-3 card-title text-dark">Jim Beam</h5>
                    <p className="subtitle">Jim Beam is an American brand of bourbon whiskey produced in Clermont, Kentucky, by Beam Suntory. It is one of the best-selling brands of bourbon in the world. Since 1795, seven generations of the Beam family have been involved in whiskey production for the company that produces the brand.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="card mb-5">
                  <div className="card-header has-icon">
                    <i className="ti-support text-danger" aria-hidden="true" />
                  </div>
                  <div className="card-body px-4 py-3">
                    <h5 className="mb-3 card-title text-dark">Royal Stag</h5>
                    <p className="subtitle">Royal Stag, also known as Seagram's Royal Stag, is an Indian whisky launched in 1995. It is available in many countries across the world in various pack sizes. It is Pernod Ricard's best selling brand by volume. It is a blend of grain spirits and imported Scotch malts.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="card mb-5">
                  <div className="card-header has-icon">
                    <i className="ti-support text-danger" aria-hidden="true" />
                  </div>
                  <div className="card-body px-4 py-3">
                    <h5 className="mb-3 card-title text-dark">100 Pipers</h5>
                    <p className="subtitle">100 Pipers is a brand of blended Scotch whisky produced by Pernod Ricard India Private Ltd.. 100 Pipers is bottled and marketed in India. 100 Pipers is a blend of between 25 and 30 source whiskies that came from Scotland.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="card mb-5">
                  <div className="card-header has-icon">
                    <i className="ti-support text-danger" aria-hidden="true" />
                  </div>
                  <div className="card-body px-4 py-3">
                    <h5 className="mb-3 card-title text-dark">Signature</h5>
                    <p className="subtitle">Signature, also known as McDowell's Signature, is a brand of Indian whisky, manufactured by United Spirits Ltd, a Diageo Group company. It was launched in 1994. Signature is a blend of imported Scotch whisky and locally produced products.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*our services*/}

        <section className="section" id="service">
          <div className="container">
            <h2 className="mb-5 pb-4"><span className="text-danger">My</span> Services</h2>
            <div className="row">
              <div className="col-md-4 col-sm-6">
                <div className="card mb-5">
                  <div className="card-header has-icon">
                    <i className="ti-vector text-danger" aria-hidden="true" />
                  </div>
                  <div className="card-body px-4 py-3">
                    <h5 className="mb-3 card-title text-dark">Heading</h5>
                    <p className="subtitle">msg</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="card mb-5">
                  <div className="card-header has-icon">
                    <i className="ti-write text-danger" aria-hidden="true" />
                  </div>
                  <div className="card-body px-4 py-3">
                    <h5 className="mb-3 card-title text-dark">Heading</h5>
                    <p className="subtitle">msg</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="card mb-5">
                  <div className="card-header has-icon">
                    <i className="ti-package text-danger" aria-hidden="true" />
                  </div>
                  <div className="card-body px-4 py-3">
                    <h5 className="mb-3 card-title text-dark">Heading</h5>
                    <p className="subtitle">msg</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="card mb-5">
                  <div className="card-header has-icon">
                    <i className="ti-map-alt text-danger" aria-hidden="true" />
                  </div>
                  <div className="card-body px-4 py-3">
                    <h5 className="mb-3 card-title text-dark">Heading</h5>
                    <p className="subtitle">msg</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="card mb-5">
                  <div className="card-header has-icon">
                    <i className="ti-bar-chart text-danger" aria-hidden="true" />
                  </div>
                  <div className="card-body px-4 py-3">
                    <h5 className="mb-3 card-title text-dark">Heading</h5>
                    <p className="subtitle">msg</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="card mb-5">
                  <div className="card-header has-icon">
                    <i className="ti-support text-danger" aria-hidden="true" />
                  </div>
                  <div className="card-body px-4 py-3">
                    <h5 className="mb-3 card-title text-dark">Heading</h5>
                    <p className="subtitle">msg</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
       
        {/* End of portfolio section */}

        <div className="section contact" id="contact">
          <div id="map" className="map" />
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="contact-form-card">
                  <h4 className="contact-title">Send a message</h4>
                  <form action>
                    <div className="form-group">
                      <input className="form-control" type="text" value={Name} onChange={(e)=>setName(e.target.value)} placeholder="Name *" required />
                    </div>
                    <div className="form-group">
                      <input className="form-control" type="email" value={Email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email *" required />
                    </div>
                    <div className="form-group">
                      <input className="form-control" type="number" value={Phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Phone *" required />
                    </div>
                    <div className="form-group">
                    <textarea className="form-control" id="message" value={Message} onChange={(e)=>setMessage(e.target.value)} placeholder="Message *" rows={7} required defaultValue={""}/>
                    </div>
                    <div className="form-group ">
                      <button type="submit" onClick={CollectData} className="form-control btn btn-primary">Send Message</button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="contact-info-card">
                  <h4 className="contact-title">Get in touch</h4>
                  <div className="row mb-2">
                    <div className="col-1 pt-1 mr-1">
                      <i className="ti-mobile icon-md" />
                    </div>
                    <div className="col-10 ">
                      <h6 className="d-inline">Phone : <br /> <span className="text-muted">+91-9752079591</span></h6>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-1 pt-1 mr-1">
                      <i className="ti-map-alt icon-md" />
                    </div>
                    <div className="col-10">
                      <h6 className="d-inline">Address :<br /> <span className="text-muted">lopilo company, satna, (M.P.)</span></h6>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-1 pt-1 mr-1">
                      <i className="ti-envelope icon-md" />
                    </div>
                    <div className="col-10">
                      <h6 className="d-inline" >Email :<br /> <span className="text-muted">lopilocompany@gmail.com</span></h6>
                    </div>
                  </div>
                  <ul className="social-icons pt-4">
                    <li className="social-item"><a className="social-link text-dark" href="#"><i className="ti-facebook" aria-hidden="true" /></a></li>
                    <li className="social-item"><a className="social-link text-dark" href="#"><i className="ti-twitter" aria-hidden="true" /></a></li>
                    <li className="social-item"><a className="social-link text-dark" href="#"><i className="ti-google" aria-hidden="true" /></a></li>
                    <li className="social-item"><a className="social-link text-dark" href="#"><i className="ti-instagram" aria-hidden="true" /></a></li>
                    <li className="social-item"><a className="social-link text-dark" href="#"><i className="ti-github" aria-hidden="true" /></a></li>
                  </ul> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Lopilo;

