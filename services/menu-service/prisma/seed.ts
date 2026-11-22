// Seeds menu-service with demo data. Safe to re-run: it wipes the menu tables first.
// Stall names are fictional; prices are typical hawker prices in SGD cents.
import { createDb } from '../src/db.js';

const HAWKER_CENTRE = 'Maxwell Food Centre';

const stalls = [
  {
    name: 'Ah Kow Hainanese Chicken Rice',
    stallNumber: '#01-05',
    cuisine: 'Chicken Rice',
    avgPrepMinutes: 5,
    dishes: [
      {
        name: 'Steamed Chicken Rice',
        description: 'Poached chicken, fragrant rice, chilli and ginger',
        priceCents: 550,
      },
      {
        name: 'Roasted Chicken Rice',
        description: 'Crispy-skin roasted chicken with rice',
        priceCents: 550,
      },
      { name: 'Half Chicken', description: 'Steamed or roasted, serves 2-3', priceCents: 1800 },
      {
        name: 'Oyster Sauce Kailan',
        description: 'Blanched kailan with oyster sauce',
        priceCents: 500,
      },
    ],
  },
  {
    name: 'Lim Brothers Char Kway Teow',
    stallNumber: '#01-17',
    cuisine: 'Char Kway Teow',
    avgPrepMinutes: 10,
    dishes: [
      {
        name: 'Char Kway Teow (Small)',
        description: 'Wok-fried flat rice noodles with cockles and lap cheong',
        priceCents: 500,
      },
      {
        name: 'Char Kway Teow (Large)',
        description: 'Wok-fried flat rice noodles with cockles and lap cheong',
        priceCents: 700,
      },
      {
        name: 'Fried Carrot Cake (Black)',
        description: 'Radish cake fried with sweet dark sauce',
        priceCents: 450,
      },
    ],
  },
  {
    name: 'Katong Corner Laksa',
    stallNumber: '#01-42',
    cuisine: 'Laksa',
    avgPrepMinutes: 7,
    dishes: [
      {
        name: 'Laksa',
        description: 'Spicy coconut curry broth, thick bee hoon, prawns, cockles',
        priceCents: 600,
      },
      { name: 'Laksa (Large)', description: 'Bigger bowl with extra prawns', priceCents: 800 },
      { name: 'Mee Siam', description: 'Rice vermicelli in tangy tamarind gravy', priceCents: 500 },
      { name: 'Otah (2 pcs)', description: 'Grilled spiced fish cake', priceCents: 300 },
    ],
  },
  {
    name: 'Kopi Kaki Drinks',
    stallNumber: '#01-88',
    cuisine: 'Drinks',
    avgPrepMinutes: 2,
    dishes: [
      { name: 'Kopi', description: 'Coffee with condensed milk', priceCents: 150 },
      { name: 'Teh Peng', description: 'Iced milk tea', priceCents: 200 },
      { name: 'Milo Dinosaur', description: 'Iced Milo topped with Milo powder', priceCents: 350 },
      {
        name: 'Fresh Sugarcane Juice',
        description: 'Freshly pressed, served cold',
        priceCents: 250,
      },
      { name: 'Lime Juice', description: 'Calamansi lime with sour plum', priceCents: 200 },
    ],
  },
];

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error('DATABASE_URL is not set');

const db = createDb(databaseUrl);

try {
  await db.$transaction(async (tx) => {
    await tx.dish.deleteMany();
    await tx.stall.deleteMany();

    for (const { dishes, ...stall } of stalls) {
      await tx.stall.create({
        data: { ...stall, hawkerCentre: HAWKER_CENTRE, dishes: { create: dishes } },
      });
    }
  });

  const [stallCount, dishCount] = await Promise.all([db.stall.count(), db.dish.count()]);
  console.log(`Seeded ${stallCount} stalls and ${dishCount} dishes at ${HAWKER_CENTRE}.`);
} finally {
  await db.$disconnect();
}
