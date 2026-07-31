import React, { Suspense } from "react";
import { NewsList } from "../_components/news/NewsList";
import { Spinner } from "@/components/ui/spinner";
import { BookOpen } from "lucide-react";

const NewsPage = () => {
  return <div>
     {/* Header */}
          <div className="border-b border-border bg-linear-to-r from-card to-card/50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <div className="flex items-center gap-3 mb-2">
                <BookOpen size={32} className="text-primary" />
                <h1 className="text-4xl font-bold tracking-tight text-foreground">
                  Articles & Insights
                </h1>
              </div>
              <p className="mt-2 text-lg text-muted-foreground">
                Explore our latest technical articles and security insights
              </p>
            </div>
          </div>
    <Suspense fallback={<Spinner/> }>
      <NewsList ></NewsList>
    </Suspense>
  </div>;
};

export default NewsPage;
