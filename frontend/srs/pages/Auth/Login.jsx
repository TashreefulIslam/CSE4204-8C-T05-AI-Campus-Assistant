import LoginForm from "../../components/auth/LoginForm";
import AuthBanner from "../../components/auth/AuthBanner";

const Login = () => {

    return (

        <div className="min-h-screen bg-[#F8FAFC] flex">

            <LoginForm />

            <AuthBanner />

        </div>

    );

};

export default Login;
