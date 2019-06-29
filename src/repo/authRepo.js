import Repository from './Repository'

const endPoint = '/auth';

export default {
  login(payload){
    return Repository.post(endPoint,payload);
  }
}
