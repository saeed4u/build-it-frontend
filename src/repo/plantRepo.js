import Repository from "./Repository";

const plantInv = "/api";

export default {
  getPlants(payload) {
    return Repository.get(`${plantInv}/plants`, {params: payload})
  },
  getPlantHires() {
    "use strict";
    return Repository.get(`${plantInv}/hire-requests`)
  },
  createPlantHire(payload) {
    return Repository.post(`${plantInv}/hire-requests`, payload)
  },
  acceptPlantHire(id) {
    return Repository.put(`${plantInv}/hire-requests/${id}/accept`)
  },
  cancelHireRequest(id) {
    return Repository.put(`${plantInv}/hire-requests/${id}/cancel`)
  },
  updatePlantHire(id, payload) {
    return Repository.put(`${plantInv}/hire-requests/${id}`, payload)
  },
  rejectPlantHire(id, payload) {
    return Repository.put(`${plantInv}/hire-requests/${id}/reject`, payload)
  },
  requestExtensionHire(id,payload) {
    return Repository.put(`${plantInv}/hire-requests/${id}/extend`, payload)
  }

}
