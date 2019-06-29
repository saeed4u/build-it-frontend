import Repository from './Repository'

const baseUrl = '/api/invoice/';

export default {
  makePayment(invoiceId) {
    return  Repository.put(`${baseUrl}${invoiceId}`);
  }
}
