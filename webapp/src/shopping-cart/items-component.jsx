import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { fetchCategories } from "./actions.js";

import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Icon,
  Button,
  Link,
  Menu,
  MenuItem,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
} from "@material-ui/core";
import {
  ShoppingCart,
  Home,
  ArrowDropDown,
  AddShoppingCart,
} from "@material-ui/icons";

class ItemsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  componentDidMount = () => {
    this.props.fetchCategories();
  };

  render() {
    const categories =
      this.props.categoryList != undefined && this.props.categoryList
        ? this.props.categoryList
        : "";

    return (
      <div className="item-wrapper">
        <Box component="nav">
          <AppBar position="static">
            <Toolbar>
              <IconButton style={{ color: "#fff" }}>
                <Home style={{ margin: "5px" }} />
                <Typography variant="h6">Shopping Cart App</Typography>
              </IconButton>
              <IconButton
                style={{ position: "absolute", right: "100px", color: "#fff" }}
                onClick={() => {
                  this.props.switchToCart();
                }}
              >
                <ShoppingCart />
              </IconButton>
              {Object.entries(categories).map((item) => {
                return (
                  <>
                    <Button
                      style={{ color: "#fff", marginLeft: "20px" }}
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={this.handleClick}
                    >
                      {item[0]}
                      <ArrowDropDown />
                    </Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={this.state.anchorEl}
                      keepMounted
                      open={Boolean(this.state.anchorEl)}
                      onClose={this.handleClose}
                    >
                      <MenuItem>Profile</MenuItem>
                    </Menu>
                  </>
                );
              })}
            </Toolbar>
          </AppBar>

          {/* Card Component */}

          {this.props.productsList != undefined &&
          this.props.productsList.length > 0
            ? this.props.productsList.map((item) => {
                return (
                  <Card
                    key={item.product_id}
                    style={{
                      minWidth: "275px",
                      maxWidth: "275px",
                      margin: "20px",
                    }}
                  >
                    <CardMedia
                      style={{ paddingTop: "56.25%" }}
                      image={`/assets/${item.image_name}`}
                      title="Paella dish"
                    />
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        {item.Product_name}
                      </Typography>
                      <Typography
                        style={{ fontSize: "14" }}
                        color="textSecondary"
                        gutterBottom
                      >
                        ₹ {item.price}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          this.props.OnAddToCart(item.product_id);
                        }}
                      >
                        Add To Cart <AddShoppingCart />
                      </Button>
                    </CardActions>
                  </Card>
                );
              })
            : ""}
        </Box>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    fetchProducts: (category, sub_category) =>
      dispatch(fetchProducts(category, sub_category)),
  };
}

function mapStateToProps(state) {
  return {
    categoryList: state.app.categoryList,
    // productsList: state.app.productsList,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsComponent);
