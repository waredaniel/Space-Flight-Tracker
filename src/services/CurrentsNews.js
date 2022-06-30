export default class News {
  static async getNews(quary) {
    try {
      const response = await fetch(`https://api.currentsapi.services/v1/search?apiKey=ZMWijEyVWY0AmJiyh9YH_tO_8djpGggOVEZSZ0RWtnz98MRD&keywords=${quary}`)
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch(error) {
        return error.message;
    }
  }
}

// ${process.env.API_KEY}