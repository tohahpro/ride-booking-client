import { LoginForm } from "@/components/modules/LoginForm";


const LoginPage = () => {
    return (
        <div className="md:w-1/2 mx-auto py-40">
            <div className="p-10 md:rounded-2xl md:shadow-xl">
                <LoginForm/>
            </div>
        </div>
    );
};

export default LoginPage;