import { useState } from "react";
import EmptyStage from "./components/EmptyStage";
import ProductCard from "./components/ProductCard";
import data from "./data/data.json";
import CartItems from "./components/CartItems";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

function App() {
  const [selectedProductArr, setSelectedProductArr] = useState([]);

  const handleAddToCart = (newProduct) => {
    setSelectedProductArr((prevProduct) => [
      ...prevProduct,
      { ...newProduct, quantity: 1, id: Math.random() },
    ]);

    toast.success("Item added successfully!");
  };

  const productIncrement = (product) => {
    const productItem = selectedProductArr.find(
      (item) => item.name === product.name
    );
    if (!productItem) return;
    const updatedProductArr = selectedProductArr.map((item) =>
      item.name === product.name
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setSelectedProductArr(updatedProductArr);
  };

  const productDecrement = (product) => {
    const productItem = selectedProductArr.find(
      (item) => item.name === product.name
    );

    if (!productItem) return;

    if (productItem.quantity <= 1) {
      Swal.fire({
        title: "Are you sure to delete?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          const updatedProductArr = selectedProductArr.filter(
            (item) => item.name !== product.name
          );

          toast.success("Item removed successfully!");
          setSelectedProductArr(updatedProductArr);
        }
      });
    } else {
      const updatedProductArr = selectedProductArr.map((item) =>
        item.name === product.name
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

      setSelectedProductArr(updatedProductArr);
    }
  };

  const handleRemove = (product) => {
    Swal.fire({
      title: `Are you sure you want to remove?`,

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setSelectedProductArr(
          selectedProductArr.filter((item) => item.name !== product.name)
        );
      }
    });
  };

  const resetCart = () => setSelectedProductArr([]);

  const totalQuantity = selectedProductArr.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);

  return (
    <main className="p-5 sm:p-10 lg:p-16 font-defaultFont">
      <h1 className="text-3xl md:text-5xl font-bold mb-3  md:mb-5 sticky md:relative top-3 p-4 z-50 backdrop-blur-2xl ">
        Desserts
      </h1>
      <section className="flex flex-col md:grid grid-cols-12 gap-5">
        <div className="md:col-span-8 lg:col-span-8 grid grid-cols-1 sm:grid-cols-3  md:grid-cols-2 lg:grid-cols-3 gap-3">
          {data.map((product, index) => (
            <ProductCard
              key={product.name}
              imgSrc={product.image.desktop}
              onClick={() => handleAddToCart(data[index])}
              addedProduct={selectedProductArr}
              onIncrease={() => productIncrement(product)}
              onDecrease={() => productDecrement(product)}
              {...product}
            />
          ))}
        </div>
        <div className="md:col-span-4 lg:col-span-4 border-l md:border-l-rose-900 md:pl-5 ">
          <h2 className="font-bold text-red text-2xl mb-5">
            Your Cart ({totalQuantity})
          </h2>
          {selectedProductArr.length === 0 && <EmptyStage />}
          {selectedProductArr.length > 0 && (
            <CartItems
              selectedProducts={selectedProductArr}
              onRemove={handleRemove}
              resetCart={resetCart}
            />
          )}
        </div>
      </section>
      <Toaster />
    </main>
  );
}

export default App;
