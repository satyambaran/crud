const buildSuccessResponseDirect = async (data: any):Promise<object> => {
	return {
		statusCode: 200,
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Credentials": "true",
			"Access-Control-Allow-Methods":
				"GET,HEAD,OPTIONS,POST,PUT",
			"Access-Control-Allow-Headers":
				"Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization",
		},
	};
};

const buildErrorResponseDirect = async (
	data: any,
	errorStatus = 400
):Promise<object> => {
	return {
		statusCode: errorStatus,
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Credentials": "true",
			"Access-Control-Allow-Methods":
				"GET,HEAD,OPTIONS,POST,PUT",
			"Access-Control-Allow-Headers":
				"Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization",
		},
	};
};
const buildErrorResponse = async (
	msg = "Error could not complete the operation",
	statusCode = 400
):Promise<object> => {
	return {
		statusCode: statusCode,
		body: JSON.stringify({ status: false, message: msg }),
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Credentials": "true",
			"Access-Control-Allow-Methods":
				"GET,HEAD,OPTIONS,POST,PUT",
			"Access-Control-Allow-Headers":
				"Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization",
		},
	};
};

export default {
	buildErrorResponse,
	buildErrorResponseDirect,
	buildSuccessResponseDirect,
};
