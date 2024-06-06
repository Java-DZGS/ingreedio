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
  useDisclosure,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
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
import OpinionModal from '../../components/OpinionModal/OpinionModal';
import {
  ReviewResponse,
  getProductReviewsApi,
  postProductReviewApi,
  putProductReviewApi,
  deleteProductReviewApi,
  likeReviewApi,
  unlikeReviewApi,
  dislikeReviewApi,
  undislikeReviewApi,
  reportReviewApi,
} from '../../services/review.service';
import Description from '../../components/Description/Description';
import { handleError } from '../../utils/handleError';
import OpinionList from '../../components/OpinionList/OpinionList';

const ProductDetails = (): JSX.Element => {
  const { productId } = useParams<{ productId: string }>();
  const [isLiked, setIsLiked] = useState<boolean | null>(false);
  const [product, setProduct] = useState<ProductDetailsResponse | null>(null);
  const [productReviews, setProductReviews] = useState<ReviewResponse[]>([]);

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  let canAddOpinion = true;
  if (productReviews
    && productReviews[0]
    && productReviews[0].isCurrentUser != null
    && productReviews[0].isCurrentUser) canAddOpinion = false;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { likedIngredients, dislikedIngredients } = useSelector(
    (state: RootState) => state.like,
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const likeProduct = () => {
    if (productId) {
      likeProductApi(productId)
        .then(() => setIsLiked(true))
        .catch((error) => handleError('An error occurred while liking the product.'));
    }
  };

  const unlikeProduct = () => {
    if (productId) {
      unlikeProductApi(productId)
        .then(() => setIsLiked(false))
        .catch((error) => handleError('An error occurred while unliking the product.'));
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
      setIsLiked(response.data.isLiked);
    } catch (error) {
      handleError('Error loading product.');
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
      handleError('Error loading product reviews.');
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
      fetchProduct();
    } catch (error) {
      handleError('An error occurred while adding review.');
    }
  };

  const onEditOpinion = async (
    opinionRating: number,
    opinionContent: string,
  ) => {
    if (!productId) return;
    try {
      // eslint-disable-next-line operator-linebreak
      const newReviewResponse: AxiosResponse<ReviewResponse> =
        await putProductReviewApi(productId, {
          rating: 2 * opinionRating,
          content: opinionContent,
        });

      const newReview = newReviewResponse.data;
      setProductReviews((reviews) => reviews.map((review) => (review.reviewId
        === newReview.reviewId ? newReview : review)));
      fetchProduct();
    } catch (error) {
      handleError('An error occurred while editing the review.');
    }
  };

  const onDeleteOpinion = async (reviewId: string) => {
    if (!productId) return;
    try {
      // eslint-disable-next-line operator-linebreak
      await deleteProductReviewApi(productId);

      setProductReviews((reviews) => reviews.filter((review) => review.reviewId !== reviewId));
      fetchProduct();
    } catch (error) {
      handleError('An error occurred while deleting review.');
    }
  };

  const handleLikeOpinion = async (id: string) => {
    try {
      await likeReviewApi(id);
      await fetchProductReviews();
    } catch (error) {
      handleError('An error occurred while liking review.');
    }
  };

  const handleUnlikeOpinion = async (id: string) => {
    try {
      await unlikeReviewApi(id);
      await fetchProductReviews();
    } catch (error) {
      handleError('An error occurred while unliking review.');
    }
  };

  const handleDislikeOpinion = async (id: string) => {
    try {
      await dislikeReviewApi(id);
      await fetchProductReviews();
    } catch (error) {
      handleError('An error occurred while disliking review.');
    }
  };

  const handleUndislikeOpinion = async (id: string) => {
    try {
      await undislikeReviewApi(id);
      await fetchProductReviews();
    } catch (error) {
      handleError('An error occurred while undisliking review.');
    }
  };

  const handleReportOpinion = async (id: string, content: string) => {
    try {
      await reportReviewApi(id, content);
    } catch (error) {
      handleError('An error occurred while reporting review.');
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchProductReviews();
  }, [productId]);

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
              handleRatingClick={onOpen}
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
                      <TabPanel
                        style={{ display: 'flex', flex: 1, width: '100%' }}
                      >
                        <ScrollBar>
                          <div className="long-description-container">
                            <Description
                              description={product.longDescription}
                            />
                          </div>
                        </ScrollBar>
                      </TabPanel>
                      <TabPanel
                        style={{ display: 'flex', flex: 1, width: '100%' }}
                      >
                        {productReviews
                          && (
                            <OpinionList
                              productId={productId}
                              productReviews={productReviews}
                              isAuthenticated={isAuthenticated}
                              canAddOpinion={canAddOpinion}
                              onOpen={onOpen}
                              fetchProductReviews={fetchProductReviews}
                              onLikeOpinion={handleLikeOpinion}
                              onUnlikeOpinion={handleUnlikeOpinion}
                              onDislikeOpinion={handleDislikeOpinion}
                              onUndislikeOpinion={handleUndislikeOpinion}
                              onReportOpinion={handleReportOpinion}
                              onEditOpinion={onEditOpinion}
                              onDeleteOpinion={onDeleteOpinion}
                            />
                          )}
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
        rating={0}
        content=""
        onClose={onClose}
        onSubmit={onSubmitOpinion}
      />
    </div>
  );
};

export default ProductDetails;
