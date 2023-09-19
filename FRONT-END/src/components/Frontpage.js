import React from 'react'

export default function profile() {
  
  return (
    <div>
      <>
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
                  <a href="home" className="nav-link">Home</a>
                </li>
                <li className="nav-item">
                  <a href="about" className="nav-link">About</a>
                </li>
                <li className="nav-item">
                  <a href="photos" className="nav-link">Photos</a>
                </li>
              </ul>
              <ul className="navbar-nav brand">
              <img src={require("./Image/Bottle.avif")} alt="" className="brand-img" />
              </ul>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a href="Add-store" className="nav-link">Add store</a>
                </li>
                <li className="nav-item">
                  <a href="Log-in" className="nav-link">Log in</a>
                </li>
                <li className="nav-item last-item">
                  <a href="Sign-up" className="nav-link">Sign up</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      
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
                    <h5 className="mb-3 card-title text-dark">Ullam</h5>
                    <p className="subtitle">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam commodi provident, dolores reiciendis enim pariatur error optio, tempora ex, nihil nesciunt! In praesentium sunt commodi, unde ipsam ex veritatis laboriosam dolor asperiores suscipit blanditiis, dignissimos quos nesciunt nulla aperiam officia.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="card mb-5">
                  <div className="card-header has-icon">
                    <i className="ti-write text-danger" aria-hidden="true" />
                  </div>
                  <div className="card-body px-4 py-3">
                    <h5 className="mb-3 card-title text-dark">Asperiores</h5>
                    <p className="subtitle">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam commodi provident, dolores reiciendis enim pariatur error optio, tempora ex, nihil nesciunt! In praesentium sunt commodi, unde ipsam ex veritatis laboriosam dolor asperiores suscipit blanditiis, dignissimos quos nesciunt nulla aperiam officia.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="card mb-5">
                  <div className="card-header has-icon">
                    <i className="ti-package text-danger" aria-hidden="true" />
                  </div>
                  <div className="card-body px-4 py-3">
                    <h5 className="mb-3 card-title text-dark">Tempora</h5>
                    <p className="subtitle">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam commodi provident, dolores reiciendis enim pariatur error optio, tempora ex, nihil nesciunt! In praesentium sunt commodi, unde ipsam ex veritatis laboriosam dolor asperiores suscipit blanditiis, dignissimos quos nesciunt nulla aperiam officia.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="card mb-5">
                  <div className="card-header has-icon">
                    <i className="ti-map-alt text-danger" aria-hidden="true" />
                  </div>
                  <div className="card-body px-4 py-3">
                    <h5 className="mb-3 card-title text-dark">Provident</h5>
                    <p className="subtitle">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam commodi provident, dolores reiciendis enim pariatur error optio, tempora ex, nihil nesciunt! In praesentium sunt commodi, unde ipsam ex veritatis laboriosam dolor asperiores suscipit blanditiis, dignissimos quos nesciunt nulla aperiam officia.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="card mb-5">
                  <div className="card-header has-icon">
                    <i className="ti-bar-chart text-danger" aria-hidden="true" />
                  </div>
                  <div className="card-body px-4 py-3">
                    <h5 className="mb-3 card-title text-dark">Consectetur</h5>
                    <p className="subtitle">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam commodi provident, dolores reiciendis enim pariatur error optio, tempora ex, nihil nesciunt! In praesentium sunt commodi, unde ipsam ex veritatis laboriosam dolor asperiores suscipit blanditiis, dignissimos quos nesciunt nulla aperiam officia.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="card mb-5">
                  <div className="card-header has-icon">
                    <i className="ti-support text-danger" aria-hidden="true" />
                  </div>
                  <div className="card-body px-4 py-3">
                    <h5 className="mb-3 card-title text-dark">Veritatis</h5>
                    <p className="subtitle">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam commodi provident, dolores reiciendis enim pariatur error optio, tempora ex, nihil nesciunt! In praesentium sunt commodi, unde ipsam ex veritatis laboriosam dolor asperiores suscipit blanditiis, dignissimos quos nesciunt nulla aperiam officia.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-dark py-5">
          <div className="container text-center">
            <h2 className="text-light mb-5 font-weight-normal">I Am Available For FreeLance</h2>
            <button className="btn bg-primary w-lg">Hire me</button>
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
                      <input className="form-control" type="text" placeholder="Name *" required />
                    </div>
                    <div className="form-group">
                      <input className="form-control" type="email" placeholder="Email *" required />
                    </div>
                    <div className="form-group">
                    <textarea
  className="form-control"
  id="message"
  placeholder="Message *"
  rows={7}
  required
  defaultValue={""}
/>

                    </div>
                    <div className="form-group ">
                      <button type="submit" className="form-control btn btn-primary">Send Message</button>
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
                      <h6 className="d-inline">Phone : <br /> <span className="text-muted">+ (123) 456-789</span></h6>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-1 pt-1 mr-1">
                      <i className="ti-map-alt icon-md" />
                    </div>
                    <div className="col-10">
                      <h6 className="d-inline">Address :<br /> <span className="text-muted">12345 Fake ST NoWhere AB Country.</span></h6>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-1 pt-1 mr-1">
                      <i className="ti-envelope icon-md" />
                    </div>
                    <div className="col-10">
                      <h6 className="d-inline">Email :<br /> <span className="text-muted">info@website.com</span></h6>
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
     </>
    </div>
  )
}
