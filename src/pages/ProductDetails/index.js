import React, {useEffect} from "react";
import { ADD_TO_CART } from "../../shared/constants/action-type";
import { useDispatch } from "react-redux";
import { getImageProduct } from "../../shared/ultils";
import moment from "moment";
import { getProduct, getCommentsProduct, createCommentsProduct } from "../../services/Api";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = ()=>{
  const params = useParams();
  const id = params.id;
  const [product, setProduct] = React.useState(null);
  const [comments, setComments] = React.useState([]);
  const [inputComment, setInputComment] = React.useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    //get product
      getProduct(id, {}).then(({data})=>setProduct(data.data));
    // get comments
      getComments(id);
  }, [id]);

  const addToCart = (type)=>{
      if(product){
        const {_id, name, price, image} = product;
        dispatch({
          type: ADD_TO_CART,
          payload:{
            _id,
            name,
            price,
            image,
            qty:1,
          }
        })
      }
      if(type==="buy-now"){
        navigate("/Cart");
      }
  }

  const getComments = (id)=>{
    getCommentsProduct(id, {}).then(({data})=>setComments(data.data.docs));

  }
  const onClickSubmit = (e)=>{
    e.preventDefault();
    createCommentsProduct(id, inputComment, {}).then(({data})=>{
      if(data.status=="success"){
        setInputComment({});
      }
      getComments(id);
    });
  }
  const onChangeInput = (e)=>{
    const {name, value} = e.target;
    setInputComment({...inputComment, [name]: value});
  }
    return(
        <>
            {/*	List Product	*/}
<div id="product">
  <div id="product-head" className="row">
    <div id="product-img" className="col-lg-6 col-md-6 col-sm-12">
      <img src={getImageProduct(product?.image)} />
    </div>
    <div id="product-details" className="col-lg-6 col-md-6 col-sm-12">
      <h1>{product?.name}</h1>
      <ul>
        <li><span>Bảo hành:</span> 12 Tháng</li>
        <li><span>Đi kèm:</span>{product?.accessories}</li>
        <li><span>Tình trạng:</span>{product?.status}</li>
        <li><span>Khuyến Mại:</span>{product?.promotion}</li>
        <li id="price">Giá Bán (chưa bao gồm VAT)</li>
        <li id="price-number">{product?.price}</li>
        <li id="status">{product?.is_stock? "Còn hàng": "Hết hàng"}</li>
      </ul>
      <div id="add-cart">
	         <button onClick={()=>addToCart("buy-now")} className="btn btn-warning mr-2">
		         Mua ngay
	         </button>

	         <button onClick={addToCart} className="btn btn-info">
		         Thêm vào giỏ hàng
	         </button>
        </div>

    </div>
  </div>
  <div id="product-body" className="row">
    <div className="col-lg-12 col-md-12 col-sm-12">
      <h3>{product?.name}</h3>
      {product?.details}
    </div>
  </div>
  {/*	Comment	*/}
  <div id="comment" className="row">
    <div className="col-lg-12 col-md-12 col-sm-12">
      <h3>Bình luận sản phẩm</h3>
      <form method="post">
        <div className="form-group">
          <label>Tên:</label>
          <input 
          onChange={onChangeInput}
          name="name" 
          required 
          type="text" 
          className="form-control" 
          value={inputComment.name || ""} />     

        </div>
        <div className="form-group">
          <label>Email:</label>
          <input 
          onChange={onChangeInput}
          name="email" 
          required 
          type="email" 
          className="form-control" 
          id="pwd" 
          value={inputComment.email || ""} />     

        </div>
        <div className="form-group">
          <label>Nội dung:</label>
          <textarea 
          onChange={onChangeInput}
          name="content" 
          required 
          rows={8} 
          className="form-control" 
          value={inputComment.content || ""} />     
        </div>
        <button type="submit" onClick={onClickSubmit} name="sbm" className="btn btn-primary">Gửi</button>
      </form> 
    </div>
  </div>
  {/*	End Comment	*/}  
  {/*	Comments List	*/}
  <div id="comments-list" className="row">
    <div className="col-lg-12 col-md-12 col-sm-12">
      {
        comments.map((comment)=>
         <div className="comment-item">
            <ul>
             <li><b>{comment.name}</b></li>
             <li>{moment(comment.createdAt).fromNow()}</li>
             <li>
               {comment.content}
             </li>
          </ul>
        </div>
        )
      }
     
    </div>
  </div>
  {/*	End Comments List	*/}
</div>
{/*	End Product	*/} 
<div id="pagination">
  <ul className="pagination">
    <li className="page-item"><a className="page-link" href="#">Trang trước</a></li>
    <li className="page-item active"><a className="page-link" href="#">1</a></li>
    <li className="page-item"><a className="page-link" href="#">2</a></li>
    <li className="page-item"><a className="page-link" href="#">3</a></li>
    <li className="page-item"><a className="page-link" href="#">Trang sau</a></li>
  </ul> 
</div>


        </>
    )
}

export default ProductDetails;