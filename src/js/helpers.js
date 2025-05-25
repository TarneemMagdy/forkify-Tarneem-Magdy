import { TIMEOUT_SEC } from "./config.js";

export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX=async function(url,uploadData=undefined){
    try {
      const fetchPro = uploadData
        ? fetch(url, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json', // Content type is usually JSON for APIs
            },
            body: JSON.stringify(uploadData), // Convert the data object to a JSON string
          })
        : fetch(url);

     
      const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
      const data = await res.json();
      console.log(res, data);

      if (!res.ok) throw new Error(`${data.message} (${res.status})`);
      return data;
    } catch (err) {
      throw err;
    }
}

// export const getJson=async function (url) {
//     try{
//       const fetchPro=fetch(url)
//     const res = await Promise.race([fetchPro,timeout(TIMEOUT_SEC)]);
//           const data = await res.json();
//           console.log(res, data);
        
//           if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//                         return data;
//     }
//     catch(err){
//         throw err;
//     }

// }


// export const sendJson = async function (url,uploadData) {
//   try {
//      const fetchPro = fetch(url, {
//        method: 'post',
//        headers: {
//          'Content-Type': 'application/json', // Content type is usually JSON for APIs
       
//        },
//        body: JSON.stringify(uploadData), // Convert the data object to a JSON string
//      });
//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     const data = await res.json();
//     console.log(res, data);

//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };