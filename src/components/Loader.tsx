import Ring from "react-spinners/ClipLoader";


const Loader = () => {
  return (
    <div className="w-full grow flex justify-center items-center min-h-[6rem]">
      <Ring color="333" loading />
    </div>
  );
};

export default Loader;
