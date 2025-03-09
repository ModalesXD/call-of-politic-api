import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seed() {
  // Crear los países específicos
  const countries = [
    await prisma.country.create({
      data: {
        name: 'Guatemala',
        code: 'GT',
        population: faker.number.int(10000000),
        gdp: faker.number.float({ min: 100000, max: 1000000 }),
        description: faker.lorem.sentence(10), // Limitar longitud de la descripción
      },
    }),
    await prisma.country.create({
      data: {
        name: 'Honduras',
        code: 'HN',
        population: faker.number.int(10000000),
        gdp: faker.number.float({ min: 100000, max: 1000000 }),
        description: faker.lorem.sentence(10), // Limitar longitud de la descripción
      },
    }),
  ];

  // Crear un rango de presidente
  const ranks = [
    await prisma.rank.create({
      data: {
        name: 'Presidente',
        description: 'El máximo rango de autoridad en el país.',
        permission: ['read', 'write', 'execute'],
        level: 10,
      },
    }),
  ];

  // Crear las ideologías
  const ideologies = [
    await prisma.ideology.create({
      data: {
        name: 'Liberalismo',
        description: 'Una ideología política que promueve la libertad individual.',
        color: faker.internet.color(),
      },
    }),
    await prisma.ideology.create({
      data: {
        name: 'Socialismo',
        description: 'Una ideología política que promueve la igualdad social.',
        color: faker.internet.color(),
      },
    }),
  ];

  // Crear los usuarios base (ModalesXD y Screed)
  const baseUsers = [
    await prisma.baseUser.create({
      data: {
        name: 'ModalesXD',
        image: faker.image.avatar(),
        countryId: countries[0].id,  // Guatemala
        ideologyId: ideologies[0].id, // Liberalismo
        rankId: ranks[0].id, // Presidente
        type: 'ADMIN',  // Asignar como admin
      },
    }),
    await prisma.baseUser.create({
      data: {
        name: 'Screed',
        image: faker.image.avatar(),
        countryId: countries[1].id,  // Honduras
        ideologyId: ideologies[1].id, // Socialismo
        rankId: ranks[0].id, // Presidente
        type: 'ADMIN',  // Asignar como admin
      },
    }),
  ];

  // Crear jugadores o NPCs (opcional)


  console.log('Database seeded successfully');
}

seed()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
