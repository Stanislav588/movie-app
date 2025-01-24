import { useState } from "react";
import { useDispatch } from "react-redux";
export const useApiCalls = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleApiCalls = async (action: any) => {
    setIsLoading(true);
    try {
      const result = await dispatch(action);
      console.log(result);
      if (result.meta.requestStatus === "fulfilled") {
        return result.payload;
      } else {
        throw result.payload;
      }
    } catch (error) {
      console.log(error?.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { handleApiCalls };
};
