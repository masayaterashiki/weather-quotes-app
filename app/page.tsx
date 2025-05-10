'use client';

import React, { useState, useEffect } from 'react';
import { getWeather, WeatherData } from './utils/weatherApi';
import { getQuoteByWeather } from './utils/quotes';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import {
  FacebookShareButton,
  TwitterShareButton,
  LineShareButton,
  FacebookIcon,
  TwitterIcon,
  LineIcon,
} from 'react-share';
import './styles/weather-animations.css';

interface FavoriteQuote {
  text: string;
  author: string;
  weather: string;
  city: string;
  timestamp: number;
}

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [quote, setQuote] = useState<{ text: string; author: string } | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [city, setCity] = useState('');
  const [favorites, setFavorites] = useState<FavoriteQuote[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    // お気に入りの読み込み
    const savedFavorites = localStorage.getItem('favoriteQuotes');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    // 現在地の取得
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=1&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
            );
            const data = await response.json();
            if (data && data[0]) {
              setCity(data[0].name);
            }
          } catch (error) {
            console.error('Error fetching location:', error);
            setCity('Tokyo'); // フォールバック
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          setCity('Tokyo'); // フォールバック
        }
      );
    } else {
      setCity('Tokyo'); // フォールバック
    }
  }, []);

  useEffect(() => {
    if (city) {
      const fetchWeather = async () => {
        try {
          const data = await getWeather(city);
          setWeather(data);
          const weatherQuote = getQuoteByWeather(data.weather[0].main);
          setQuote(weatherQuote);
          
          // お気に入り状態の確認
          const isQuoteFavorite = favorites.some(
            fav => fav.text === weatherQuote.text && fav.author === weatherQuote.author
          );
          setIsFavorite(isQuoteFavorite);
        } catch (error) {
          console.error('Error:', error);
        }
      };

      fetchWeather();
    }
  }, [city, favorites]);

  const toggleFavorite = () => {
    if (!quote || !weather) return;

    const newFavorites = isFavorite
      ? favorites.filter(fav => fav.text !== quote.text)
      : [...favorites, {
          text: quote.text,
          author: quote.author,
          weather: weather.weather[0].description,
          city: weather.name,
          timestamp: Date.now()
        }];

    setFavorites(newFavorites);
    localStorage.setItem('favoriteQuotes', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = `今日の天気と名言: ${weather?.weather[0].description} - ${quote?.text}`;

  const getWeatherClass = () => {
    if (!weather) return '';
    const main = weather.weather[0].main.toLowerCase();
    if (main.includes('rain')) return 'rain';
    if (main.includes('clear') || main.includes('sun')) return 'sunny';
    if (main.includes('cloud')) return 'cloudy';
    if (main.includes('snow')) return 'snowy';
    return '';
  };

  const renderCats = () => {
    return (
      <>
        {[...Array(3)].map((_, i) => (
          <div
            key={`black-cat-${i}`}
            className="cat cat-black"
            style={{
              top: `${Math.random() * 60 + 20}%`,
              animationDelay: `${i * 5}s`,
            }}
          />
        ))}
        {[...Array(3)].map((_, i) => (
          <div
            key={`white-cat-${i}`}
            className="cat cat-white"
            style={{
              top: `${Math.random() * 60 + 20}%`,
              animationDelay: `${i * 5 + 2.5}s`,
            }}
          />
        ))}
        {[...Array(50)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </>
    );
  };

  return (
    <main className="min-h-screen relative">
      <div className="weather-background">
        {renderCats()}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <div className="glass-card max-w-2xl w-full rounded-2xl p-8">
          <div className="flex justify-between items-center mb-8">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="city-input"
              placeholder="都市名を入力"
            />
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className="text-white/80 hover:text-white transition-colors"
            >
              {showFavorites ? '天気に戻る' : 'お気に入りを見る'}
            </button>
          </div>

          {showFavorites ? (
            <div className="space-y-4">
              <h2 className="text-2xl font-light text-white/90 mb-4">お気に入りの名言</h2>
              {favorites.length === 0 ? (
                <p className="text-white/70">お気に入りの名言はまだありません</p>
              ) : (
                favorites.map((fav, index) => (
                  <div key={index} className="glass-card p-6 rounded-xl">
                    <p className="quote-text mb-2">"{fav.text}"</p>
                    <p className="author-text mb-2">- {fav.author}</p>
                    <p className="text-sm text-white/60">
                      {fav.city} - {fav.weather} ({new Date(fav.timestamp).toLocaleDateString()})
                    </p>
                  </div>
                ))
              )}
            </div>
          ) : (
            <>
              {weather && (
                <div className="text-center mb-12">
                  <h1 className="text-3xl font-light mb-4 text-white/90">{weather.name}</h1>
                  <p className="text-xl mb-4 text-white/80">{weather.weather[0].description}</p>
                  <p className="temperature">{Math.round(weather.main.temp)}°C</p>
                </div>
              )}

              {quote && (
                <div className="glass-card p-8 rounded-xl mb-8 relative">
                  <button
                    onClick={toggleFavorite}
                    className={`favorite-button absolute top-4 right-4 ${isFavorite ? 'active' : ''}`}
                  >
                    {isFavorite ? (
                      <HeartIconSolid className="h-6 w-6" />
                    ) : (
                      <HeartIcon className="h-6 w-6" />
                    )}
                  </button>
                  <div className="max-w-xl mx-auto text-center">
                    <p className="quote-text mb-4">"{quote.text}"</p>
                    <p className="author-text">- {quote.author}</p>
                  </div>
                </div>
              )}

              <div className="flex justify-center space-x-4">
                <FacebookShareButton url={shareUrl} title={shareTitle}>
                  <div className="share-button">
                    <FacebookIcon size={24} round />
                  </div>
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl} title={shareTitle}>
                  <div className="share-button">
                    <TwitterIcon size={24} round />
                  </div>
                </TwitterShareButton>
                <LineShareButton url={shareUrl} title={shareTitle}>
                  <div className="share-button">
                    <LineIcon size={24} round />
                  </div>
                </LineShareButton>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
} 