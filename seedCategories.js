// seedCategories.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

async function seedCategories() {
  try {
    await mongoose.connect(MONGO_URI);

    const categories = ['Panel', 'Battery', 'Inverter'];

    for (const name of categories) {
      const exists = await Category.findOne({ name });
      if (!exists) {
        await Category.create({ name });
        console.log(`✅ Category added: ${name}`);
      } else {
        console.log(`ℹ️ Category already exists: ${name}`);
      }
    }

    process.exit();
  } catch (err) {
    console.error('❌ Error seeding categories:', err);
    process.exit(1);
  }
}

seedCategories();
