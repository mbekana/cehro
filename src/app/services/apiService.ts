import Cookies from 'js-cookie';


export async function apiRequest(url, options:any = {}) {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL; 

  console.log("CLG: ", `${API_BASE_URL}/${url}`)
  const token = Cookies.get('accessToken'); 

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers, 
  };

  const response = await fetch(`${API_BASE_URL}${url}`, {
    method: options.method || 'GET',
    headers: headers,
    body: options.body ? JSON.stringify(options.body) : null,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}
