import logo from "./logo.svg";
import "./App.css";
import Category from "./Category";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  let [finalCategory, setFinalCategory] = useState([]);
  let [finalPro, setFinalPro] = useState([]);
  let [catname, setCatName] = useState("");
  let getCategory = () => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((res) => res.data)
      .then((finalRes) => {
        //console.log(finalRes);
        setFinalCategory(finalRes);
      });
  };

  let getProducts = () => {
    axios
      .get("https://dummyjson.com/products")
      .then((proRes) => proRes.data)
      .then((finalRes) => {
        //console.log(finalRes);
        setFinalPro(finalRes.products);
      });
  };

  let Pitems = finalPro.map((products, index) => {
    return <ProductItems key={index} pdata={products} />;
  });

  useEffect(() => {
    getCategory();
    getProducts();
  }, []);

  useEffect(() => {
    if (catname !== "") {
      axios
        .get(`https://dummyjson.com/products/category/${catname}`)
        .then((proRes) => proRes.data)
        .then((finalRes) => {
          //console.log(finalRes);
          setFinalPro(finalRes.products);
        });
    }
  }, [catname]);

  return (
    <>
      <div className="py-[40px]">
        <div className="max-w-[1320px] mx-auto">
          <h1 className="text-center text-[40px] font-bold mb-[30px]">
            Our Products
          </h1>
          <div className="grid grid-cols-[30%_auto] gap-[20px]">
            <div>
              <Category finalCategory={finalCategory} setCatName={setCatName} />
            </div>

            <div>
              <div className="grid grid-cols-3 gap-5">
                {finalPro.length > 1 ? Pitems : "No Itmes found"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

function ProductItems({ pdata }) {
  return (
    <div className="shadow-lg cursor-pointer text-center pb-4 ">
      <img
        src={pdata.thumbnail}
        className="w-[100%] h-[190px] cursor-pointer"
      />
      <h4>{pdata.title}</h4>
      <b>${pdata.price}</b>
    </div>
  );
}
