const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const seedData = {
  countries: [
    { name: 'México', code: 'MEX', image: 'https://flagcdn.com/mx.svg', description: 'País ubicado en América del Norte', population: 128900000, gdp: 1076000000000, isActive: true },
    { name: 'Brasil', code: 'BRA', image: 'https://flagcdn.com/br.svg', description: 'País más grande de América del Sur', population: 212600000, gdp: 1445000000000, isActive: true },
    { name: 'Argentina', code: 'ARG', image: 'https://flagcdn.com/ar.svg', description: 'País ubicado en el cono sur', population: 45195777, gdp: 383000000000, isActive: true },
    { name: 'Colombia', code: 'COL', image: 'https://flagcdn.com/co.svg', description: 'País con costas en el Pacífico y el Caribe', population: 50882891, gdp: 271000000000, isActive: true },
    { name: 'Chile', code: 'CHL', image: 'https://flagcdn.com/cl.svg', description: 'País largo y angosto de Sudamérica', population: 19458310, gdp: 252000000000, isActive: true },
    { name: 'Perú', code: 'PER', image: 'https://flagcdn.com/pe.svg', description: 'País con rica historia inca', population: 32971854, gdp: 202000000000, isActive: true },
    { name: 'Ecuador', code: 'ECU', image: 'https://flagcdn.com/ec.svg', description: 'País ubicado en la línea ecuatorial', population: 17643054, gdp: 98000000000, isActive: true },
    { name: 'Bolivia', code: 'BOL', image: 'https://flagcdn.com/bo.svg', description: 'País sin salida al mar', population: 11673021, gdp: 40000000000, isActive: true },
    { name: 'Paraguay', code: 'PRY', image: 'https://flagcdn.com/py.svg', description: 'País mediterráneo de Sudamérica', population: 7132538, gdp: 35000000000, isActive: true },
    { name: 'Uruguay', code: 'URY', image: 'https://flagcdn.com/uy.svg', description: 'País entre Argentina y Brasil', population: 3473730, gdp: 53000000000, isActive: true }
  ],
  ideologies: [
    { name: 'Socialismo Democrático', description: 'Busca combinar elementos del socialismo con la democracia', image: 'https://example.com/socialism.png', color: '#FF0000', isActive: true },
    { name: 'Liberalismo Social', description: 'Enfatiza la libertad individual y la justicia social', image: 'https://example.com/liberal.png', color: '#0000FF', isActive: true },
    { name: 'Conservadurismo', description: 'Promueve valores tradicionales y estabilidad', image: 'https://example.com/conservative.png', color: '#00FF00', isActive: true },
    { name: 'Progresismo', description: 'Busca reformas sociales y políticas progresivas', image: 'https://example.com/progressive.png', color: '#FF00FF', isActive: true },
    { name: 'Centrismo', description: 'Busca el equilibrio entre diferentes ideologías', image: 'https://example.com/centrist.png', color: '#FFFF00', isActive: true },
    { name: 'Nacionalismo', description: 'Enfatiza la identidad y soberanía nacional', image: 'https://example.com/nationalist.png', color: '#00FFFF', isActive: true },
    { name: 'Ecologismo', description: 'Prioriza la protección del medio ambiente', image: 'https://example.com/green.png', color: '#008000', isActive: true },
    { name: 'Tecnocracia', description: 'Gobierno basado en expertos técnicos', image: 'https://example.com/technocracy.png', color: '#808080', isActive: true },
    { name: 'Populismo', description: 'Apela directamente a las masas populares', image: 'https://example.com/populist.png', color: '#FFA500', isActive: true },
    { name: 'Desarrollismo', description: 'Enfoca en el desarrollo económico', image: 'https://example.com/development.png', color: '#800080', isActive: true }
  ],
  ranks: [
    { name: 'Ciudadano', description: 'Miembro básico de la sociedad', image: 'https://example.com/citizen.png', permission: ['READ'], level: 1, isActive: true },
    { name: 'Activista', description: 'Participante activo en política', image: 'https://example.com/activist.png', permission: ['READ', 'WRITE'], level: 2, isActive: true },
    { name: 'Concejal', description: 'Representante local', image: 'https://example.com/councilor.png', permission: ['READ', 'WRITE'], level: 3, isActive: true },
    { name: 'Alcalde', description: 'Líder de ciudad', image: 'https://example.com/mayor.png', permission: ['READ', 'WRITE', 'MANAGE'], level: 4, isActive: true },
    { name: 'Gobernador', description: 'Líder regional', image: 'https://example.com/governor.png', permission: ['READ', 'WRITE', 'MANAGE'], level: 5, isActive: true },
    { name: 'Congresista', description: 'Legislador nacional', image: 'https://example.com/congressman.png', permission: ['READ', 'WRITE', 'MANAGE', 'ADMIN'], level: 6, isActive: true },
    { name: 'Ministro', description: 'Líder de ministerio', image: 'https://example.com/minister.png', permission: ['READ', 'WRITE', 'MANAGE', 'ADMIN'], level: 7, isActive: true },
    { name: 'Vicepresidente', description: 'Segundo al mando', image: 'https://example.com/vicepresident.png', permission: ['READ', 'WRITE', 'MANAGE', 'ADMIN'], level: 8, isActive: true },
    { name: 'Presidente', description: 'Líder máximo', image: 'https://example.com/president.png', permission: ['READ', 'WRITE', 'MANAGE', 'ADMIN'], level: 9, isActive: true },
    { name: 'Líder Supremo', description: 'Rango especial de emergencia', image: 'https://example.com/supreme.png', permission: ['READ', 'WRITE', 'MANAGE', 'ADMIN'], level: 10, isActive: true }
  ],
  resources: [
    { name: 'Petróleo', type: 'NATURAL', description: 'Recurso energético fundamental', basePrice: 100.0, isActive: true },
    { name: 'Cobre', type: 'NATURAL', description: 'Metal esencial para la industria', basePrice: 80.0, isActive: true },
    { name: 'Litio', type: 'NATURAL', description: 'Mineral para baterías', basePrice: 150.0, isActive: true },
    { name: 'Soja', type: 'AGRICULTURAL', description: 'Cultivo principal', basePrice: 40.0, isActive: true },
    { name: 'Café', type: 'AGRICULTURAL', description: 'Producto de exportación', basePrice: 60.0, isActive: true },
    { name: 'Software', type: 'TECHNOLOGY', description: 'Desarrollo de aplicaciones', basePrice: 200.0, isActive: true },
    { name: 'Automóviles', type: 'MANUFACTURED', description: 'Industria automotriz', basePrice: 300.0, isActive: true },
    { name: 'Turismo', type: 'SERVICE', description: 'Servicios turísticos', basePrice: 90.0, isActive: true },
    { name: 'Textiles', type: 'MANUFACTURED', description: 'Industria textil', basePrice: 70.0, isActive: true },
    { name: 'Consultoría', type: 'SERVICE', description: 'Servicios profesionales', basePrice: 120.0, isActive: true }
  ]
};

async function main() {
  console.log('🌱 Iniciando sembrado de datos...');

  try {
    // Crear países
    console.log('Creando países...');
    const countries = await Promise.all(
      seedData.countries.map(country =>
        prisma.country.create({ data: country })
      )
    );

    // Crear ideologías
    console.log('Creando ideologías...');
    const ideologies = await Promise.all(
      seedData.ideologies.map(ideology =>
        prisma.ideology.create({ data: ideology })
      )
    );

    // Crear rangos
    console.log('Creando rangos...');
    const ranks = await Promise.all(
      seedData.ranks.map(rank =>
        prisma.rank.create({ data: rank })
      )
    );

    // Crear recursos
    console.log('Creando recursos...');
    const resources = await Promise.all(
      seedData.resources.map(resource =>
        prisma.resource.create({ data: resource })
      )
    );

    // Crear usuarios base
    console.log('Creando usuarios base...');
    const baseUsers = await Promise.all(
      countries.map(async (country, index) => {
        const ideology = ideologies[index % ideologies.length];
        const rank = ranks[index % ranks.length];
        
        return prisma.baseUser.create({
          data: {
            name: `Líder de ${country.name}`,
            image: `https://example.com/leader${index + 1}.png`,
            countryId: country.id,
            ideologyId: ideology.id,
            rankId: rank.id,
            type: 'PLAYER',
            isActive: true,
          }
        });
      })
    );

    // Crear jugadores
    console.log('Creando jugadores...');
    await Promise.all(
      baseUsers.map(user =>
        prisma.player.create({
          data: {
            id: user.id,
            experience: Math.floor(Math.random() * 1000),
            level: Math.floor(Math.random() * 10) + 1,
            balance: Math.random() * 10000
          }
        })
      )
    );

    // Crear economías
    console.log('Creando economías...');
    await Promise.all(
      countries.map(country =>
        prisma.economy.create({
          data: {
            countryId: country.id,
            treasury: Math.random() * 1000000,
            gdpGrowth: Math.random() * 10,
            inflation: Math.random() * 15,
            unemployment: Math.random() * 20,
            debt: Math.random() * 2000000,
            creditRating: ['AAA', 'AA', 'A', 'BBB', 'BB', 'B'][Math.floor(Math.random() * 6)]
          }
        })
      )
    );

    console.log('✅ Sembrado completado exitosamente!');
  } catch (error) {
    console.error('❌ Error durante el sembrado:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
