import "./App.css";
import React, { useState } from "react";
import bakeryData from "./assets/bakery-data.json";
import ListItem from "./components/ListItem";
import Dropdown from 'react-bootstrap/Dropdown';

function App() {
  const [cart, setCart] = React.useState([]);
  const [sortByPrice, setSortByPrice] = React.useState(true);
  const [sortByLength, setSortByLength] = React.useState(false);
  const [filterBySedan, setFilterBySedan] = React.useState(false);
  const [filterBySUV, setFilterBySUV] = React.useState(false);
  const [filterByElectric, setFilterByElectric] = React.useState(false);
  const [filterByGas, setFilterByGas] = React.useState(false);
    const theSorter = (data) => {
        if (sortByPrice) {
            return data.sort((a, b) => a.price - b.price);
        } else if (sortByLength) {
            return data.sort((a, b) => a.length - b.length);
        }
    }

  const [data, setData] = React.useState(theSorter(bakeryData));

  const cartSum = () => {
      const cartTotal = cart.reduce((adder, item) => {
          return adder + item.price;
      }, 0);
      return cartTotal;
  }

  const handleRemoveItem = (e) => {
        const name = e.name
        setCart(cart.filter(item => item.name !== name));
    };

    return (
      <div className="App">
          <div style={{marginLeft:50, marginRight:50}}>
              <h1>Sort and Filter!</h1>
              <h2>Sort By:</h2>
              <div>
                  <label>
                      <input
                          type="radio"
                          value="Price"
                          checked={sortByPrice}
                          onClick={() => {
                                setSortByPrice(true);
                                setSortByLength(false);
                                setData(theSorter(data));
                          }}
                      />
                      Price
                  </label>
              </div>
              <div>
                  <label>
                      <input
                          type="radio"
                          value="Length"
                          checked={sortByLength}
                            onClick={() => {
                                setSortByLength(true);
                                setSortByPrice(false);
                                setData(theSorter(data));
                            }}
                      />
                      Length
                  </label>
              </div>

              <h2>Filter By:</h2>
              <div>
                  <label>
                      <input
                          type="radio"
                          value="SUV"
                          checked={filterBySUV}
                          onClick={() => {
                              setFilterBySUV(true);
                              setFilterBySedan(false);
                              setData(theSorter(data))
                              if (filterByElectric) {
                                  setData(bakeryData.filter(item => item.type === "SUV" && item.fuel === "Electric"));
                              } else if (filterByGas) {
                                  setData(bakeryData.filter(item => item.type === "SUV" && item.fuel === "Gas"));
                              } else {
                                    setData(bakeryData.filter(item => item.type === "SUV"));
                              }
                          }}
                      />
                      SUV
                  </label>
              </div>
              <div>
                  <label>
                      <input
                          type="radio"
                          value="Sedan"
                          checked={filterBySedan}
                          onClick={() => {
                                setFilterBySedan(true);
                                setFilterBySUV(false);
                              setData(theSorter(data))
                                if (filterByElectric) {
                                    setData(bakeryData.filter(item => item.type === "Sedan" && item.fuel === "Electric"));
                                } else if (filterByGas) {
                                    setData(bakeryData.filter(item => item.type === "Sedan" && item.fuel === "Gas"));
                                } else {
                                    setData(bakeryData.filter(item => item.type === "Sedan"));
                                }
                          }}
                      />
                      Sedan
                  </label>
              </div>









              <h2>Filter By:</h2>
              <div>
                  <label>
                      <input
                          type="radio"
                          value="Gas"
                          checked={filterByGas}
                          onClick={() => {
                                setFilterByGas(true);
                                setFilterByElectric(false);
                              setData(theSorter(data))
                              if (filterBySedan) {
                                  setData(bakeryData.filter(item => item.fuel === "Gas" && item.type === "Sedan"));
                              } else if (filterBySUV) {
                                  setData(bakeryData.filter(item => item.fuel === "Gas" && item.type === "SUV"));
                              } else {
                                    setData(bakeryData.filter(item => item.fuel === "Gas"));
                              }
                          }}
                      />
                      Gas
                  </label>
              </div>
              <div>
                  <label>
                      <input
                          type="radio"
                          value="Electric"
                          checked={filterByElectric}
                          onClick={() => {
                                setFilterByElectric(true);
                                setFilterByGas(false);
                              setData(theSorter(data))
                                if (filterBySedan) {
                                    setData(bakeryData.filter(item => item.fuel === "Electric" && item.type === "Sedan"));
                                } else if (filterBySUV) {
                                    setData(bakeryData.filter(item => item.fuel === "Electric" && item.type === "SUV"));
                                } else {
                                    setData(bakeryData.filter(item => item.fuel === "Electric"));
                                }
                          }}
                      />
                      Electric
                  </label>
              </div>
              <h2>Refresh Page to Reset Filters and See All!</h2>






          </div>
        <div style={{marginLeft:50, marginRight:50}}>
          <h1>Available Cars</h1>
          {data.map((item, index) => (
              <div style={{height:420, backgroundColor:'lightgray', marginBottom:40, padding:15,
              width:350}}>
                  <div style={{flexDirection:'row', display:'flex', justifyContent:'space-between'}}>
                      <p>ID: </p> <p>{index}</p>
                  </div>
                  <div style={{flexDirection:'row', display:'flex', justifyContent:'space-between'}}>
                      <p>Name: </p> <p>{item.name}</p>
                  </div>
                  <div style={{flexDirection:'row', display:'flex', justifyContent:'space-between'}}>
                      <p>Price: </p> <p>{item.price}</p>
                  </div>
                  <div style={{flexDirection:'row', display:'flex', justifyContent:'space-between'}}>
                      <p>Length: </p> <p>{item.length}</p>
                  </div>
                  <div style={{flexDirection:'row', display:'flex', justifyContent:'space-between'}}>
                      <p>Car Type: </p> <p>{item.type}</p>
                  </div>
                  <div style={{flexDirection:'row', display:'flex', justifyContent:'space-between'}}>
                      <p>Fuel Type: </p> <p>{item.fuel}</p>
                  </div>
                  <img src={item.image} height={100}/>
                  {!cart.includes(item) ? <button onClick={() => {
                      setCart([...cart, item])
                  }}>
                      Add To Cart
                  </button> :
                      <button onClick={() => {
                          handleRemoveItem(item)
                      }}>
                          Remove From Cart
                      </button>
                  }
              </div>
          ))}
        </div>


        <div>
          <h1>Cart</h1>
          {cart.map((item, index) => (
              <p style={{fontSize:21}}>{item.name}</p>
          ))}
          <p style={{fontSize:22}}>TOTAL PRICE:  ${cartSum()}</p>
        </div>
      </div>
  );
}

export default App;
