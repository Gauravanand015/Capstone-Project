import SignIn from '../../components/sign-in-form/sign-in-form.component.jsx';
import SignUp from '../../components/sign-up-form/sign-up-form.component.jsx';
import './authentication.styles.scss'

const Authentication = () =>{

    return (
        <div className='auth-container'>
            <SignIn/>
            <SignUp/>
        </div>
    )
}

export default Authentication