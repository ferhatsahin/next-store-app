const catchErrors = (error, displayError = () => {}) => {
  let errorMessage;
  if(error.response){
    // The request was made and server responded with a status code
    // that is not in the range of 200-300.
    errorMessage = error.response.data;
    console.error('Error response', errorMessage)
    //For cloudinary image upload
    if(error.response.data.error){
      errorMessage = response.data.error.message
    }
  }
  else if(error.request){
    // Request was made, but no response received
    errorMessage = error.request
    console.error('Error request',errorMessage)
  }
  else{
    // Something else happened in making the request that triggered an error
    errorMessage = error.message;
    console.error("Error Message", errorMessage)
  }
  displayError(errorMessage)
}

export default catchErrors;