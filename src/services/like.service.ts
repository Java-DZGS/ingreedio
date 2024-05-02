/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable implicit-arrow-linebreak */

export const likeProductApi = async (productId: string) => {
  // todo when backend feature is implemented
  await new Promise<void>((resolve) =>
    setTimeout(() => {
      console.log(`Like ${productId}`);
      resolve();
    }, 100),);
};

export const unlikeProductApi = async (productId: string) => {
  // todo when backend feature is implemented
  await new Promise<void>((resolve) =>
    setTimeout(() => {
      console.log(`Unike ${productId}`);
      resolve();
    }, 100),);
};
