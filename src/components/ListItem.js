// create a component that displays a single bakery item
import React from "react";

class ListItem extends React.Component {

    render() {
        return (
            <div style={{height:350, backgroundColor:'lightgray', marginBottom:40, padding:15}}>
                <p>Name: {this.props.name}</p>
                <p>Price: {this.props.price}</p>
                <p>Length: {this.props.length}</p>
                <p>Car Type: {this.props.type}</p>
                <p>Fuel Type: {this.props.fuel}</p>
                <img src={this.props.image} height={100}/>
                <button onClick={() => {

                }}>
                    Add To Cart
                </button>
            </div>
        );
    }
}

export default ListItem

