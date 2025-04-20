import { useState } from "react";
import Navbar from "../components/navbar";
import webdevelopment from "../assets/webdevelopment.svg";
import design from "../assets/design.svg";
import redeem from "../assets/redeem.svg";
import food from "../assets/food.svg";
import school from "../assets/school.svg";

const services = [
  { title: "Web Development", description: "Build modern websites.", image: webdevelopment },
  { title: "Graphic Design", description: "Design eye-catching visuals.", image: design },
  { title: "Tutoring", description: "Get help in any subject.", image: school },
  { title: "Cooking", description: "Eat delicious meals from around the world.", image: food },
];

function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Search Bar */}
      <div className="max-w-3xl mx-auto mt-10 px-4">
        <input type="text" placeholder="Search for services..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* Services */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-10 px-4">
        {filteredServices.length > 0 ? (
          filteredServices.map((service, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-200 text-center">
              <img src={service.image} alt={service.title} className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
              <p className="text-gray-600 mt-2">{service.description}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No services found.</p>
        )}
      </div>
    </div>
  );
}

export default ServicesPage;
