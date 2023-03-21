import PAT from "./config";

const USER_ID = "clarifai";
const APP_ID = "main";
const MODEL_ID = "face-detection";
const MODEL_VERSION_ID = "45fb9a671625463fa646c3523a3087d5";

export async function fetchBoundingBox(inputUrl) {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      // Authorization: "Key ",
      Authorization: "Key " + PAT,
    },
    body: JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: inputUrl,
            },
          },
        },
      ],
    }),
  };

  try {
    const response = await fetch(
      "https://api.clarifai.com/v2/models/" +
        MODEL_ID +
        "/versions/" +
        MODEL_VERSION_ID +
        "/outputs",
      requestOptions
    );
    const data = await response.json();
    const boundingBox =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    return boundingBox;
  } catch (error) {
    console.log("error", error);

    throw error;
  }
}
