interface Quote {
  text: string;
  author: string;
  weather: string[];
}

export const quotes: Quote[] = [
  {
    text: "雨の日は、新しいアイデアが生まれる日。",
    author: "トーマス・エジソン",
    weather: ["Rain", "Drizzle", "Thunderstorm"]
  },
  {
    text: "太陽の光は、すべての人に平等に降り注ぐ。",
    author: "マハトマ・ガンディー",
    weather: ["Clear", "Sunny"]
  },
  {
    text: "雲の向こうには、必ず青空が広がっている。",
    author: "ヘレン・ケラー",
    weather: ["Clouds", "Overcast"]
  },
  {
    text: "雪の降る日は、静寂の中で自分を見つめる日。",
    author: "アルベルト・アインシュタイン",
    weather: ["Snow"]
  },
  {
    text: "風は、新しい始まりを運んでくる。",
    author: "ウィンストン・チャーチル",
    weather: ["Wind"]
  }
];

export const getQuoteByWeather = (weatherMain: string): Quote => {
  const matchingQuotes = quotes.filter(quote => 
    quote.weather.some(w => w.toLowerCase() === weatherMain.toLowerCase())
  );
  
  if (matchingQuotes.length === 0) {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }
  
  return matchingQuotes[Math.floor(Math.random() * matchingQuotes.length)];
}; 