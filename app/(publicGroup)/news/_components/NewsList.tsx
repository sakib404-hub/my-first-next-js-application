import { getAllNews } from "../_actions/getAllNews";
import { NewsFilter } from "./NewsFilter";
import { NewsPost } from "@/types/types";

export const NewsList = async () => {
  const response = await getAllNews();

  const samplePosts: NewsPost[] = response.data;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <NewsFilter posts={samplePosts} />
      </div>
    </div>
  );
};

export default NewsList;