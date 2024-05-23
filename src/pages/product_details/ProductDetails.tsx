// ProductDetails.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  CircularProgress,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosResponse } from 'axios';
import Card from '../../components/Card/Card';
import './ProductDetails.scss';
import ProductDescription from '../../components/ProductDescription/ProductDescription';
import ScrollBar from '../../components/Scrollbar/ScrollBar';
import { RootState } from '../../store/reducers';
import {
  ProductDetailsResponse,
  getProductDetailsApi,
} from '../../services/product.service';
import ProductDetailsIngredient from '../../components/ProductDetailsIngredient/ProductDetailsIngredient';
import { likeProductApi, unlikeProductApi } from '../../services/like.service';
import Opinion from '../../components/Opinion/Opinion';
import OpinionModal from '../../components/OpinionModal/OpinionModal';
import {
  ReviewResponse,
  getProductReviewsApi,
  postProductReviewApi,
} from '../../services/review.service';

const ProductDetails = (): JSX.Element => {
  const dispatch = useDispatch();

  const { productId } = useParams<{ productId: string }>();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductDetailsResponse | null>(null);
  const [productReviews, setProductReviews] = useState<ReviewResponse[]>([]);

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { likedIngredients, dislikedIngredients } = useSelector(
    (state: RootState) => state.like,
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const likeProduct = () => {
    if (productId) {
      likeProductApi(productId)
        .then(() => setIsLiked(true))
        .catch((error) => console.error(error));
    }
  };

  const unlikeProduct = () => {
    if (productId) {
      unlikeProductApi(productId)
        .then(() => setIsLiked(false))
        .catch((error) => console.error(error));
    }
  };

  const shortDescription = '';

  const fetchProduct = async () => {
    try {
      if (!productId) return;
      const response = await getProductDetailsApi(productId);
      if (response && response.data) {
        setProduct(response.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchProductReviews = async () => {
    try {
      if (!productId) return;
      const response = await getProductReviewsApi(productId);
      if (response && response.data) {
        setProductReviews(response.data);
      }
    } catch (error) {
      console.error('Error fetching product reviews:', error);
    }
  };

  const onSubmitOpinion = async (
    opinionRating: number,
    opinionContent: string,
  ) => {
    if (!productId) return;
    try {
      // eslint-disable-next-line operator-linebreak
      const newReviewResponse: AxiosResponse<ReviewResponse> =
        await postProductReviewApi(productId, {
          rating: 2 * opinionRating,
          content: opinionContent,
        });

      const newReview = newReviewResponse.data;
      setProductReviews((reviews) => [...reviews, newReview]);
    } catch (error) {
      console.error('An error occurred while adding review:', error);
    }
    console.log('Opinion submitted:', opinionRating, opinionContent);
  };

  const handleLikeOpinion = () => {
    console.log('Like button clicked');
  };

  const handleDislikeOpinion = () => {
    console.log('Dislike button clicked');
  };

  const handleReportOpinion = () => {
    console.log('Report button clicked');
  };

  useEffect(() => {
    fetchProduct();
    fetchProductReviews();
  }, [dispatch, productId]);

  if (!product) {
    return (
      <div className="product-details-container">
        <CircularProgress isIndeterminate color="green" trackColor="none" />
      </div>
    );
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
              rating={product.rating}
              isLiked={isLiked}
              largeImageUrl={product.largeImageUrl}
              showLike={isAuthenticated}
              handleLike={likeProduct}
              handleUnlike={unlikeProduct}
            />
            <div className="sections-card-container">
              <Card>
                <div className="sections-card-content-container">
                  <Tabs variant="unstyled" position="relative" width="100%">
                    <TabList gap={5}>
                      <Tab fontSize={20}>Ingredients</Tab>
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
                                  <ProductDetailsIngredient
                                    ingredient={ingredient}
                                    // TODO: when backend returns the ingredients id
                                    // isLiked={likedIngredients.includes(
                                    //   ingredient,
                                    // )}
                                    // isDisliked={dislikedIngredients.includes(
                                    //   ingredient,
                                    // )}
                                  />
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
                      <TabPanel
                        style={{ display: 'flex', flex: 1, width: '100%' }}
                      >
                        <ScrollBar>
                          {isAuthenticated && (
                            <Button onClick={onOpen} variant="link">
                              Add your opinion
                            </Button>
                          )}
                          <div className="opinions-list">
                            <ul>
                              {productReviews.map((opinion) => (
                                <li
                                  key={`${opinion.displayName}-${product.id}`}
                                >
                                  <Opinion
                                    username={opinion.displayName}
                                    rating={opinion.rating}
                                    createdAt={opinion.createdAt}
                                    content={opinion.content}
                                    onLike={handleLikeOpinion}
                                    onDislike={handleDislikeOpinion}
                                    onReport={handleReportOpinion}
                                  />
                                </li>
                              ))}
                            </ul>
                          </div>
                        </ScrollBar>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </div>
              </Card>
            </div>
          </div>
        </Card>
      </div>
      <OpinionModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmitOpinion}
      />
    </div>
  );
};

export default ProductDetails;
