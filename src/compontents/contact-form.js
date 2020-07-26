import React from 'react';
import { useState } from 'react';
import classnames from 'classnames';
import styles from './contact.module.scss';

const ContactForm = () => {

  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({
    name: '', email: '', message: ''
  });

  const handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    const errorsCopy = {...errors};
    switch (name) {
      case "name":
        const nameRegex = RegExp(/^[a-zA-Z\s-]*$/)
        if (value.length < 3) {
          errorsCopy[name] = `Your name must be at least 3 characters long.`;
        } else if (value.length > 25) {
          errorsCopy[name] = `Maximum name is 25 characters, you've entered ${value.length} characters.`;
        } else if (!nameRegex.test(value)) {
          errorsCopy[name] = `Only letters, whitespace and dashes (-) are accepted.`;
        } else {
          errorsCopy[name] = 'OK';
        }
        break;
      case "email":
        const illegalChars = RegExp(/^[^!~`#$%^&*()+={}|[\]\\]+$/);
        const acceptEmail = RegExp(
          /^[a-zA-Z0-9][a-zA-Z0-9-_.]*[a-zA-Z0-9]@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/
        );
        if (value.length < 6) {
          errorsCopy[name] = `Emails must be atleast 6 characters long.`;
        } else if (value.length > 25) {
          errorsCopy[name] = `${value.length} characters is more than the maximum length of 25.`;
        } else if(!illegalChars.test(value)) {
          errorsCopy[name] = `Invalid character entered.`;
        } else if (!acceptEmail.test(value)) {
          errorsCopy[name] = `Only valid email addresses are accepted.`;
        } else {
          errorsCopy[name] = 'OK';
        }
        break;
      case "message":
        const messageRegex = RegExp(/^[a-zA-Z0-9.,?&!/'"-\s]+$/);
        if (value.length < 10) {
          errorsCopy[name] = `Message must be atleast 10 characters long.`;
        } else if (value.length > 250) {
          errorsCopy[name] = `${value.length} characters is more than the maximum length of 250.`;
        } else if (!messageRegex.test(value)) {
          errorsCopy[name] = `An invalid character has been entered.`;
        } else {
          errorsCopy[name] = 'OK';
        }
        break;
      default:
        break;
    }
    setErrors({...errors, [name]: errorsCopy[name]});
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.style.backgroundColor = 'blue';

  }

  const validateForm = () => {
    let isValid = true;
    Object.values(errors).forEach(value => {
      value !== 'OK' && (isValid = false);
    });
    return isValid;
  }

  const handleSubmit = e => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      console.log('Happy Dayzzz')
      // const mailSent = new Audio("./mailSentSound.mp3");
      // mailSent.play();
      new Audio("./mailSentSound.mp3").play()
    } else {
      const errorsCopy = {...errors};
      for (const [key, value] of Object.entries(errors)) {
        if (!value) {
          errorsCopy[key] = 'Please fill in this input.';
        }
      }
      setErrors({ ...errors, ...errorsCopy });
    }
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.style.backgroundColor = (isValid) ? 'blue' : 'grey';
    console.log(isValid)

  }

  return (
    <>
      <h1 className={styles.heading}>We'd love to hear from you:</h1>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h2 className={styles.formTitle}>Contact Me</h2>
          <h3 className={styles.formSubtitle}>
            Please fill out the form below:
          </h3>
        </div>
        <div className={styles.postalColours}></div>
        <div className={styles.formBody}>
          <div id="form-error"></div>

          <form
            id="contact-form"
            action="/"
            method="GET"
            noValidate
            onSubmit={handleSubmit}
          >
            {/* Can use "required" in input fields to do HTML5 form checking automatically, but I'm using JavaScript instead */}
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <label className={styles.formLabel} htmlFor="name">
                  Name:
                </label>
                <input
                  id="form-name"
                  className={classnames(styles.formInput,
                    errors.name === 'OK' 
                      ? styles.inputSuccess 
                      : errors.name ? styles.inputError : ''
                  )}
                  type="text"
                  name="name"
                  placeholder="Enter your name..."
                  onChange={handleChange}
                />
                <div className={styles.errorWrapper}>
                  <code
                    className={classnames(styles.errorMessage,
                      (errors.name && errors.name !== 'OK') ? styles.visible : ''
                    )}
                  >
                    {errors.name}
                  </code>
                </div>
              </li>
              <li className={styles.listItem}>
                <label className={styles.formLabel} htmlFor="email">
                  Email:
                </label>
                <input
                  id="form-email"
                  className={classnames(styles.formInput,
                    errors.email === 'OK'
                      ? styles.inputSuccess
                      : errors.email ? styles.inputError : ''
                  )}
                  type="email"
                  name="email"
                  placeholder="Enter your email..."
                  onChange={handleChange}
                />
                <div className={styles.errorWrapper}>
                  <code
                    className={classnames(styles.errorMessage,
                      (errors.email && errors.email !== 'OK') ? styles.visible : ''
                    )}
                  >
                    {errors.email}
                  </code>
                </div>
              </li>
              <li className={styles.listItem}>
                <label className={styles.formLabel} htmlFor="message">
                  Message:
                </label>
                <textarea
                  className={classnames(styles.formTextArea,
                    errors.message === 'OK'
                      ? styles.inputSuccess
                      : errors.message ? styles.inputError : ''
                  )}
                  cols="16"
                  rows="3"
                  name="message"
                  placeholder="Enter your message..."
                  onChange={handleChange}
                ></textarea>
                <div className={styles.errorWrapper}>
                  <code
                    className={classnames(styles.errorMessage,
                      (errors.message && errors.message !== 'OK') ? styles.visible : ''
                    )}
                  >
                    {errors.message}
                  </code>
                </div>
              </li>
              <li className={styles.listItem}>
                <input
                  id="submit-btn"
                  className={styles.submitButton}
                  type="submit"
                  value="Submit"
                />
                {/* <small>or press <strong>enter</strong></small> */}
              </li>
            </ul>
          </form>
        </div>
        <div className={styles.postalColours}></div>
      </div>
    </>
  )
};

export default ContactForm;