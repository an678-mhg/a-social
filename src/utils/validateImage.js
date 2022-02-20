import deepai from "deepai";

export const validateImage = async (imgUrl) => {
  deepai.setApiKey(process.env.REACT_APP_DEEPAI_API_KEY);

  const result = await deepai.callStandardApi("content-moderation", {
    image: imgUrl,
  });
  return result;
};
