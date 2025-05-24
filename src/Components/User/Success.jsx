import React from "react";

const Success = () => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Order Placed Successfully
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Your Order has been placed successfully
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Success;
