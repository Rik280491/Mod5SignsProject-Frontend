// change this to heroku url, and change cors to accept only url
const baseURL = "https://serene-harbor-87663.herokuapp.com";
const signsURL = `${baseURL}/signs`;
const validateURL = `${baseURL}/validate`;
const logInURL = `${baseURL}/log-in`;
const createUserURL = `${baseURL}/users`;
const videosURL = `${baseURL}/videos`;

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
	return fetch(signsURL).then((response) => response.json());
};

const getUser = (url, token) => {
	return token ? fetch(url, { headers: { AUTHORIZATION: token } }) : fetch(url);
};

const validate = (token) => {
	return getUser(validateURL, token).then((response) => response.json());
};

const logIn = (data) => {
	return post(logInURL, data).then((response) => response.json());
};

const signUp = (data) => {
	return post(createUserURL, data).then((response) => response.json());
};

const createSignWithVideo = (data, token) => {
	return post(signsURL, data, token).then((response) => response.json());
};

const getVideos = () => {
	return fetch(videosURL).then((response) => response.json());
};

const deleteVideo = (id) => {
	return fetch(`${videosURL}/${id}`, { method: "DELETE" });
};

const checkWord = (value) => {
	return fetch(`https://wordsapiv1.p.rapidapi.com/words/${value}/definitions`, {
		method: "GET",
		headers: {
			"x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
			"x-rapidapi-key": "b6ab925e73mshc85e09479bf16dbp1dcd6ajsn56ffd8f4fbe0",
		},
	});
};
export default {
	get,
	getUser,
	validate,
	logIn,
	signUp,
	createSignWithVideo,
	getVideos,
	deleteVideo,
	checkWord,
};
