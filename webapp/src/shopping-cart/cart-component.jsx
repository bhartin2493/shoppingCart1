import React from "react";

import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";

class CartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log("Added Items:", this.props.addedItems);
    return (
      <div className="cart-wrapper">
        <Box component="nav">
          <AppBar position="static">
            <Toolbar>
              <IconButton
                style={{ color: "tomato" }}
                onClick={() => {
                  this.props.switchToHome();
                }}
              >
                <ArrowBack />
                <Typography variant="h6">Continue Shopping</Typography>
              </IconButton>
            </Toolbar>
          </AppBar>
        </Box>
      </div>
    );
  }
}

export default CartComponent;
