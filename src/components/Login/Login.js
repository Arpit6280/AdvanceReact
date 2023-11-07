import React, { useContext, useEffect, useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../context/auth-context';
import Input from '../UI/Input/Input';

const emailReducer=(state,action)=>{
  if(action.type==='USER_INPUT'){
    return {value:action.val, isValid:action.val.includes('@')}
  }
  if(action.type==='INPUT_BLUR'){
    return { value:state.value, isValid:state.value.includes('@')}
  }
  return {value:'', isValid:false}
}

const passwordReducer =(state,action)=>{
    if(action.type==='USER_PASSWORD'){
       return {value:action.val, isValid:action.val.trim().length>6}
    }
    if(action.type==='PASSWORD_BLUR'){
      return {value:state.value, isValid:state.value.trim().length>6}
    }

    return {value:'', isValid:false}
}


const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail]=useReducer(emailReducer,{
    value:'', isValid:null
  })

  const [passwordState,dispatchPassword]=useReducer(passwordReducer,{value:'',isValid:null})

  const authctx=useContext(AuthContext)

  //  useEffect(()=>{
  //  const interval= setTimeout(()=>{
  //     console.log('hi');
  //     setFormIsValid(
  //     enteredEmail.includes('@') && enteredPassword.trim().length>6 );
  //   },2000)

  //   return ()=>{
  //     console.log('clean up');
  // clearInterval(interval)
  //   }

  //  },[enteredEmail,enteredPassword,enteredCollege])
  

  
   const emailChangeHandler = (event) => {
    dispatchEmail({type:'USER_INPUT', val:event.target.value})
    setFormIsValid(
   emailState.isValid && passwordState.isValid );

  };

  const passwordChangeHandler = (event) => {
   dispatchPassword({type:'USER_PASSWORD', val:event.target.value})
    setFormIsValid(emailState.isValid && passwordState.isValid  );
  };



  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({
      type:'INPUT_BLUR'
    })
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({
      type:'PASSWORD_BLUR'
    })
  };


  const submitHandler = (event) => {
    event.preventDefault();
    authctx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
        type='email'
        id='email'
        label='E-Mail'
        isValid={emailState.isValid} 
        value={emailState.value}
        onChange={emailChangeHandler}
        onBlur={validateEmailHandler}
        />

        <Input 
        type='password'
        id='password'
        label='Password'
        isValid={passwordState.isValid} 
        value={passwordState.value} 
        onChange={passwordChangeHandler}
        onBlur={validatePasswordHandler}
        />
        
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
