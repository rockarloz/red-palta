import axios from "axios";

const API = (function () {

  const POST = async (endpoint, formData) => {
    try {
      const response = await axios.post(`${endpoint}`, formData);

      return response;
    }catch (e) {
      console.warn("POST", endpoint, e);
      return e;
      
    }
  }


  const GET = async (url, params) => {

    var basicAuth = 'Bearer keysEKP8lVx3CGt1M';
    try {
      const response = await axios.get(url, { headers: { 'Authorization': basicAuth , 'Content-Type': 'application/json'} });
      return response;

    }catch (e) {
      console.warn("GET", url, e);
      return e;
      
    }
  }
  return {
    GET,
    POST
  }

})();

async function getCountries(){
 	try {
     let url = 'https://api.airtable.com/v0/appYUz1zYjWxP8w4w/Table%201 '
     const data = await API.GET(url);
     return data.data.records; 
 	}catch (e){
   	console.warn('some error', e);
   }

}

export default API;
export {
  getCountries,
};