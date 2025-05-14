import api from "@/utilities/api";
import { del, get, patch, post } from "@/utilities/httpClient";

export default class SkillArchitectureEffects {
  static getLabels(customerId) {
    return get(`${api.CUSTOMERS}/${customerId}/skill-architecture/labels`);
  }

  static getRecords(customerId) {
    return get(`${api.CUSTOMERS}/${customerId}/skill-architecture/records`);
  }

  static updateLabel(labelId, customerId, data) {
    return patch(
      `${api.CUSTOMERS}/${customerId}/skill-architecture/labels/${labelId}`,
      data
    );
  }

  static saveRecord(customerId, value) {
    return post(
      `${api.CUSTOMERS}/${customerId}/skill-architecture/records`,
      value
    );
  }

  static saveMultipleRecords(customerId, records) {
    return post(
      `${api.CUSTOMERS}/${customerId}/skill-architecture/records/bulk`,
      { records }
    );
  }

  static deleteRecords(customerId, labelKey) {
    return del(
      `${api.CUSTOMERS}/${customerId}/skill-architecture/records/${labelKey}`
    );
  }
}
