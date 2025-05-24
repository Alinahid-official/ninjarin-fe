import { createAction } from "@/utilities/actionUtility";

const SkillArchitectureActions = {
  GET_LABELS: "skillArchitecture/GET_LABELS",
  GET_LABELS_FINISHED: "skillArchitecture/GET_LABELS_FINISHED",
  GET_RECORDS: "skillArchitecture/GET_RECORDS",
  GET_RECORDS_FINISHED: "skillArchitecture/GET_RECORDS_FINISHED",
  UPDATE_LABEL: "skillArchitecture/UPDATE_LABEL",
  UPDATE_LABEL_FINISHED: "skillArchitecture/UPDATE_LABEL_FINISHED",
  SAVE_RECORD: "skillArchitecture/SAVE_RECORD",
  SAVE_RECORD_FINISHED: "skillArchitecture/SAVE_RECORD_FINISHED",
  SAVE_MULTIPLE_RECORDS: "skillArchitecture/SAVE_MULTIPLE_RECORDS",
  SAVE_MULTIPLE_RECORDS_FINISHED:
    "skillArchitecture/SAVE_MULTIPLE_RECORDS_FINISHED",
  DELETE_RECORD: "skillArchitecture/DELETE_RECORD",
  DELETE_RECORD_FINISHED: "skillArchitecture/DELETE_RECORD_FINISHED",
  UPDATE_RECORD: "skillArchitecture/UPDATE_RECORD",
  UPDATE_RECORD_FINISHED: "skillArchitecture/UPDATE_RECORD_FINISHED",

  getLabels: (customerId) =>
    createAction(SkillArchitectureActions.GET_LABELS, customerId),
  getRecords: (customerId) =>
    createAction(SkillArchitectureActions.GET_RECORDS, customerId),
  updateLabel: (labelId, customerId, data, name) =>
    createAction(
      SkillArchitectureActions.UPDATE_LABEL,
      {
        labelId,
        customerId,
        data,
      },
      null,
      {
        scope: name,
      }
    ),
  saveRecord: (customerId, value) =>
    createAction(SkillArchitectureActions.SAVE_RECORD, {
      customerId,
      value,
    }),
  saveMultipleRecords: (customerId, records) =>
    createAction(SkillArchitectureActions.SAVE_MULTIPLE_RECORDS, {
      customerId,
      records,
    }),
  deleteRecord: (customerId, recordId) =>
    createAction(SkillArchitectureActions.DELETE_RECORD, {
      customerId,
      labelKey: recordId,
    }),
  updateRecord: (customerId, recordId, data) =>
    createAction(SkillArchitectureActions.UPDATE_RECORD, {
      customerId,
      recordId,
      data,
    }),
};

export default SkillArchitectureActions;
