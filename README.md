# Noise Total-client instruction

## Tech stack

React v17

React-Redux v8

## before you start

- download node ^16.0.0 from https://nodejs.org/en/about/releases/

  > For MacOS: use n to manage node version: https://github.com/tj/n
  >
  > For Windows: use nvm to manage node version: https://github.com/nvm-sh/nvm

## Run the project

* npm install
* npm start

## Deploy the project

***deploy with gunicorn and nginx.***

* npm run build
* copy build directory to [Google Cloud Storage](https://console.cloud.google.com/storage/browser/app-dnoiser-static;tab=objects?forceOnBucketsSortingFiltering=false&project=product-238813&prefix=&forceOnObjectsSortingFiltering=false).
* open SSH of [security noise VM](https://console.cloud.google.com/compute/instancesDetail/zones/us-east4-c/instances/securitynoise?project=product-238813).
* cd /var/www/noisetotal.io/html
* rm -r build
* copy build directory from [Google Cloud Storage](https://console.cloud.google.com/storage/browser/app-dnoiser-static;tab=objects?forceOnBucketsSortingFiltering=false&project=product-238813&prefix=&forceOnObjectsSortingFiltering=false).
* systemctl restart nginx

## Library used

- Noise Total-client uses Firebase to authenticate user via Google, Microsoft or GitHub.

  ***Please use hello@dtonomy.com to login.***

> Google Project: https://console.cloud.google.com/home/dashboard?project=dtonomy-register&authuser=0&hl=en
>
> Firebase Project: https://console.firebase.google.com/u/0/project/dtonomy-register/overview

* Noise Total-client stores image uploaded by user in [cloudinary](https://cloudinary.com). You can modify the configuration in **src\containers\modal\thread.js**.

```javascript
const imageUpload = async (image, onSuccess, onError) => {
    try {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'grvdfxdq'); //replace 'grvdfxdq' with your own preset_name
        const res = await axios.post('https://api.cloudinary.com/v1_1/dbbudrkak/image/upload', data); //replace 'dbbudrkak' with your own username
        const { secure_url } = res.data;
        onSuccess(secure_url)
    } catch (error) {
        console.error(error)
    }
}
```



