import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";



const Header = ()=>{
  const [keyword, setKeyword] = React.useState("");
  const navigate = useNavigate();

  const totalCart = useSelector(({Cart})=>{
      return Cart.items.reduce((total, item)=>total + item.qty, 0);
  });

  const onChangeInput = (e)=>{
    setKeyword(e.target.value);
  }
  const onClickButton = (e)=>{
    e.preventDefault();
    return navigate(`/Search?keyword=${keyword}`);
  }
    return(
        <>
            <div id="header">
  <div className="container">
    <div className="row">
      <div id="logo" className="col-lg-3 col-md-3 col-sm-12">
        <h1><Link to="/"><img className="img-fluid" src="images/logo.png" /></Link></h1>
      </div>
      <div id="search" className="col-lg-6 col-md-6 col-sm-12">
        <form className="form-inline">
          <input onChange={onChangeInput} className="form-control mt-3" type="search" placeholder="Tìm kiếm" aria-label="Search" />
          <button onClick={onClickButton} className="btn btn-danger mt-3" type="submit">Tìm kiếm</button>
        </form>
      </div>
      <div id="cart" className="col-lg-3 col-md-3 col-sm-12">
        <a className="mt-4 mr-2" href="#">giỏ hàng</a><span className="mt-3">{totalCart}</span>
      </div>
    </div>
  </div>
  {/* Toggler/collapsibe Button */}
  <button className="navbar-toggler navbar-light" type="button" data-toggle="collapse" data-target="#menu">
    <span className="navbar-toggler-icon" />
  </button>
</div>
        </>
    )
}


export default Header; 


