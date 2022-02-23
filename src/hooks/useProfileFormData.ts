import {useAuth} from '../contexts/authContext';
import { FormikValues } from 'formik';
import {urlToFile} from '../helpers';

const useProfileFormData = () => {
  const { currentUser } = useAuth();

  const buildFormData = async (values: FormikValues) => {
    const imgFields = ["profile_image_url", "cover_image_url"];
    const formData = new FormData();
    for (let [field, value] of Object.entries(values)) {
      if (imgFields.includes(field)) continue;

      formData.append(`user[${field}]`, value);
    }

    await setImages(formData, values);
    return formData;
  };

  const setImages = async (formData: FormData, values: FormikValues) => {
    let profileImgPromise = imgPromise(
      values.profile_image_url,
      currentUser?.profile_image_url
    );

    let coverImgPromise = imgPromise(
      values.cover_image_url,
      currentUser?.cover_image_url
    );

    const [profile_image, cover_image] = await Promise.all([
      profileImgPromise,
      coverImgPromise,
    ]);

    profile_image && formData.append(`user[profile_image]`, profile_image);
    cover_image && formData.append(`user[cover_image]`, cover_image);
  };

  const imgPromise = (url: string, currentUrl?: string) => {
    if (url && url !== currentUrl) {
      return urlToFile(url);
    }
    return Promise.resolve(null);
  };

  return buildFormData;
};

export default useProfileFormData;