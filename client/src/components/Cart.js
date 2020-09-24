import React from "react";
import Items from "./Items"

const Cart = props => {
    return (
        <div>
           <Items payload={[{
                    "id":0,
                    "name":"First Item",
                    "price":"25",
                    "quantity":"45",
                    "description":"first item.",
                    "category":"fruits",
                    "image":"https://picsum.photos/500",
                    "rating":4.5
                },{
                    "id":1,
                    "name":"First Item",
                    "price":"25",
                    "quantity":"45",
                    "description":"first item.",
                    "category":"fruits",
                    "image":"https://picsum.photos/500",
                    "rating":4.5
                }]} forCart={true} />
        </div>
    );
}
 
export default Cart;