const API_URL =
  'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros';
export const environment = {
  endpoints: {
    getAllFinancialProducts: `${API_URL}/bp/products`,
    getVerificationIdProduct: `${API_URL}/bp/products/verification?id={{id}}`,
    postCreateFinancialProduct: `${API_URL}/bp/products`,
  },
};
