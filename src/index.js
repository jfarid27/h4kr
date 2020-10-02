import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import { Formik, Field, Form } from 'formik';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Web3 from 'web3';
import {
  Welcome,
  About
} from './Messages.js';
import {
  ConnectDesc,
  DisconnectDesc,
  AboutDesc,
  MintDesc
} from './Descriptions';
import {
  Login,
  MintTokens,
  ApproveH4KR
} from './Actions';

const createERC = "createERC";

const submitNewTokenReady = (values) => {
  if (values.action === createERC) {
    if (!values.tokenname || values.tokenname === '') return;
    if (!values.tokensymbol || values.tokensymbol === '') return;
    if (!values.tokenamount || values.tokenamount <= 0) return;
    return true;
  }
};

const UserSelectors = ({ state, dispatch }) => (
  <div>
    <Formik
     initialValues={{ action: "", tokenname: "", tokensymbol: "", tokenamount: 0 }}
     validate={values => {
          const errors = {};
          if (values.action === createERC) {
            if (!values.tokenname || values.tokenname === '') { errors.tokenname = "Name error. Cannot be blank" };
            if (!values.tokensymbol || values.tokensymbol === '') { errors.tokensymbol = "Symbol error. Cannot be blank" };
            if (!values.tokenamount || values.tokenamount <= 0) { errors.tokenamount = "Amount error. Cannot be less than zero." };
          }
         return errors;
     }}
     onSubmit={async (values, { setSubmitting }) => {
       const { tokenname, tokensymbol, tokenamount } = values;
       setSubmitting(true);
       try {
         await MintTokens(tokenname, tokensymbol, tokenamount, state, dispatch, () => ({}));
       } catch (err) {
         err
       }
       setSubmitting(false);
     }}
    >
     {({
       values,
       errors,
       touched,
       handleChange,
       handleBlur,
       handleSubmit,
       isSubmitting,
       /* and other goodies */
     }) => (
       <Form onSubmit={handleSubmit}>
         <div className="form-group">
           <label htmlFor="action">I want to </label>
           <Field as="select" className="my-select ml-2" name="action">
             <option value="">{"select an action."}</option>
             <option value={createERC}>{"mint a social token."}</option>
           </Field>
         </div>
         { values.action === createERC ? <div className="form-group">
           <label htmlFor="tokenname">The token name will be </label>
           <input className="ml-2" name="tokenname" type="text" placeholder="Mytoken"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.tokenname}
           />
           { touched.tokenname && errors.tokenname && <p className="text-danger">{errors.tokenname}</p> }
         </div> : "" }
         { values.action === createERC ? <div className="form-group">
           <label htmlFor="tokensymbol">The token symbol will be </label>
           <input className="ml-2" name="tokensymbol" type="text" placeholder="MTK"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.tokensymbol}
           />
           { touched.tokensymbol && errors.tokensymbol && <p className="text-danger">{errors.tokensymbol}</p> }
         </div> : "" }
         { values.action === createERC ? <div className="form-group">
           <label htmlFor="tokenamount">The amount that should be minted will be </label>
           <input className="ml-2" name="tokenamount" type="number" placeholder="10000000"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.tokenamount}
           />
           { touched.tokenamount && errors.tokenamount && <p className="text-danger">{errors.tokenamount}</p> }
         </div> : "" }
          { values.action === createERC ?
            <div>
              <Button type="submit" variant="primary" block disabled={isSubmitting}>
                Create (Cost: 100 H4KR)
              </Button>
              <Button variant="primary" block disabled={isSubmitting} onClick={() => ApproveH4KR(state)}>
                Approve
              </Button>
              <Button variant="secondary" block onClick={() => window.open('https://app.uniswap.org/#/swap?outputCurrency=0x761185bEd0c7413799AEFe021E975B2E61A9c450', '_blank')}>
                Buy H4KR
              </Button>
            </div>
            : ""
          }
       </Form>
     )}
    </Formik>
  </div>
);

const printer = updateAppState => message => {
    updateAppState(state => ( { ...state, message } ));
};

const SelectorComponent = ({ state, dispatch }) => {
  return (<div className="selector mt-5">
    <Container>
      <Row>
        <Col xs={12}>
          <UserSelectors state={state} dispatch={dispatch} />
        </Col>
      </Row>
    </Container>
  </div>);
};


const ConnectPromptComponent = ({ state, dispatch }) => {
  const { loggedIn, wallet } = state;
  const address = loggedIn && wallet && wallet.provider && wallet.provider.selectedAddress;
  return (<div className="connection-prompt">
    <Container>
      <Row>
        <Col xs={6}>
          { (!loggedIn) ?
            <Button variant="primary" onClick={() => Login(state, dispatch, printer(dispatch)) }>{"Connect"}</Button>
            :
            <span>
            <Button variant="primary" onClick={() => dispatch(st => ({ ...st, loggedIn: false })) }>{"Logout"}</Button>
            </span> }
        </Col>
        <Col xs={{ span: 6 }}>
          <h1 className="float-right">Hacking Money</h1>
          { (loggedIn) ?
              <p className="float-right text-info">{address}</p> : ""
            }
        </Col>
      </Row>
    </Container>
  </div>);
};

function App() {
  const [state, dispatch] = useState({});
  const web3 = state.web3;
  return <div className="mt-2">
    <ConnectPromptComponent state={state} dispatch={dispatch} />
    <SelectorComponent state={state} dispatch={dispatch} />
  </div>;
}

const wrapper = document.getElementById("hackmoney-app");
wrapper ? ReactDOM.render(<App />, wrapper) : false;
