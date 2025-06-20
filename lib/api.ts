export const fetchFinancialNews = async () => {
    const FINNHUB_API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;
  
    if (!FINNHUB_API_KEY) {
      console.error("Missing Finnhub API key");
      return [];
    }
  
    try {
      const response = await fetch(
        `https://finnhub.io/api/v1/news?category=general&token=${FINNHUB_API_KEY}`
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching financial news:", error);
      return [];
    }
  };
  