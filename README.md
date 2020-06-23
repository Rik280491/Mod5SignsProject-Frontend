This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Hear Together

**A Speech To British Sign Language (BSL) Translator & User Generated BSL Dictionary**




**Motivation**

This is my first solo project and my final project at Flatiron School London. The inspiration for this app was growing up with a deaf sister and watching her struggles to communicate with the hearing world. This is my attempt to bridge that gap, and why I chose the name Hear Together. It is a play on the words here together. 




## Features

* A Voice Search
* Redux state management
* React Hooks
* Due to the lack of a suitable API, I created my own data. 
* Authentication using BCrypt and JSON Web Tokens (JWT) 
* TensorFlow toxicity library used to prevent users uploading rude words.
* Checks against a dictionary API to ensure word being uploaded exists. 
* Users can upload videos for a new or existing sign. Users can delete their own uploads.
* Could be utilised as an educational tool for hearing users.  




**Built with**

`React 16.13.1`
`Rails 6.0.3 (backend)` 




## Screenshots

`Home Page`
<img width="970" alt="Screenshot 2020-06-23 at 18 33 50" src="https://user-images.githubusercontent.com/57149887/85435952-26d29e00-b580-11ea-8f8a-3b3f650c22ca.png">


`Searched Sign`
<img width="967" alt="Screenshot 2020-06-23 at 18 33 28" src="https://user-images.githubusercontent.com/57149887/85436021-4669c680-b580-11ea-9a1a-96824cb8c5d4.png">


`Upload Video Validation` 
<img width="1197" alt="Screenshot 2020-06-16 at 22 10 21" src="https://user-images.githubusercontent.com/57149887/85437064-eaa03d00-b581-11ea-903d-53baa102441d.png">




**API Reference**

* WORDS dictionary API - https://www.wordsapi.com/ 
* Speech Recognition - Web Speech API - https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API 




**Demo**

Please visit https://youtu.be/X9MAZSlLMWw for a demonstration of the app. 



## Deployment 

Please visit our app at: https://heartogether.netlify.app/ 

Note: Unfortunately, the app does not currently work on iOS. 

