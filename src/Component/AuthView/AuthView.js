import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { authenticationService } from '../../Login/index';
import './AuthView.css';

class AuthView extends Component {
    constructor(props) {
        super(props);

        // redirect to home if already logged in
        if (authenticationService.currentUserValue) { 
            this.props.history.push('/Home');
        }
    }

    render() {
        return (
          <div>
            <Formik
              initialValues={{
                username: '',
                password: ''
              }}
              validationSchema={Yup.object().shape({
                username: Yup.string().required('Username is required'),
                password: Yup.string().required('Password is required')
              })}
              onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
                setStatus();
                authenticationService.login(username, password)
                .then(
                    () => {
                        const { from } = this.props.location.state || { from: { pathname: "/Home" } };
                        this.props.history.push(from);
                    },
                    error => {
                        setSubmitting(false);
                        (typeof(error) === 'string') ? setStatus(error) : setStatus("API not found");
                    }
                );
            }}
              render={({ errors, status, touched, isSubmitting }) => (
                
                <Form className="login card">
                  <div >
                    <img className="icon-form" href="/" alt="logo" src={require('../../mmw_icon.png')}  />
                  </div>
                  <div className="form-group">            
                    <label htmlFor="username">Username</label>
                    <Field name="username" type="text" className={`form-control${  errors.username && touched.username ? ' is-invalid' : ''}`} />
                    <ErrorMessage name="username" component="div" className="invalid-feedback" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field name="password" type="password" className={`form-control${  errors.password && touched.password ? ' is-invalid' : ''}`} />
                    <ErrorMessage name="password" component="div" className="invalid-feedback" />
                  </div>
                  <div className="passwordChange">
                    <a href="https://innovation-factory.io/password/"> Change password </a>
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Login</button>
                  </div>
                  {status &&
                    <div className="alert alert-danger">{status}</div>
                  }
                  {isSubmitting && (
                    <img className="spinner-login" src={require('../../../src/mmw_icon.png')} alt="" />
                  )}
                </Form>
            )}
            />
          </div>
        )
    }
}
export default AuthView;
