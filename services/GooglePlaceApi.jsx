export const GetPhotoRef = async (place_name) => 
  {  const resp=await fetch('https://maps.googleapis.com/maps/api/place/textsearch/json'+
 ' ?query='+place_name+
 ' &key='+process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY);
 const result=await resp.json();
 console.log(result);
 return result;
} 
// export const GetPhotoRef = async (place_name) => {
//   try {
//     // Step 1: Get place_id from Text Search API
//     const textSearchResp = await fetch(
//       `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(place_name)}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`
//     );
    
//     const textSearchData = await textSearchResp.json();
    
//     if (!textSearchData.results || textSearchData.results.length === 0) {
//       console.error('No place found for:', place_name);
//       return null;
//     }

//     const place_id = textSearchData.results[0].place_id;

//     // Step 2: Use place_id to get photo_reference from Place Details API
//     const detailsResp = await fetch(
//       `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`
//     );
    
//     const detailsData = await detailsResp.json();
    
//     if (!detailsData.result || !detailsData.result.photos) {
//       console.error('No photos found for place_id:', place_id);
//       return null;
//     }

//     const photo_reference = detailsData.result.photos[0].photo_reference;
    
//     return photo_reference;
//   } catch (error) {
//     console.error('Error fetching place photo:', error);
//     return null;
//   }
// };
