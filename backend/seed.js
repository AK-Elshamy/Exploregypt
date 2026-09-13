const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./src/config/db");
const City = require("./src/models/City");
const Place = require("./src/models/Place");

dotenv.config();

const citiesData = [
  {
    name: "Cairo",
    description:
      "Egypt's capital, home to the Pyramids, museums, historic mosques, and vibrant markets.",
    image:
      "https://images.unsplash.com/photo-1719659018185-8a239c35fb4a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2Fpcm98ZW58MHx8MHx8fDA%3D",
    region: "Greater Cairo",
  },

  {
    name: "Luxor",
    description:
      "The world's greatest open-air museum, filled with ancient temples and royal tombs.",
    image:
      "https://plus.unsplash.com/premium_photo-1728561809541-1620be0f4004?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bHV4b3J8ZW58MHx8MHx8fDA%3D",
    region: "Upper Egypt",
  },

  {
    name: "Aswan",
    description:
      "A beautiful Nile city known for its islands, temples, Nubian culture, and peaceful scenery.",
    image:
      "https://images.unsplash.com/photo-1655755001673-0d6ef8b25496?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXN3YW58ZW58MHx8MHx8fDA%3D",
    region: "Upper Egypt",
  },

  {
    name: "Hurghada",
    description:
      "A Red Sea destination famous for beaches, coral reefs, diving, and water activities.",
    image:
      "https://images.unsplash.com/photo-1722264219947-725d4e20ef23?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVyZ2hhZGF8ZW58MHx8MHx8fDA%3D",
    region: "Red Sea",
  },

  {
    name: "Sharm El-Sheikh",
    description:
      "A Red Sea resort city known for clear water, coral reefs, beaches, and diving.",
    image:
      "https://images.unsplash.com/photo-1665643956022-ee053e925743?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2hhcm0lMjBlbCUyMHNoZWlraHxlbnwwfHwwfHx8MA%3D%3D",
    region: "South Sinai",
  },

  {
    name: "Dahab",
    description:
      "A relaxed Sinai town famous for diving, snorkeling, the Blue Hole, and its laid-back atmosphere.",
    image:
      "https://images.unsplash.com/photo-1628231839904-410330926ba2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZGFoYWJ8ZW58MHx8MHx8fDA%3D",
    region: "South Sinai",
  },
];

const placesData = [
  {
    name: "Qasr ElKbabgi",
    city: "Cairo",
    category: "Restaurant",
    description:
      "A popular Egyptian restaurant serving traditional grilled meats and authentic Egyptian dishes.",
    image:
      "https://elkbabgi.com/assets/zayed-DdPnjuxS.jpg",
  },

  {
    name: "Abo Tark",
    city: "Cairo",
    category: "Restaurant",
    description:
      "A popular Egyptian restaurant known for traditional Egyptian food and local dishes.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrThkckCIU-JeBKks2CPHuhEWRz6HlQqNQtqEtEn-oXppKECfGUkftL4c&s=10",
  },

  {
    name: "Four Seasons Hotel Cairo at Nile Plaza",
    city: "Cairo",
    category: "Hotel",
    description:
      "A luxury hotel overlooking the Nile in central Cairo, offering premium accommodation and services.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWo5SBfsa8fIs2qATHNUFU5j1GBsxg0jQ8XYywvFj2Jg&s=10",
  },

  {
    name: "Marriott Mena House",
    city: "Cairo",
    category: "Hotel",
    description:
      "A historic luxury hotel in Cairo famous for its views of the Pyramids.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ86GGxYE4v2aU9gdRhnDTrH5icFOCGAkHlJzKrhSYQew&s=10",
  },

  {
    name: "City Stars Mall",
    city: "Cairo",
    category: "Shopping",
    description:
      "One of Cairo's largest shopping and entertainment destinations with many stores, restaurants, and activities.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZyZWvAR8WX0zn7mnFni0poYXZCTYrUWbhJSbRq5yWSQ&s=10",
  },

  {
    name: "Mall of Egypt",
    city: "Cairo",
    category: "Shopping",
    description:
      "A major shopping and entertainment mall in Cairo featuring international brands, restaurants, and entertainment.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwfzTv8GlpL1uOOTQQeiABSMFy0JlZ2HX4xjMpLXXcUQ&s=10",
  },

  {
    name: "Naama Bay",
    city: "Sharm El-Sheikh",
    category: "Beach",
    description:
      "A famous Red Sea destination known for its beaches, clear water, restaurants, and nightlife.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4D9-YsnevVBZFSAQSG2gmHQDZ58UVBIofSXoAEmcN5A&s=10",
  },

  {
    name: "Mahmya Beach",
    city: "Hurghada",
    category: "Beach",
    description:
      "A beautiful Red Sea beach known for clear turquoise water, white sand, and relaxing surroundings.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShuDkuJfla15Z-bdwK3WUdzUA7Y98kK2UmjKa9o84i2g&s=10",
  },
];

async function seed() {
  try {
    await connectDB();

    const cityMap = new Map();

    // =========================
    // Seed Cities
    // =========================

    for (const cityData of citiesData) {
      const city = await City.findOneAndUpdate(
        { name: cityData.name },
        cityData,
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        }
      );

      cityMap.set(city.name, city._id);
    }

    // =========================
    // Remove old places
    // Keep only the new places
    // =========================

    const placeNames = placesData.map((place) => place.name);

    await Place.deleteMany({
      name: { $nin: placeNames },
    });

    // =========================
    // Seed Places
    // =========================

    for (const placeData of placesData) {
      const cityId = cityMap.get(placeData.city);

      if (!cityId) {
        console.log(`City not found: ${placeData.city}`);
        continue;
      }

      await Place.findOneAndUpdate(
        {
          name: placeData.name,
          city: cityId,
        },
        {
          name: placeData.name,
          description: placeData.description,
          city: cityId,
          category: placeData.category,
          image: placeData.image,
          location: placeData.city,
          rating: 4.7,
          openingHours: "Daily 9:00 AM - 5:00 PM",
          ticketPrice: "Varies",
        },
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        }
      );
    }

    console.log(
      `Seed complete: ${citiesData.length} cities, ${placesData.length} places.`
    );

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

seed();