const error = (error: any) => {
    let errorData: any = {};

    if (error?.config) {
        errorData.request = `${error.config.baseURL}${error.config.url}`;
        errorData.status = `${error.config.method} ${error.response?.status || 500}`;
    }

    if (error?.config?.data) {
        errorData.data = error.config.data;
    }

    // Handle not found endpoints
    if (typeof (error?.response?.data) === 'string') {
        if (error.response.data.includes('Cannot')) {
            errorData.error = `${error.config.method} endpoint for ${error.config.url} does not exist`
        }
    }

    // Handle error response
    if (error?.response?.data) {
        errorData = {
            ...errorData,
            message: error?.response?.data?.message,
            errorCode: error?.response?.data?.errorCode
        }
    }

    console.log("API ERROR", errorData)
    // return errorData;
}

export default error 