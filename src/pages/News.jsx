import React, { useEffect, useState } from "react";

const News = () => {
  const currentDay = new Date(Date.now()).toISOString().slice(0, 10);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const getNews = () => {
      fetch(
        `https://newsapi.org/v2/everything?q=apple&from=${currentDay}&to=${currentDay}&sortBy=popularity&apiKey=2d1ebeedb68547649e992a1ce5b180c7`
      )
        .then((res) => res.json())
        .then((data) => setNews([...news, ...data.articles]))
        .catch((err) => console.log(err));
    };

    getNews();
  }, []);

  return (
    <div className="mt-3">
      {news &&
        news.map((item) => (
          <a
            href={item.url}
            key={item.id}
            className="flex items-start justify-between mb-2"
          >
            <img
              alt=""
              src={item.urlToImage}
              className="w-[100px] rounded-md object-cover"
            />
            <p className="text-xs text-black flex-1 ml-4">
              {item.title && item?.title.length > 100
                ? item.title.slice(0, 80) + "..."
                : item.title}
            </p>
          </a>
        ))}
    </div>
  );
};

export default News;
