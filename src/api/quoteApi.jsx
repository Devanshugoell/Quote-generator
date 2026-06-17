import axiosInstance from './axiosInstance';


export const createZohoQuote = async (payload) => {
  const formattedPayload = {
    data: [
      {
        Subject: payload.Subject,
        Dealer_Name: payload.Dealer_Name, 
        Quoted_Items: payload.Quoted_Items.map(item => ({
          Product_Name: {
            id: item.Product_Name.id,
            name: item.Product_Name.name
          },
          Quantity: item.Quantity,
          List_Price: item.List_Price
        }))
      }
    ]
  };

  const response = await axiosInstance.post('/crm/v6/Quotes', formattedPayload);
  return response.data?.data?.[0]?.details || response.data?.data?.[0];
};


export const getExistingQuotes = async () => {
  const query = "SELECT id, Subject, Quote_Number, Grand_Total, Created_Time, Valid_Till FROM Quotes WHERE id > 0 ORDER BY Created_Time DESC";
  const response = await axiosInstance.post('/crm/v7/coql', { select_query: query });
  return response.data?.data || [];
};


export const getQuoteDetail = async (quoteId) => {
  const response = await axiosInstance.get(`/crm/v6/Quotes/${quoteId}`);
  return response.data?.data?.[0];
};
