import React, { useState } from "react";
import { Form, Input, TextArea, Button, Message } from "semantic-ui-react";
import emailjs from "emailjs-com";

function ContactForm(props) {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
    const [message, setMessage] = useState("");
    const [contactStatus, setContactStatus] = useState("")
    const [loading, setLoading] = useState(false)

	const handleFirstNameChange = (e) => {
		setFirstName(e.target.value);
	};

	const handleLastNameChange = (e) => {
		setLastName(e.target.value);
	};

	const handleMessageChange = (e) => {
		setMessage(e.target.value);
	};

	const templateParams = {
		firstName,
		lastName,
		message,
	};

	const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)

		emailjs
			.send(
				"outlook",
				"template_SD22jYts",
				templateParams,
				"user_cI87SCMMsY23cnlYpQMEJ"
			)
			.then(
				(result) => {
                    console.log(result.text);
                    setContactStatus("success")
                    setLoading(false)
				},
				(error) => {
                    console.log(error.text)
                    setContactStatus("error")
                    setLoading(false)
                }
                
			);
    };
    
    const loadingProps = {
        className: loading ? "ui loading form" : null 
    }
    
    let formProps = {}
    
    if (contactStatus === "success") {
        formProps = {
            className: "ui success message"} 
    }
    if (contactStatus === "error") {
        formProps = {
            className: "ui error message"}
    }
    
        
       
    

	return (
     <div {...loadingProps}>
        <h1>GET IN TOUCH</h1>
        <Form {...formProps}  onSubmit={handleSubmit}>
        
			<Form.Group widths="equal">
				<Form.Field
					id="form-input-control-first-name"
					control={Input}
					aria-label="First name"
					placeholder="First name"
					onChange={handleFirstNameChange}
				/>
				<Form.Field
					id="form-input-control-last-name"
					control={Input}
					aria-label="Last name"
					placeholder="Last name"
					onChange={handleLastNameChange}
				/>
			</Form.Group>
			<Form.Field
				id="form-textarea-control-opinion"
				control={TextArea}
				aria-label="Message"
				placeholder="Message"
				onChange={handleMessageChange}
			/>

			<Form.Field
				id="form-button-control-public"
				control={Button}
				content="Send"
			/>
			<Message
				success
				header="Success"
				content="Message has been sent. Thanks!"
			/>
			<Message
				error
				header="Error"
				content="It's not you, it's me. Please try again"
			/>
		</Form>
    </div>
	);
}

export default ContactForm;

