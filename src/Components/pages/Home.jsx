import { useSelector } from "react-redux";
import Banner from "../../assets/banner.png";
import Products from "./Products";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { category } = useSelector((state) => state.data);
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.data);
  return (
    <div>
      {/* Banner Section */}
      <section className="w-full mb-10 ">
        <img
          src={Banner}
          alt="Banner"
          className="w-full h-[300px] object-cover  shadow-md"
        />
      </section>

      {/* Categories Section */}
      <section className="px-6 mb-12">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">
          Categories
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 ">
          {category.map((Category) => (
            <div
              onClick={() => navigate(`/category/${Category._id}`)}
              key={Category._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 cursor-pointer p-2 text-center"
            >
              <img
                src={Category.image[0]}
                alt={Category.name}
                className="w-full h-24 object-cover rounded-md mb-2"
              />
              <p className="text-sm font-medium text-gray-700">
                {Category.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="px-6 mb-10">
        <h3 className="text-3xl font-semibold mb-6 text-gray-800">Products</h3>
        <Products products={products} />
      </section>
    </div>
  );
};

export default Home;
