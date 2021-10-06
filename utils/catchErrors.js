function catchErrors(error, displayError) {
  let errorMsg;
  if (error.response) {
    // The request was made and server responded with a status code is not in thr range of 2XX
    errorMsg = error.response.data;
    console.error("Error response", errorMsg);

    // For Cloudinary image upload
    if (error.response.data.error) {
      errorMsg = error.response.data.error.message;
    }
  } else if (error.request) {
    // Yhe request was made, but no response was received
    errorMsg = error.request;
    console.error("Error request", errorMsg);
  } else {
    // Something else happened in making the request that triggered an error
    errorMsg = error.messsage;
    console.error("Error message", errorMsg);
  }
  displayError(errorMsg);
}

export default catchErrors;
