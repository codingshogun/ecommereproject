import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../actions/productActions";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "./Sidebar";

const ProductList = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, products } = useSelector((state) => state.productsState);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("product deleted");
      dispatch({ type: "deleteProductReset" });
    }
    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);
  const columns = [
    { field: "id", headerName: "product id", minWidth: 200, flex: 0.5 },
    {
      field: "name",
      headerName: "name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "stock",
      type: "number",
      minWidth: "150",
      flex: 0.3,
    },
    {
      field: "price",
      headerName: "price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>
            <Button>
              <DeleteIcon
                onClick={() => {
                  deleteProductHandler(params.getValue(params.id, "id"));
                }}
              />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];
  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <>
      <MetaData title={"admin: products"} />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">all products</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
            color="white"
          />
        </div>
      </div>
    </>
  );
};

export default ProductList;
