/* eslint-disable object-curly-newline */
// ProductDetails.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/Card/Card';
import './ProductDetails.scss';
import ProductDescription from '../../components/ProductDescription/ProductDescription';
import ScrollBar from '../../components/Scrollbar/ScrollBar';
import { RootState } from '../../store/reducers';
import actions from '../../store/actions';
import { ProductDetailsResponse } from '../../services/productService/product.service';

const ProductDetails = (): JSX.Element => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductDetailsResponse | null>(null);

  const dispatch = useDispatch();
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const { products, productsList } = useSelector(
    (state: RootState) => state.product,
  );
  var shortDescription = '';

  useEffect(() => {
    if (productId) {
      const productIdNumber = parseInt(productId);
      if (!isNaN(productIdNumber)) {
        if (products) {
          const cachedProduct = products.find((p) => p.id === productIdNumber);
          if (cachedProduct) {
            setProduct(cachedProduct);
          } else {
            dispatch(actions.fetchProductDetails(accessToken, productIdNumber));
            shortDescription = productsList.find(
              (p) => p.id === productIdNumber,
            )
              ? shortDescription
              : '';
          }
        } else {
          dispatch(actions.fetchProductDetails(accessToken, productIdNumber));
          shortDescription = productsList.find((p) => p.id === productIdNumber)
            ? shortDescription
            : '';
        }
      }
    }
  }, [dispatch, productId, products]);

  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <div className="product-details-container">
      <div className="card-wrapper">
        <Card>
          <div className="card-content-container">
            <ProductDescription
              name={product.name}
              provider={product.provider}
              shortDescription={shortDescription}
              volume={product.volume}
              brand={product.brand}
              rating={5}
              isLiked={false}
              largeImageUrl={product.largeImageUrl}
            />
            <div className="sections-card-container">
              <Card>
                <div className="sections-card-content-container">
                  <Tabs variant="unstyled" position="relative" width="100%">
                    <TabList gap={5}>
                      <Tab fontSize={20}>Ingreedients</Tab>
                      <Tab fontSize={20}>Description</Tab>
                      <Tab fontSize={20}>Opinions</Tab>
                    </TabList>
                    <TabIndicator
                      mt="-1.5px"
                      height="3px"
                      bg="rgba(29, 108, 226, 0.27)"
                      borderRadius="5px"
                    />
                    <TabPanels className="tab-panels">
                      <TabPanel
                        style={{ display: 'flex', flex: 1, width: '100%' }}
                      >
                        <div className="ingredients-list">
                          <ScrollBar>
                            <ul>
                              {product.ingredients.map((ingredient) => (
                                <li key={ingredient + Math.random()}>
                                  {ingredient}
                                </li>
                              ))}
                            </ul>
                          </ScrollBar>
                        </div>
                      </TabPanel>
                      <TabPanel>
                        <div className="long-description-container">
                          <p>{product.longDescription}</p>
                        </div>
                      </TabPanel>
                      <TabPanel>
                        <div className="opinions-container">
                          <p>opinions</p>
                        </div>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </div>
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetails;
