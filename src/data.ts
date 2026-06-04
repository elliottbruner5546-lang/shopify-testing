import { Product } from './types';
// @ts-ignore
import airpodsMasterCopyImg from './assets/images/airpods2_master_copy_1780573474822.png';

export const productsData: Product[] = [
  {
    id: 'samsung-s25-ultra',
    name: 'Samsung Galaxy S25 Ultra',
    brand: 'Samsung',
    category: 'phones',
    price: 329999,
    originalPrice: 359999,
    rating: 4.9,
    reviewsCount: 48,
    badge: 'HOT',
    emoji: '📱',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=800'
    ],
    gradientFrom: 'from-blue-600',
    gradientTo: 'to-indigo-900',
    description: 'The ultimate Android experience. Featuring a titanium frame, built-in S Pen, and groundbreaking Galaxy AI features. Capture unparalleled details with the 200MP quad-camera array and enjoy peak mobile performance with the custom Snapdragon 8 Gen 4 processor.',
    specs: {
      display: '6.8" Dynamic AMOLED 2X, QHD+, 120Hz, Gorilla Glass Armor',
      processor: 'Snapdragon 8 Gen 4 for Galaxy (3nm)',
      ram: '12GB LPDDR5X',
      storage: '256GB UFS 4.0',
      battery: '5000 mAh with 45W Wired Super Fast Charging 2.0',
      camera: '200MP Main + 50MP Periscope + 12MP Ultra-wide + 10MP Telephoto'
    },
    reviews: [
      {
        id: 'rev-s1',
        name: 'Hamza Tariq',
        city: 'Lahore',
        rating: 5,
        text: 'Bhai kamal phone hai! S25 Ultra ka display outclass hai, aur battery timing bohot zabardast hai. original sealed box packing mili aur TechZone.pk ki delivery lahore me sirf 1 din me aayi. Lajawab quality!',
        date: '2026-05-18',
        verified: true
      },
      {
        id: 'rev-s2',
        name: 'Bilal Chaudhry',
        city: 'Faisalabad',
        rating: 5,
        text: 'Bilkul genuine store hai. Shuru me lag raha tha itni barri amount online spend krna risk hai, but COD available tha so no issues. 200MP camera is next level! Paise wasool tech investment.',
        date: '2026-05-24',
        verified: true
      },
      {
        id: 'rev-s3',
        name: 'Sara Qureshi',
        city: 'Karachi',
        rating: 5,
        text: 'Amazing speed and gorgeous design. Titanium frame feels premium in hand. Highly recommended to everyone looking for original products in Pakistan!',
        date: '2026-06-01',
        verified: true
      },
      {
        id: 'rev-s4',
        name: 'Omar Sheikh',
        city: 'Islamabad',
        rating: 4,
        text: 'Zabardast premium build. Screen is incredibly sharp. Charging is super fast. Bass minor delivery speed delays thi due to blockage, but product original 10/10 hai!',
        date: '2026-06-03',
        verified: true
      }
    ]
  },
  {
    id: 'apple-airpods-pro-2',
    name: 'Apple AirPods Pro 2nd Gen',
    brand: 'Apple',
    category: 'audio',
    price: 54999,
    originalPrice: 64999,
    rating: 4.8,
    reviewsCount: 36,
    badge: 'SALE',
    emoji: '🎧',
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1588449668338-d134af2a3a4f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800'
    ],
    gradientFrom: 'from-cyan-500',
    gradientTo: 'to-blue-800',
    description: 'Re-engineered for richer sound. Featuring next-level Active Noise Cancellation (ANC) up to 2x more than its predecessor, Adaptive Audio, Transparency mode, and Personalized Spatial Audio with dynamic head tracking for immersive listening.',
    specs: {
      processor: 'Apple H2 Headphone Chip, Apple U1/U2 inside charging case',
      battery: 'Up to 6 hours of listening time with ANC (Up to 30 hours with Case)',
      connectivity: 'Bluetooth 5.3, MagSafe Charging Case (USB-C) with Speaker and lanyard loop',
      weight: '5.3g per earbud, 50.8g charging case'
    },
    reviews: [
      {
        id: 'rev-a1',
        name: 'Fatima Noor',
        city: 'Islamabad',
        rating: 5,
        text: 'Zabardast Active Noise Cancellation! Islamabad ki traffic me ANC on kr k bilkul khamoshi hojati hai. Product was 100% genuine and pre-activated warranty properly clean check krliya. Kamal customer service TechZone!',
        date: '2026-05-29',
        verified: true
      },
      {
        id: 'rev-a2',
        name: 'Omar Sheikh',
        city: 'Karachi',
        rating: 5,
        text: 'Lajawab sound stage. Bass is superb, vocals are extremely clear. Delivery is extremely fast, got it in Karachi within 48 hours. Premium store experience. Paise wasool item.',
        date: '2026-05-15',
        verified: true
      },
      {
        id: 'rev-a3',
        name: 'Hamza Tariq',
        city: 'Lahore',
        rating: 4,
        text: 'Bhai sound quality outclass hai, fit directly and doesnt fall during gym. Packing is top-notch. Siri and touch controls responsive. Highly recommended.',
        date: '2026-05-22',
        verified: true
      }
    ]
  },
  {
    id: 'macbook-air-m3',
    name: 'MacBook Air M3 13"',
    brand: 'Apple',
    category: 'laptops',
    price: 419999,
    originalPrice: 449999,
    rating: 4.9,
    reviewsCount: 22,
    badge: 'NEW',
    emoji: '💻',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1496181130204-755241524eab?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800'
    ],
    gradientFrom: 'from-purple-600',
    gradientTo: 'to-indigo-950',
    description: 'Supercharged by Apple M3 chip. This ultra-portable, razor-thin laptop lets you work, play, or create anywhere. Built with a robust 8-core CPU, 10-core GPU, and up to 18 hours of battery life to breeze through professional workflows.',
    specs: {
      display: '13.6-inch Liquid Retina display with True Tone, 500 nits brightness',
      processor: 'Apple M3 chip (8-core CPU, 10-core GPU, 16-core Neural Engine)',
      ram: '8GB Single Unified Memory (Hyper-efficient)',
      storage: '256GB Superfast SSD Storage',
      battery: 'Up to 18 hours of Apple TV app movie playback, 52.6Wh battery',
      weight: '1.24 kg (Ultra-light aluminum body)'
    },
    reviews: [
      {
        id: 'rev-m1',
        name: 'Bilal Chaudhry',
        city: 'Faisalabad',
        rating: 5,
        text: 'Faisalabad me custom tech milna mushkil hota hai, isliye TechZone.pk se order kiya. Packing bohot solid thi. Laptop to waise hi lajawab hai, battery khatam hi nahi hoti. Kamal coding experience!',
        date: '2026-05-10',
        verified: true
      },
      {
        id: 'rev-m2',
        name: 'Sara Qureshi',
        city: 'Karachi',
        rating: 5,
        text: 'Absolutely authentic! Apple warranty activated automatically on first boot. Silver color looks beautiful. TechZone is my go-to tech shop in Pakistan now.',
        date: '2026-05-26',
        verified: true
      }
    ]
  },
  {
    id: 'logitech-mx-keys-s',
    name: 'Logitech MX Keys S Wireless Keyboard',
    brand: 'Logitech',
    category: 'accessories',
    price: 22999,
    originalPrice: 26999,
    rating: 4.7,
    reviewsCount: 19,
    badge: 'NEW',
    emoji: '⌨️',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800'
    ],
    gradientFrom: 'from-emerald-500',
    gradientTo: 'to-teal-900',
    description: 'Master your flow like never before. A low-profile, high-performance wireless keyboard offering a fluid, precise, and whisper-quiet typing experience. Dynamic backlighting adapts to the room\'s lighting automatically.',
    specs: {
      connectivity: 'Dual Connectivity (Bluetooth Low Energy or Logi Bolt USB Receiver)',
      battery: 'USB-C rechargeable, lasts up to 10 days (or up to 5 months with backlighting off)',
      weight: '810 grams (Weighted solid metal plate configuration)',
      dimensions: '131.6 x 430.2 x 20.5 mm'
    },
    reviews: [
      {
        id: 'rev-l1',
        name: 'Omar Sheikh',
        city: 'Islamabad',
        rating: 5,
        text: 'Bhai typing asaan aur mazedari ban gayi hai. Logitech ki MX Keys S is definitely of high caliber. Keys ka feel zabardast hai. original packing me sealed box deliver hua. 100% satisfy.',
        date: '2026-05-04',
        verified: true
      },
      {
        id: 'rev-l2',
        name: 'Hamza Tariq',
        city: 'Lahore',
        rating: 4,
        text: 'Great battery backup, automatic backlighting looks very premium. Multi-device shift works seamlessly between my Windows and Mac. Best seller!',
        date: '2026-05-19',
        verified: true
      }
    ]
  },
  {
    id: 'apple-watch-10',
    name: 'Apple Watch Series 10',
    brand: 'Apple',
    category: 'wearables',
    price: 89999,
    originalPrice: 99999,
    rating: 4.8,
    reviewsCount: 15,
    badge: 'HOT',
    emoji: '⌚',
    image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1517502884422-41eaaced0168?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&q=80&w=800'
    ],
    gradientFrom: 'from-amber-500',
    gradientTo: 'to-orange-800',
    description: 'The thinnest and largest screen Apple Watch yet. Powerful, durable, and highly intelligent health companion. Monitor your heart rate, sleep quality, blood oxygen, and workout metrics with stunning precision on the Wide-Angle OLED screen.',
    specs: {
      display: 'Always-On Retina LTPO Wide-Angle OLED, up to 2000 nits brightness',
      processor: 'S10 SiP with 64-bit dual-core processor, 4-core Neural Engine',
      battery: 'Up to 18 hours, fast charging (0% to 80% in just 30 minutes)',
      connectivity: 'Wi-Fi, Bluetooth 5.3, GPS and GLONASS'
    },
    reviews: [
      {
        id: 'rev-w1',
        name: 'Sara Qureshi',
        city: 'Karachi',
        rating: 5,
        text: 'Zabardast smartwatch! Screen thori bari lagti hai but ultra-slim design me comfortable lagti hai. Shipping karachi me 2 din me pohanchi. TechZone.pk team was very helpful on Call as well. Very reliable for original smartwatches.',
        date: '2026-05-30',
        verified: true
      },
      {
        id: 'rev-w2',
        name: 'Fatima Noor',
        city: 'Islamabad',
        rating: 4,
        text: 'Genuine Apple Watch Series 10 in original sealed retail box. Trackers work elegantly, sleep metrics is awesome. Clean purchase.',
        date: '2026-06-02',
        verified: true
      }
    ]
  },
  {
    id: 'jbl-charge-5',
    name: 'JBL Charge 5 Waterproof Speaker',
    brand: 'JBL',
    category: 'audio',
    price: 27999,
    originalPrice: 32999,
    rating: 4.6,
    reviewsCount: 31,
    badge: 'SALE',
    emoji: '🔊',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1516223725307-6f76b9ec8742?auto=format&fit=crop&q=80&w=800'
    ],
    gradientFrom: 'from-pink-500',
    gradientTo: 'to-rose-800',
    description: 'Take the amazing power of JBL Pro Sound with you. Detailed high-frequency clarity, deep thunderous bass, and dual pump-action JBL passive radiators. Keep the party going and charging other devices with the integrated powerbank.',
    specs: {
      battery: '7500 mAh battery (Provides up to 20 hours of playtime & acts as USB Powerbank)',
      connectivity: 'Bluetooth 5.1 with PartyBoost Multi-Speaker Daisy Chain sync',
      water_resistance: 'IP67 Waterproof and Dustproof (Can be submerged under shallow water)',
      weight: '960 grams'
    },
    reviews: [
      {
        id: 'rev-j1',
        name: 'Omar Sheikh',
        city: 'Rawalpindi',
        rating: 5,
        text: 'Pindi Boyz ki outdoor parties k liye perfect chiz hai! Bass kamal hai, battery backup bohot lamba chalta hai aur waterproof hona zabardast advantage hai. Deliver bhi thik time pe aya high-quality packaging me.',
        date: '2026-05-12',
        verified: true
      },
      {
        id: 'rev-j2',
        name: 'Hamza Tariq',
        city: 'Lahore',
        rating: 4,
        text: 'Extremely durable speaker with dynamic bass projection. Original warranty card came sealed inside box. Highly recommended for family picnics.',
        date: '2026-05-28',
        verified: true
      }
    ]
  },
  {
    id: 'apple-airpods-pro-2-master',
    name: 'Apple AirPods Pro 2 Master Copy',
    brand: 'Apple (Master Copy)',
    category: 'audio',
    price: 2999,
    originalPrice: 4999,
    rating: 4.8,
    reviewsCount: 74,
    badge: 'SALE',
    emoji: '🎧',
    image: airpodsMasterCopyImg,
    images: [
      airpodsMasterCopyImg,
      'https://images.unsplash.com/photo-1588449668338-d134af2a3a4f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800'
    ],
    gradientFrom: 'from-violet-500',
    gradientTo: 'to-cyan-800',
    description: 'Apple AirPods Pro 2 Master Copy offers a premium audio experience with Active Noise Cancellation (ANC), a clear built-in microphone, and deep heavy bass without breaking your bank account! Made with a robust design for a look and feel identical to the original.',
    specs: {
      noise_cancellation: 'Active Noise Cancellation (ANC) — Bahar ki awaazein band, aap apni duniya mein.',
      sound_quality: 'Crystal Clear Sound Quality — Deep bass, crisp highs — har genre mein maza.',
      microphone: 'Built-in Microphone — Calls pe awaaz bilkul saaf, shor nahi.',
      battery: 'Long Battery Life — Ghanton ka music, bina ruke.',
      connectivity: 'Bluetooth Connectivity — Android aur iOS dono ke saath compatible.',
      charging_case: 'Compact Charging Case — Pocket mein fit, har jagah saath.',
      build: 'Premium Build Quality — Asli jaisi feel, mazboot design.'
    },
    reviews: [
      {
        id: 'rev-m1',
        name: 'Usman Ali',
        city: 'Lahore',
        rating: 5,
        text: 'Bhai kamal cheez hai! Awaz bilkul fit hai aur ANC bhi behtareen tareeqay se kaam kerta hai. Rs.2,999 me ye quality unmatchable hai. Highly recommended!',
        date: '2026-06-03',
        verified: true
      },
      {
        id: 'rev-m2',
        name: 'Hamza Malik',
        city: 'Karachi',
        rating: 5,
        text: 'Very satisfied with this master copy. Deep bass, feels extremely premium like original. Quick delivery and nice box. JazakAllah TechZone!',
        date: '2026-06-01',
        verified: true
      },
      {
        id: 'rev-m3',
        name: 'Sara Khan',
        city: 'Islamabad',
        rating: 4,
        text: 'Sound clear hai calls pe aur charging timing bhi bohot lambi chal jati hai. iOS ke sath automatic connectivity popup ata hai jo mind-blowing hai.',
        date: '2026-05-29',
        verified: true
      }
    ]
  }
];
