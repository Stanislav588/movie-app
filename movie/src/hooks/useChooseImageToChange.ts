import { enqueueSnackbar } from "notistack";
import { useState } from "react";

export const useChooseImageToChange = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  const maxAllowedSizeOfImg = 2 * 1024 * 1024;

  function handleChooseImage(selectedImg: any) {
    try {
      if (selectedImg.type.startsWith("image/")) {
        if (selectedImg.size > maxAllowedSizeOfImg) {
          enqueueSnackbar(
            "Size of the image is too big, max allowed size is 2mb",
            {
              variant: "warning",
            }
          );

          setSelectedImg(null);
          return;
        }
      } else {
        enqueueSnackbar("Wrong image path", { variant: "error" });
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImg(reader.result);
      };
      reader.readAsDataURL(selectedImg);
      reader.onerror = () => {
        enqueueSnackbar("Error with reading img ", { variant: "error" });
      };
    } catch (error) {
      enqueueSnackbar(`${error}`, { variant: "error" });
    }
  }

  return { handleChooseImage, selectedImg };
};
