import { Link } from "react-router-dom";

const ErrorBoundary = () => {
    return (
        <div className="min-h-screen flex flex-col gap-4 items-center justify-center">
            <p className="font-roboto text-4xl">Something went wrong</p>
            <Link to={'/'} className="bg-white text-black px-8 py-2 font-opensans rounded-full">Go back</Link>
        </div>
    );
};

export default ErrorBoundary;