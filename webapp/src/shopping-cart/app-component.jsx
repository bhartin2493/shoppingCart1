import React from "react";
import CartComponent from "./cart-component.jsx";
import ItemsComponent from "./items-component.jsx";

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCartOpen: false,
      addedItems: [],
      productsList: [
        {
          product_id: 1,
          Product_name: "OnePlus",
          image_name: "OnePlus.jpg",
          price: 33000,
          category_name: "Electronics",
          category_id: 1,
          sub_category_name: "Mobiles",
          sub_category_id: 1,
        },
        {
          product_id: 2,
          Product_name: "Samsung",
          image_name: "samsung.jpg",
          price: 35000,
          category_name: "Electronics",
          category_id: 1,
          sub_category_name: "Mobiles",
          sub_category_id: 1,
        },
      ],
    };
  }

  switchToCart = () => {
    this.setState({
      isCartOpen: true,
    });
  };

  switchToHome = () => {
    this.setState({
      isCartOpen: false,
    });
  };

  OnAddToCart = (id) => {
    let addedItem = this.state.productsList.find(
      (item) => item.product_id === id
    );
    // console.log("Added item:", addedItem);

    if (this.state.addedItems.length == 0) {
      addedItem.quantity = 1;
      this.setState({
        addedItems: [addedItem],
      });
    }

    this.state.addedItems.map(
      (item) => {
        console.log("Added item ", addedItem);
        if (item.product_id == addedItem.product_id) {
          addedItem.quantity += 1;
          return { ...this.state.addedItems };
        }
        addedItem.quantity = 1;
        this.setState({
          addedItems: [addedItem],
        });
        return {
          ...this.state.addedItems,
          addedItems: [...this.state.addedItems, addedItem],
        };
      },
      () => {
        console.log("items:", this.state.addedItems);
      }
    );
  };

  render() {
    console.log("State current:", this.state.addedItems);
    return (
      <div className="app-container">
        {this.state.isCartOpen == true ? (
          <CartComponent
            isCartOpen={this.state.isCartOpen}
            switchToHome={this.switchToHome}
            addedItems={this.state.addedItems}
          />
        ) : (
          <ItemsComponent
            isCartOpen={this.state.isCartOpen}
            switchToCart={this.switchToCart}
            OnAddToCart={this.OnAddToCart}
            productsList={this.state.productsList}
          />
        )}
      </div>
    );
  }
}

export default AppComponent;
