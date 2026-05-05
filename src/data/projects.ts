export interface Project {
  id: string;
  title: string;
  type: string;
  location: string;
  lat: number;
  lng: number;
  description: string;
  image: string;
  scale: string;
  logic: string;
  ref: string;
}

export const projects: Project[] = [
  {
    id: '01',
    title: 'The Glass Pavilion',
    type: 'Residential',
    location: 'Pacific Northwest, USA',
    lat: 45.523062,
    lng: -122.676482,
    description: 'A structural dialogue between density and transparency. Deep-poured concrete forms provide thermal mass, while expansive glass apertures invite the forest into the domestic sphere.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop',
    scale: '3,200 SQ FT',
    logic: 'Monolithic / Fluid',
    ref: 'RES_01'
  },
  {
    id: '02',
    title: 'Vertical Metabolism',
    type: 'Commercial',
    location: 'New York, USA',
    lat: 40.7128,
    lng: -74.0060,
    description: 'A skyscraper that functions as a living organism. Vertical gardens act as air filtration lungs for the urban core.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop',
    scale: '85 Floors',
    logic: 'Organic / Vertical',
    ref: 'COMM_778'
  },
  {
    id: '03',
    title: 'Zenith Wellness Center',
    type: 'Healthcare',
    location: 'London, UK',
    lat: 51.5074,
    lng: -0.1278,
    description: 'Architecture as a therapeutic instrument. We utilized local cedar laths and rhythmic courtyard spacing to lower patient cortisol levels through visual harmony.',
    image: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb65?q=80&w=2000&auto=format&fit=crop',
    scale: '12,500 SQ FT',
    logic: 'Biophilic / Cedar',
    ref: 'HEALTH_03'
  },
  {
    id: '04',
    title: 'Azure Marine Lab',
    type: 'Research',
    location: 'Great Barrier Reef, Australia',
    lat: -18.2871,
    lng: 147.6992,
    description: 'A semi-submerged research facility designed to monitor coral health. The structure uses self-healing concrete and mimics the fluid dynamics of ocean currents.',
    image: 'https://images.unsplash.com/photo-1500313830540-7b6650a74fd0?q=80&w=2000&auto=format&fit=crop',
    scale: '5,000 SQ FT',
    logic: 'Hydrodynamic',
    ref: 'RES_LAB_04'
  },
  {
    id: '05',
    title: 'Desert Echo',
    type: 'Cultural',
    location: 'Al-Ula, Saudi Arabia',
    lat: 26.6167,
    lng: 37.9167,
    description: 'A subterranean museum carved into sandstone cliffs. The design utilizes passive cooling through ancient "wind catcher" technology re-imagined for the 21st century.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000&auto=format&fit=crop',
    scale: '22,000 SQ FT',
    logic: 'Subterranean / Passive',
    ref: 'CULT_DES_05'
  }
];
