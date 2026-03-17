import type React from "react";
import { useState } from "react";

import Button from "../../components/common/Button"
import InputTextField from "../../components/common/InputTextField";
import AddBikeTitle from "./components/AddBikeTitle.tsx";


const AddBike: React.FC = () => {

    const [form, setForm] = useState({
      bikeName: "",
      brand: "",
      cc: 0.0,
      torque: 0.0,
      bhp: 0.0,
      price: 0.0,
      desc: "",
      imageUrl: null as File | null,
    });

    const handleChange = (field : string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [field]: e.target.value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setForm({ ...form, imageUrl: e.target.files[0] });
      }
    };

    const handleSubmit = async () => {
      if (!form.imageUrl) {
        alert("Please upload an image first.");
        return;
      }

      // 2. Prepare the data object (matches your Java Entity)
      // Note: Ensure field names match EXACTLY with your Spring Boot Entity class
      const bikePayload = {
        bikeName: form.bikeName,
        brand: form.brand, // Remove if your Bike Entity doesn't have a 'brand' field
        cc: Number(form.cc),
        torque: Number(form.torque),
        bhp: Number(form.bhp),
        price: Number(form.price),
        description: form.desc,
        sellerId: "SELLER-123", // You should get this from your logged-in user state/context
      };

      try {
        //await addBike(bikePayload, form.imageUrl);
        alert("Bike added successfully!");

      } catch (error) {
        console.error("Upload failed", error);
        alert("Failed to add bike. Check console for details.");
      }
    };

    return (
      <div className="min-h-screen flex flex-col items-center justify-center  p-6">
        <AddBikeTitle />
        <div className=" p-8 rounded-xl shadow-xl w-full max-w-lg space-y-4 mt-2">
          <InputTextField
            label="Bike Name"
            inputType="text"
            placeholder="Enter bike name"
            value={form.bikeName}
            onChange={handleChange("bikeName")}
          />

          <InputTextField
            label="Brand"
            inputType="text"
            placeholder="Enter brand name"
            value={form.brand}
            onChange={handleChange("brand")}
          />

          <InputTextField
            label="CC"
            inputType="number"
            placeholder="Enter CC"
            value={form.cc.toString()}
            onChange={handleChange("cc")}
          />

          <InputTextField
            label="Torque"
            inputType="number"
            placeholder="Enter torque"
            value={form.torque.toString()}
            onChange={handleChange("torque")}
          />

          <InputTextField
            label="BHP"
            inputType="number"
            placeholder="Enter BHP"
            value={form.bhp.toString()}
            onChange={handleChange("bhp")}
          />

          <InputTextField
            label="Price"
            inputType="number"
            placeholder="Enter price"
            value={form.price.toString()}
            onChange={handleChange("price")}
          />

          <InputTextField
            label="Description"
            inputType="text"
            placeholder="Enter description"
            value={form.desc}
            onChange={handleChange("desc")}
          />

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-600
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                         file:text-sm file:font-semibold
                         file:bg-blue-50 file:text-blue-600
                         hover:file:bg-blue-100"
            />
          </div>

          <div className="flex justify-center pt-3">
            <Button text="Add Bike" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    );

}

export default AddBike;