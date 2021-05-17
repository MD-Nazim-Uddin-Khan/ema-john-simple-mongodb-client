import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import fakeData from '../../fakeData'; {ata use hoccey na,tai atar ar dorkar nai}
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const [product, setProduct] = useState({})
    
    useEffect(()=>{
        fetch('https://stark-caverns-01518.herokuapp.com/product/'+ productKey)
        .then(res => res.json())
        .then(data => setProduct(data))
    },[productKey])



    // const product = fakeData.find(pd => pd.key === productKey) {ata use hoccey na,tai atar ar dorkar nai}
    return (
        <div>
            <h1>{productKey} Details Coming Soon...</h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;