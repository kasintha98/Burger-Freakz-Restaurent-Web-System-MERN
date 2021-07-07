import { purchaseConstants } from "../actions/constants";

const initState = {
  purchase: [],
  loading: false,
  error: null,
};

const buildNewPurchases = (purchase, purchaseOne) => {
  return [
    ...purchase,
    {
      _id: purchaseOne._id,
      title: purchaseOne.title,
      qty: purchaseOne.qty,
      unitPrice: purchaseOne.unitPrice,
      description: purchaseOne.description,
    },
  ];
};

export default (state = initState, action) => {
  switch (action.type) {
    case purchaseConstants.ADD_PURCHASE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case purchaseConstants.ADD_PURCHASE_SUCCESS:
      const purchaseOne = action.payload.purchase;
      const updatedPurchases = buildNewPurchases(state.purchase, purchaseOne);
      console.log("updatedPurchases", updatedPurchases);
      state = {
        ...state,
        purchase: updatedPurchases,
        loading: false,
      };
      break;
    case purchaseConstants.ADD_PURCHASE_FAILURE:
      state = {
        ...initState,
        loading: false,
        error: action.payload.error,
      };
      break;
    case purchaseConstants.DELETE_PURCHASE_REQUEST:
      state = { ...state, loading: true };
      break;
    case purchaseConstants.DELETE_PURCHASE_SUCCESS:
      state = { ...state, loading: false };
      break;
    case purchaseConstants.DELETE_PURCHASE_FAILURE:
      state = { ...state, error: action.payload.error, loading: false };
      break;
    case purchaseConstants.GET_PURCHASE_SUCCESS:
      state = {
        ...state,
        purchase: action.payload.purchase,
        loading: false,
      };
      break;

    case purchaseConstants.GET_PURCHASE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;

    case purchaseConstants.GET_PURCHASE_FAILURE:
      state = {
        ...initState,
        loading: false,
        error: action.payload.error,
      };
      break;
  }
  return state;
};
