import React from 'react';
import { useState } from 'react';
import classnames from 'classnames';
import styles from './contact.module.scss';

const ContactForm = () => {

  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [message, setMessage] = useState('');
  let name, email, message;

  const [errors, setErrors] = useState({
    name: '', email: '', message: ''
  });

  // useEffect(() => {
    //   setName(() => nameInput.innerText);
    //   console.log(nameInput.innerText)
    // }, [nameInput.innerText])

  const handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let errorsCopy = {...errors}
    switch (name) {
      case "name":
        const nameRegex = RegExp(/^[a-zA-Z\s-]*$/)
        if (value.length < 3) {
          errorsCopy[name] = `Names must be at least 3 characters long.`;
        } else if (value.length > 25) {
          errorsCopy[name] = `Maximum name is 25 characters, you've entered ${value.length} characters.`;
        } else if (!nameRegex.test(value)) {
          errorsCopy[name] = `Only letters, whitespace and dashes (-) are accepted.`;
        } else {
          errorsCopy[name] = '';
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
          errorsCopy[name] = `Maximum name is 25 characters, you've entered ${value.length} characters.`;
        } else if(!illegalChars.test(value)) {
          errorsCopy[name] = `Invalid character entered.`;
        } else if (!acceptEmail.test(value)) {
          errorsCopy[name] = `Only valid email addresses are accepted`;
        } else {
          errorsCopy[name] = '';
        }
        break;
      case "message":
        const messageRegex = RegExp(/^[a-zA-Z0-9.,?&!/'"-\s]+$/);
        if (value.length < 10) {
          errorsCopy[name] = `Message must be atleast 10 characters long.`
        } else if (value.length > 250) {
          errorsCopy[name] = `${value.length} characters is more than the maximum length of 250.`
        } else if (!messageRegex.test(value)) {
          errorsCopy[name] = `An invalid character has been entered.`
        } else {
          errorsCopy[name] = '';
        }
        break;
      default:
        break;
    }
    setErrors({...errors, [name]: errorsCopy[name]})
  }

  const validForm = () => {
    let valid = true;
    Object.values(errors).forEach(value => {
      value.length > 0 && (valid = false);
    });
    return valid;
  }

  const handleSubmit = e => {
    e.preventDefault();

    if (validForm()) {
      console.log(name, email, message);
    } else {
      console.log('Form Error');
    }
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
                  className={classnames(styles.formInput, {
                    [styles.formError]: errors.name,
                  })}
                  type="text"
                  name="name"
                  placeholder="Enter your name..."
                  onChange={handleChange}
                />
                <div className={styles.errorWrapper}>
                  <code
                    className={classnames(styles.errorMessage, {
                      [styles.visible]: errors.name,
                    })}
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
                  className={classnames(styles.formInput, {
                    [styles.formError]: errors.email,
                  })}
                  type="email"
                  name="email"
                  placeholder="Enter your email..."
                  onChange={handleChange}
                />
                <div className={styles.errorWrapper}>
                  <code
                    className={classnames(styles.errorMessage, {
                      [styles.visible]: errors.email,
                    })}
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
                  className={classnames(styles.formTextArea, {
                    [styles.formError]: errors.message,
                  })}
                  cols="16"
                  rows="3"
                  name="message"
                  placeholder="Enter your message..."
                  onChange={handleChange}
                ></textarea>
                <div className={styles.errorWrapper}>
                  <code
                    className={classnames(styles.errorMessage, {
                      [styles.visible]: errors.message,
                    })}
                  >
                    {errors.message}
                  </code>
                </div>
              </li>
              <li className={styles.listItem}>
                <input
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