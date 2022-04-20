/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
export const checkImage = (file) => {
    let err = '';
    if (!file) {
        const err = 'File does not exist.';
        return err;
    }
    // ?1 mb
    if (file.size > 1024 * 1024) {
        err = 'File size must be less than 1 Mb.';
        return err;
    }

    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        err = 'Image must be jpeg or png.';
        return err;
    }

    return err;
};

// export const imageUpload = async (images) => {
//     let imgArr = [];
//     for(const item of images){
//         const formData = new FormData();

//         if(item.camera){
//             formData.append("file", item.camera);
//         }else{
//             formData.append("file", item);
//         }

//         formData.append("upload_preset", "ADD VALUE HERE");
//         formData.append("cloud_name", "ADD VALUE HERE");

//         const res = await fetch("ADD CLOUDINARY IMAGE UPLOAD LINK HERE", {
//             method: "POST",
//             body: formData
//         })

//         const data = await res.json();
//         imgArr.push({ public_id: data.public_id, url: data.secure_url });

//     }
//     return imgArr;
// }
export const imageUpload = async (images) => {
    const imgArr = [];

    for (const item of images) {
        const formData = new FormData();

        if (item.camera) {
            formData.append('file', item.camera);
        } else {
            formData.append('file', item);
        }

        formData.append('upload_preset', 't2z7xofp');
        formData.append('cloud_name', 'exodussoftware');

        const res = await fetch('https://api.cloudinary.com/v1_1/exodussoftware/upload', {
            method: 'POST',
            body: formData
        });

        const data = await res.json();
        imgArr.push({ public_id: data.public_id, url: data.secure_url });
    }
    return imgArr;
};
