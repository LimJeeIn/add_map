import React from 'react';
import * as S from './Product.style';

function Product({ product }) {
  return (
    <S.Product>
      <S.Wrapper>
        <S.ProductContent>
          <S.ProductImage src={product.itemImage} />
          <S.ProductTitle>{product.itemName}</S.ProductTitle>
          <S.ProductPrice>{product.price}</S.ProductPrice>
        </S.ProductContent>
      </S.Wrapper>
    </S.Product>
  );
}
export default Product;
