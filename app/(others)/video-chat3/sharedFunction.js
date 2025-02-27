import axios from "axios";


// this doesn't consider timezone and returns the date in YYYY-MM-DD format
export const getRawDate=(dateObj)=>{
  if(!dateObj){
    return
  }
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0'); 
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;

}

export const handleUpdateSlots=async(selectedDate,status)=>{
  const year = selectedDate.getFullYear();
  const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(selectedDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  console.log('formated date is',formattedDate);
  const hours = String(selectedDate.getHours()).padStart(2, '0');
  const minutes = String(selectedDate.getMinutes()).padStart(2, '0');
  const url=` http://127.0.0.1:8000/availability-slots/update/${formattedDate}/`
  const body={
    "consultant_id":consultant_id,
    "time": `${hours}:${minutes}`,
    "status": status
  }
  try {
    const response = await axios.patch(url,body);
    return response.data
  } catch (error) {
    console.error(error);
    return []
  }
}