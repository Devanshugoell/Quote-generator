import axiosInstance from './axiosInstance';

const mapCategoryToType = (category) =>
  category === 'Hardware' ? 'Goods' : 'Service';

export const getActiveProducts = async (type = 'All') => {
  let typeFilter = '';
  if (type === 'Goods') typeFilter = ` AND (Product_Category = 'Hardware')`;
  else if (type === 'Service') typeFilter = ` AND (Product_Category != 'Hardware')`;

  const query = `SELECT id,Product_Name,Product_Category,Unit_Price,Usage_Unit,Created_Time FROM Products WHERE Product_Name is not null${typeFilter} ORDER BY Created_Time desc LIMIT 200`;

  try {
    const response = await axiosInstance.post('/crm/v7/coql', {
      select_query: query
    });
    const products = response.data?.data ?? [];
    return products.map(p => ({ ...p, Type: mapCategoryToType(p.Product_Category) }));
  } catch (error) {
    console.error('Full error response:', error.response?.data);
    throw error;
  }
};

export const getProductById = async (id) => {
  const query = `SELECT id, Product_Name, Product_Code, Unit_Price, Description, Product_Category, Product_Active, Taxable, Tax, Qty_in_Stock, Qty_Ordered, Qty_in_Demand, Reorder_Level, Usage_Unit, Commission_Rate, Vendor_Name, Manufacturer, Handler, Owner, Created_Time, Modified_Time FROM Products WHERE id = '${id}'`;
  try {
    const response = await axiosInstance.post('/crm/v7/coql', { select_query: query });
    return response.data?.data?.[0] ?? null;
  } catch (error) {
    console.error('Error fetching product by id:', error.response?.data);
    throw error;
  }
};