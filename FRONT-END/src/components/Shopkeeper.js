import React from 'react'

export default function Addstore() {
  
  return (
    <div>
      
      <div>
        
        {/*Main image section*/}
        <header className="header2">
        <div className="container">
            <div className="header2-content ">
            <h6 className="header2-mono" >WELCOME</h6>
            <h6 className="header2-mono">TO</h6>
              <h1 className="header2-title">SHOPKEEPER</h1>
              <h1 className="header2-title">DASHBOARD</h1>
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
                  <a href="/" className="nav-link">{"< "}Back</a>
                </li>
              </ul>
              <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                  <a href="#" className="nav-link">Offers</a>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item last-item">
                  <a href="Shopkeeperlogin" className="nav-link">Shopkeeper log in</a>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item last-item">
                  <a href="Shopkeepersignup" className="nav-link">Shopkeeper sign up</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}
