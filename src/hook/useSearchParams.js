import { useLocation } from "react-router-dom";

const useSearchParams = () => {
  const location = useLocation();

  const search = new URLSearchParams(location.search);

  return search;
};

export default useSearchParams;
