import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import urlJson from "../../../../package.json";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  login: false,
  xuser: [],
  pbrand: [],
  cartproducts: [],
  tFetch : 0,
  navBarName : "Dashboard",
};

export function checkTokenIsStillValid(token, thunkAPI) {
  try {
    let decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      thunkAPI.dispatch(xClearAll());
      return thunkAPI.dispatch(
        setErrorMessage("Session Expired. Please re-login your credentials.")
      );
    }
  } catch (e) {
    thunkAPI.dispatch(xClearAll());
    return thunkAPI.dispatch(
      setErrorMessage("Session Expired. Please re-login your credentials.")
    );
  }
}

export function baseURL() {
  let SubFolder = urlJson.forLocalApiRefOnly;
  // let BaseUrlsApi = window.location.origin;

  // window.location.origin.toLowerCase().includes("localhost")
  //   ? (SubFolder = urlJson.forLocalApiRefOnly)
  //   : (SubFolder = BaseUrlsApi);

  return SubFolder;
}

const SubFolder = baseURL();

export const bURLProduct = `${SubFolder}/api/product`;
export const bURLBrand = `${SubFolder}/api/brand`;
export const bURLUser = `${SubFolder}/api/cuser`;
export const bURLAdministrator  = `${SubFolder}/api/administrator`;
export const bURLStripe  = `${SubFolder}/api/stripe`;
export const bURLProperty = `${SubFolder}/api/aproperty`;
export const bURLServices = `${SubFolder}/api/aheaderservices`;
export const bURLAlphaAdmin = `${SubFolder}/api/alphaadmin`;
export const bURLContactUs = `${SubFolder}/api/acontactus`;

export const GetDashboard = createAsyncThunk("GetDashboard", () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios
    .get(bURLUser+"/dashboard",config)
    .then((response) => response.data);
});

export const Register = createAsyncThunk("Register", (params) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios
    .post(bURLUser+"/register",params.data,config)
    .then((response) => response.data);
});

export const GetBrands = createAsyncThunk("GetBrands", () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios
    .get(bURLBrand,config)
    .then((response) => response.data);
});

export const Login = createAsyncThunk("Login", (params) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios
    .post(bURLAlphaAdmin+"/Login",params.data,config)
    .then((response) => response.data);
});

export const AddProductWheels = createAsyncThunk("AddProductWheels", (params) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return axios
    .post(bURLAdministrator+"/AddProductWheels",params.data,config)
    .then((response) => response.data);
});

export const GetCustomers = createAsyncThunk("GetCustomers", () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios
    .get(bURLAdministrator+"/GetCustomers",config)
    .then((response) => response.data);
});

export const PriceAdjustmentofProduct = createAsyncThunk("PriceAdjustmentofProduct", (params) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios
    .post(bURLAdministrator+"/PriceAdjustment",params.data,config)
    .then((response) => response.data);
});

export const StockAdjustmentofProduct = createAsyncThunk("StockAdjustmentofProduct", (params) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios
    .post(bURLAdministrator+"/StockAdjustment",params.data,config)
    .then((response) => response.data);
});

export const RemoveProductWheel = createAsyncThunk("RemoveProductWheel", (params) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios
    .post(bURLAdministrator+"/RemoveProductWheel",params.data,config)
    .then((response) => response.data);
});

export const RemoveVoucherAPI = createAsyncThunk("RemoveVoucherAPI", (params) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios
    .put(bURLAdministrator+"/RemoveVoucher",params.data,config)
    .then((response) => response.data);
});

export const AddVoucher = createAsyncThunk("AddVoucher", (params) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios
    .post(bURLAdministrator+"/AddVoucher",params.data,config)
    .then((response) => response.data);
});

export const UpdateVoucher = createAsyncThunk("UpdateVoucher", (params) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios
    .put(bURLAdministrator+"/UpdateVoucher",params.data,config)
    .then((response) => response.data);
});



export const GetAllProducts = createAsyncThunk("GetAllProducts", () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios
    .get(bURLUser+"/GetAllProducts",config)
    .then((response) => response.data);
});

export const GetAllOrders = createAsyncThunk("GetAllOrders", () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios
    .get(bURLUser+"/GetOrders",config)
    .then((response) => response.data);
});

export const GetOrder = createAsyncThunk("GetOrder", (params) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios
    .get(`${bURLUser}/GetOrder/${params.data.id}`,config)
    .then((response) => response.data);
});


export const GetVouchers = createAsyncThunk("GetVouchers", () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios
    .get(bURLUser+"/GetVouchers",config)
    .then((response) => response.data);
});


export const GetCustomerExcel = createAsyncThunk("GetCustomerExcel", () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios
    .get(bURLAdministrator+"/ExportExcelCustomer",config)
    .then((response) => response.data);
});

export const Order = createAsyncThunk("Order", (params) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios
    .post(bURLUser+"/Order",params.data,config)
    .then((response) => response.data);
});

export const ChangePasswordAPI = createAsyncThunk("ChangePasswordAPI", (params) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios
    .post(bURLAlphaAdmin+"/ChangePassword",params.data,config)
    .then((response) => response.data);
});

export const GetAccountTypes = createAsyncThunk("GetAccountTypes", () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios
    .get(bURLAdministrator+"/GetAccountTypes",config)
    .then((response) => response.data);
});

//new version
export const GetAllProperty = createAsyncThunk("GetAllProperty", (params) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios
    .get(bURLProperty,config)
    .then((response) => response.data);
});

export const GetPropertyById = createAsyncThunk("GetAllProperty", (params) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios
  .get(`${bURLProperty}/${params.data.id}`,config)
    .then((response) => response.data);
});

export const SaveProperty = createAsyncThunk("GetAllProperty", (params) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios
    .post(bURLProperty,params.data,config)
    .then((response) => response.data);
});

export const UpdateProperty = createAsyncThunk("UpdateProperty", (params) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios
    .put(`${bURLProperty}/${params.id}`,params.data,config)
    .then((response) => response.data);
});

export const DeleteProperty = createAsyncThunk("UpdateProperty", (params) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios
    .delete(`${bURLProperty}/${params.id}`,params.data,config)
    .then((response) => response.data);
});

export const GetAllServices = createAsyncThunk("GetAllServices", (params) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios
    .get(bURLServices,config)
    .then((response) => response.data);
});

export const GetAllContacts = createAsyncThunk("GetAllContacts", (params) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios
    .get(bURLContactUs,config)
    .then((response) => response.data);
});



const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserLoginStatus: (state, action) => {
      state.login = action.payload;
    },
    setNavigation: (state, action) => {
      state.error = action.payload;
    },
    setXUser: (state, action) => {
      state.xuser = action.payload;
    },
    xClearAll: (state) => {
      state.loading = false;
      state.login = false;
      state.xuser = [];
      state.navBarName = "Dashboard";
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCartProduct: (state, action) => {
      state.cartproducts = action.payload;
    },
    setLogin: (state, action) => {
      state.login = action.payload;
    },
    setTFetch : (state, action) =>{
      state.tFetch = action.payload;
    }
    ,
    addCart : (state, action) =>{
      state.cartproducts = action.payload
    },
    updateNavigation : (state, action) =>{
      state.navBarName = action.payload
    },
  },
  extraReducers: (builder) => {
    //register
    builder.addCase(Register.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(Register.fulfilled, (state, action) => {
      state.loading = false;
      toast.success("Account successfully created.");
    });

    builder.addCase(Register.rejected, (state, action) => {
      toast.error("Account registration failed. Please try again later.");
    });
    //login
    builder.addCase(Login.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(Login.fulfilled, (state, action) => {
      state.loading = false;
      state.login = true;
      state.xuser = action.payload;
    });

    builder.addCase(Login.rejected, (state, action) => {
      state.login = false;
      toast.error("Incorrect username or password. Please try again.");
    });

    builder.addCase(AddProductWheels.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(AddProductWheels.fulfilled, (state, action) => {
      state.loading = false;
      toast.success("Product successfully added.");
    });

    builder.addCase(AddProductWheels.rejected, (state, action) => {
      state.loading = false;
      toast.error("Product unsuccessfully added. Please try again.");
    });
  },
});

export const {
  setErrorMessage,
  setSuccessMessage,
  setUserLoginStatus,
  setNavigation,
  xClearAll,
  setXUser,
  setLoading,
  setCartProduct,
  setLogin,
  setTFetch,
  addCart,
  updateNavigation
} = userSlice.actions;
export default userSlice;
