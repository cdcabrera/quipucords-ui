import helpers from './helpers';

const generatedPromiseActionReducer = (types = [], state = {}, action = {}) => {
  if (!action.meta || !action.meta.id) {
    return state;
  }

  const { type } = action;
  const [whichType] = types.filter(val =>
    new RegExp(
      `^(${helpers.REJECTED_ACTION(val.type || val)}|${helpers.PENDING_ACTION(
        val.type || val
      )}|${helpers.FULFILLED_ACTION(val.type || val)})$`
    ).test(type)
  );

  if (!whichType) {
    return state;
  }

  switch (type) {
    case helpers.REJECTED_ACTION(whichType.type || whichType):
      return helpers.setStateProp(
        whichType.ref || null,
        {
          [action.meta.id]: {
            error: action.error,
            errorMessage: helpers.getMessageFromResults(action.payload).message,
            errorStatus: helpers.getStatusFromResults(action.payload),
            metaData: action.meta.data,
            metaId: action.meta.id,
            metaQuery: action.meta.query
          }
        },
        {
          state
        }
      );
    case helpers.PENDING_ACTION(whichType.type || whichType):
      return helpers.setStateProp(
        whichType.ref || null,
        {
          [action.meta.id]: {
            metaData: action.meta.data,
            metaId: action.meta.id,
            metaQuery: action.meta.query,
            pending: true
          }
        },
        {
          state
        }
      );

    case helpers.FULFILLED_ACTION(whichType.type || whichType):
      return helpers.setStateProp(
        whichType.ref || null,
        {
          [action.meta.id]: {
            data: (action.payload && action.payload.data) || {},
            fulfilled: true,
            metaData: action.meta.data,
            metaId: action.meta.id,
            metaQuery: action.meta.query
          }
        },
        {
          state
        }
      );

    default:
      return state;
  }
};

const reduxHelpers = {
  generatedPromiseActionReducer
};

export { reduxHelpers as default, reduxHelpers, generatedPromiseActionReducer };
