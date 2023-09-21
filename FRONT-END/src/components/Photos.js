import React from 'react'

export default function Photos() {
  return (
    <div>
      <header className="header3">
      <h1 className="header-title" style={{marginLeft: "-678px",fontSize: "6.4rem"}}>LOPILO</h1>
      </header>
      <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: "25%"}}>Top 10</span>
      <div style={{ display: 'flex',  alignItems: 'center' }}>
      <img src={require("./Image/photosimg2.jpg")} className="card-img-top photosimg2" alt="..." />
      <img src={require("./Image/photosimg1.jpg")} className="card-img-top photosimg1" alt="..." />
      <img src={require("./Image/photosimg3.jpg")} className="card-img-top photosimg3" alt="..." />
      </div>
      <div>
      <img src={require("./Image/photosimg5.jpg")} className="card-img-top photosimg4" alt="..." />
      </div>
      <section className="section bg-dark py-5">
          <div className="container text-center">
            <h2 className="text-light mb-5 font-weight-normal" style={{marginTop: "90px"}}>Top 10 wines</h2>
          </div>
      </section>
      <div>
      <img src={require("./Image/photosimg6.jpg")} className="card-img-top photosimg6" alt="..." />
      </div>
     
    </div>
  )
}
