const baseURL = "http://localhost:3001"
const signsURL = `${baseURL}/signs`
const validateURL = `${baseURL}/validate`;
const logInURL = `${baseURL}/log-in`;
const createUserURL = `${baseURL}/users`;
const createVideoURL = `${baseURL}/videos`;

const post = (url, data, token) => {
	const configObject = {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			AUTHORIZATION: token,
		},
		body: JSON.stringify(data),
	};
	return fetch(url, configObject);
};



const get = () => {
    return fetch(signsURL).then((response => response.json()))
}

const getUser = (url, token) => {
	return token ? fetch(url, { headers: { AUTHORIZATION: token } }) : fetch(url);
};

const validate = (token) => {
    return getUser(validateURL, token).then((response) => response.json())
};

const logIn = (data) => {
	return post(logInURL, data).then((response) => response.json());
};

const signUp = (data) => {
	return post(createUserURL, data).then((response) => response.json());
};



const createSignWithVideo = (data, token) => {
	return post(signsURL, data, token).then((response) =>
		response.json()
	);
};

export default {
    get,
    getUser,
    validate,
    logIn, 
	signUp,
	createSignWithVideo
	
}