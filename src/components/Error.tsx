import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="grow flex flex-col items-center justify-center p-8">
      <p className="pb-8 text-3xl">An error occured</p>
      <div>
        <button
          className="pr-4 text-lg"
          onClick={() => window.location.reload()}
        >
          Refresh
        </button>
        <button className="text-lg" onClick={() => navigate(-1)}>
          Go back
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
