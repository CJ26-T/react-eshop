import React, { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils';
import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';


//宣告物件給 input fileds 使用
const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    //上面宣告之物件搭配 useState hook 設定給 input fileds 使用
    const [formFields, setFormFields] = useState(defaultFormFields);
    //從 formFields de-constructing 取值
    const {email, password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    //非re-direct login
    const signInWithGoogle  = async() => {
        await signInWithGooglePopup();
    };

    //按下建立 user
    const handleSubmit = async(event) => {
       event.preventDefault();
       try{
            const { user } = await signInAuthUserWithEmailAndPassword(email, password); //登入後抓出google回傳之user info
            resetFormFields();
       }
       catch(error){
           
       }
    }

    const handleChange = (event) => {
        //從event.target 取出 name & value 就是下面input給的 name="" & value=""
        const {name, value} = event.target;
        //使用 useState hook 的 setFormFields 把 value 設定回對應的 name field in formFields
        setFormFields({...formFields, [name]: value});
    }

    return(
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                {/*handleChange 搭配 name field, ex.name="displayName" 之後才有辦法判斷是哪一個 input 被觸發 */}
                {/*value={displayName} 需要跟上面的obj name 對應這樣才會顯示哪個 obj 的值 */}
                <FormInput 
                    label="Emial" 
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email}
                />

                <FormInput 
                    label="Password" 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password" value={password}
                />
                <ButtonsContainer>
                    <Button type='submit'>Sign In</Button>
                    <Button
                        buttonType={BUTTON_TYPE_CLASSES.google}
                        type='button'
                        onClick={signInWithGoogle}
                    >
                        Sign In With Google
                    </Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm;