import React, { useEffect, useState, type ChangeEvent } from "react";
import Button from "../../../components/common/Button";
import type { SellerData } from "../../seller/responses/SellerData";
import type { AddMotorcycleResponseModel } from "../responses/AddMotorcycleResponseModel";
import { addMotorcycle } from "../../api/Api";

    const FormGroup = ({
      label,
      children,
      className = "",
    }: {
      label: string;
      children: React.ReactNode;
      className?: string;
    }) => (
      <div className={`flex flex-col ${className}`}>
        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">
          {label}
        </label>
        {children}
      </div>
    );

    const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
      <input
        {...props}
        className="border border-gray-300 rounded-sm p-3 w-full text-sm text-gray-800 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
      />
    );

const AddBike : React.FC = () => {

  const [motorcycleName , setMotorcycleName] = useState("");
  const [manufacturer, setManufacturerName] = useState("");
  const [model, setModel] = useState("");

  const [cc, setCc] = useState("");
  const [bhp, setBhp] = useState("");
  const [torque, setTorque] = useState("");
  const [price, setPrice] = useState("");

  const [desc, setDescription] = useState("");

  const [sellerData, setSellerData] = useState<SellerData | null>(null);
  const [token, setToken] = useState("");

  const [quantity, setQuantity] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const rawData = localStorage.getItem("data");
    const data: SellerData | null = rawData
      ? (JSON.parse(rawData) as SellerData)
      : null;

    console.log(token);

    console.log(rawData)

    console.log(data);
    console.log(data?.sellerName);
    console.log(data?.sellerId);

    if (rawData) {
      setSellerData(data);
    }

    if(token) {
      setToken(token);
    }
  }, []);

  const handleAddUrl = () => {
    if(currentUrl.trim() !== "") {
      setImageUrls([...imageUrls, currentUrl.trim()]);
      setCurrentUrl("");
    }
  };

  const removeUrl = (index : number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const handleMotorcycleNameChange = (event : ChangeEvent<HTMLInputElement>) => {
    setMotorcycleName(event.target.value);
  }

  const handleManufacturerChange = (event : ChangeEvent<HTMLInputElement>) => {
    setManufacturerName(event.target.value);
  }

  const handleModelChange = (event : ChangeEvent<HTMLInputElement>) => {
    setModel(event.target.value);
  }

  const handleCcChange = (event : ChangeEvent<HTMLInputElement>) => {
    setCc(event.target.value);
  }

  const handleBhpChange = (event : ChangeEvent<HTMLInputElement>) => {
    setBhp(event.target.value);
  }

  const handleTorqueChange = (event : ChangeEvent<HTMLInputElement>) => {
    setTorque(event.target.value);
  }

  const handlePriceChange = (event : ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  }

  const handleDescChange = (event : ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  }

  const handleQuantityChange = (event : ChangeEvent<HTMLInputElement>) => {
    setQuantity(event.target.value);
  }

  const handleAddMotorcycle = async () => {

    const payload = {
      motorcycleName: motorcycleName,
      manufacturer: manufacturer,
      model: model,
      cc: parseFloat(cc),
      bhp: parseFloat(bhp),
      torque: parseFloat(torque),
      price: parseFloat(price),
      desc: desc,
      sellerId: sellerData ? sellerData.sellerId : "",
      stockQuantity : parseInt(quantity),
      imageUrls : imageUrls
    };

    try {
      console.log(`payload ${JSON.stringify(payload)}`);
      const response: AddMotorcycleResponseModel = await addMotorcycle(
        token,
        payload,
      );
      if (response.success) {
        alert(response.message);
        setMotorcycleName("");
        setManufacturerName("");
        setModel("");
        setCc("");
        setBhp("");
        setTorque("");
        setPrice("");
        setDescription("");
        setQuantity("");
        imageUrls.length = 0;
      } else {
        alert(response.message);
      }
    } catch (error: any) {
      alert(error.message);
    }
  }

    return (
      <div className="flex h-screen bg-[#f9f9f9] font-sans selection:bg-black selection:text-white w-full">
        {/* Main Content */}
        <main className="flex-1 flex flex-col h-full overflow-y-auto relative w-full">
          {/* Form Area */}
          <div className="p-10 max-w-5xl relative">
            {/* Background Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden opacity-50">
              <span className="text-[350px] font-black italic text-gray-100 tracking-tighter select-none">
                TRTL
              </span>
            </div>

            <div className="relative z-10">
              {/* Page Title & Steps */}
              <div className="flex justify-between items-end mb-16">
                <div>
                  {/* <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                    Inventory Management
                  </p> */}
                  <h2 className="text-4xl space-grotesk-fontTheme font-black tracking-tight text-gray-900">
                    Add New Motorcycle
                  </h2>
                </div>
                {/* <div className="text-right">
                  <p className="text-sm text-gray-400 mb-2">Step 01 / 03</p>
                  <div className="flex gap-1 h-1 w-24 bg-gray-200">
                    <div className="w-1/3 bg-black"></div>
                  </div>
                </div> */}
              </div>

              {/* Section: Primary Identity */}
              <section className="grid grid-cols-1 md:grid-cols-12 gap-8 py-10 border-b border-gray-200">
                <div className="md:col-span-4 pr-4">
                  <h3 className="text-xl space-grotesk-fontTheme font-bold text-gray-900 mb-2">
                    Primary Identity
                  </h3>
                  <p className="text-sm text-gray-500 space-grotesk-fontTheme leading-relaxed">
                    Define the primary branding and identification for this
                    unit. Ensure the name matches official manufacturer records.
                  </p>
                </div>
                <div className="md:col-span-8 flex flex-col space-grotesk-fontTheme gap-6">
                  <FormGroup label="Motorcycle Name">
                    <Input
                      placeholder="e.g. Street Triple RS"
                      value={motorcycleName}
                      onChange={handleMotorcycleNameChange}
                    />
                  </FormGroup>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormGroup label="Manufacturer">
                      <Input
                        placeholder="Triumph"
                        value={manufacturer}
                        onChange={handleManufacturerChange}
                      />
                    </FormGroup>
                    <FormGroup label="Model Year">
                      <Input
                        type="number"
                        placeholder="2024"
                        value={model}
                        onChange={handleModelChange}
                      />
                    </FormGroup>
                  </div>
                </div>
              </section>

              {/* Section: Engine & Specs */}
              <section className="grid grid-cols-1 md:grid-cols-12 gap-8 py-10 space-grotesk-fontTheme border-b border-gray-200">
                <div className="md:col-span-4 pr-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Engine & Specs
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Enter technical telemetry. These metrics will be displayed
                    in the precision comparison tool on the consumer portal.
                  </p>
                </div>
                <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
                  <FormGroup label="Engine Capacity (CC)">
                    <Input
                      placeholder="765"
                      type="number"
                      value={cc}
                      onChange={handleCcChange}
                    />
                  </FormGroup>
                  <FormGroup label="BHP">
                    <Input
                      placeholder="128"
                      type="number"
                      value={bhp}
                      onChange={handleBhpChange}
                    />
                  </FormGroup>
                  <FormGroup label="Torque (NM)">
                    <Input
                      placeholder="80"
                      type="number"
                      value={torque}
                      onChange={handleTorqueChange}
                    />
                  </FormGroup>
                  <FormGroup label="Price (INR)">
                    <Input
                      placeholder="₹1000000"
                      type="number"
                      value={price}
                      onChange={handlePriceChange}
                    />
                  </FormGroup>
                </div>
              </section>

              {/* Section: Store & Narrative */}
              <section className="grid grid-cols-1 md:grid-cols-12 space-grotesk-fontTheme gap-8 py-10">
                <div className="md:col-span-4 pr-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Qunatity & Description
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Enter the quantity and provide a premium editorial
                    description for the listing.
                  </p>
                </div>
                <div className="md:col-span-8 flex flex-col gap-6">
                  <FormGroup label="Quantity">
                    <Input
                      placeholder="Enter quantity"
                      type="number"
                      value={quantity}
                      onChange={handleQuantityChange}
                    />
                  </FormGroup>
                  <FormGroup label="Description">
                    <textarea
                      value={desc}
                      onChange={handleDescChange}
                      placeholder="Describe the machine's character, history, and modifications..."
                      className="border border-gray-300 rounded-sm p-3 w-full text-sm text-gray-800 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors min-h-[120px] resize-y"
                    />
                  </FormGroup>
                </div>
              </section>

              {/* Section: Media & Images */}
              <section className="grid grid-cols-1 md:grid-cols-12 space-grotesk-fontTheme gap-8 py-10">
                <div className="md:col-span-4 pr-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Media & Images
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Provide high-quality image URLs to visually showcase the
                    motorcycle on the storefront.
                  </p>
                </div>
                <div className="md:col-span-8 flex flex-col gap-6">
                  <FormGroup label="Image URL">
                    <div className="flex gap-4 items-center">
                      <Input
                        placeholder="https://example.com/image.jpg"
                        type="text"
                        value={currentUrl}
                        onChange={(e) => setCurrentUrl(e.target.value)}
                        onKeyDown={(e) => {
                          // Allow pressing Enter to add the URL quickly
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddUrl();
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleAddUrl}
                        className="bg-black text-white px-6 py-3 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors h-[46px]"
                      >
                        Add
                      </button>
                    </div>
                  </FormGroup>

                  {/* List of Added URLs */}
                  {imageUrls.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                        Added Images
                      </label>
                      <ul className="space-y-2">
                        {imageUrls.map((url, index) => (
                          <li
                            key={index}
                            className="flex items-center justify-between bg-white border border-gray-200 p-3 rounded-sm shadow-sm"
                          >
                            <span className="text-sm text-gray-700 truncate mr-4">
                              {url}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeUrl(index)}
                              className="text-xs font-bold text-red-500 uppercase tracking-widest hover:text-red-700 transition-colors shrink-0"
                            >
                              Delete
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>

              {/* Footer Actions */}
              <div className="flex justify-end items-center gap-8 mt-12 mb-20 space-grotesk-fontTheme">
                <button className="text-xs font-bold text-gray-500 uppercase tracking-widest hover:text-black transition-colors">
                  Cancel
                </button>

                {/* Using the provided Button component here */}
                <Button text="Submit Bike" onClick={handleAddMotorcycle} />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
}

export default AddBike;