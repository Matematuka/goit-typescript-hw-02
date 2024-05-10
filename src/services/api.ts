import axios from "axios";
import { Photo } from "../components/App/App.types";

const instance = axios.create({
  baseURL: "https://api.unsplash.com",
});

interface ImageSearchResponse {
  total: number;
  total_pages: number;
  results: Photo[];
}

export const fetchImagesSearch = async (
  query: string,
  numberOfpage: number,
  pagination: number
): Promise<ImageSearchResponse> => {
  const response = await instance.get("/search/photos", {
    params: {
      client_id: "1bnOnn5qY0HAwAJR9CN6sX_5D3JT3cSAFzB3seTyYiU",
      query: query,
      orientation: "landscape",
      page: numberOfpage,
      per_page: pagination,
    },
  });

  return response.data;
};
