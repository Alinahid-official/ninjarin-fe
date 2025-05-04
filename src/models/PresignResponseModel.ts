import { BaseModel } from "sjs-base-model";

export default class PresignResponseModel extends BaseModel {
  fileName = null;

  uploadId = null;

  url = null;

  metadata = {};

  expires = "";

  constructor(data: Partial<PresignResponseModel>) {
    super();
    this.update(data);
  }
}
