import Axios from "../Api";
import endPoints from "../Api/endPoints";

const UploadImages = async (file) => {
  const formData = new FormData();
  formData.append("image", file);
  const imgRes = await Axios({
    ...endPoints.imageUrls,
    data: formData,
  });
  return imgRes;
};

export default UploadImages;
