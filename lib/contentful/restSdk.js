import * as contentful from "contentful";
import _ from "lodash";

const getOptions = (is_preview) => {
  return {
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: is_preview
      ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
      : process.env.CONTENTFUL_ACCESS_TOKEN,
    host: is_preview
      ? process.env.CONTENTFUL_PREVIEW_HOST
      : process.env.CONTENTFUL_HOST,
    environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
  };
};

export const getAllPostsForHome = async (preview = false) => {
  const options = getOptions(preview);
  const contentfulClient = contentful.createClient(options);

  let posts = await contentfulClient
    .getEntries({
      content_type: "Blogs",
    })
    .then((entries) => {
      let items = _.get(entries, "items");
      if (items) {
        return items;
      } else {
        return false;
      }
    })
    .catch((er) => {
      console.log("ERROR", er);
      return false;
    });

  return posts;
};
