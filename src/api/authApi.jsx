import axios from 'axios';

export const fetchNewToken = async () => {
  try {
    const response = await axios.post('/oauth-provider/oauth/v2/token', null, {
      params: {
        refresh_token: import.meta.env.VITE_ZOHO_REFRESH_TOKEN,
        client_id: import.meta.env.VITE_ZOHO_CLIENT_ID,
        client_secret: import.meta.env.VITE_ZOHO_CLIENT_SECRET,
        grant_type: 'refresh_token',
      },
    });

    const { access_token, expires_in } = response.data;

    
    localStorage.setItem('zoho_access_token', access_token);
    
    const expiryTime = Date.now() + (expires_in || 3600) * 1000;
    localStorage.setItem('zoho_token_expiry', expiryTime.toString());

    return access_token;
  } catch (error) {
    console.error('Critical Authorization Handshake Failed:', error.response?.data || error.message);
    throw error; 
  }
};