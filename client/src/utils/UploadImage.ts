import { IMGBB_API_KEY } from "../constant";

const UploadImage = async(file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,{
        method: "POST",
        body: formData,
    });

    const data = await res.json();
    return data?.data?.display_url;
}

export default UploadImage;