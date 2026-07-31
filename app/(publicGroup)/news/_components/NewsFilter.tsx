"use client";

import { Search, Tag, X, Zap } from "lucide-react";
import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NewsPost } from "@/types/types";
import { NewsCard } from "./NewsCard";

interface NewsFilterProps {
  posts: NewsPost[];
}

export const NewsFilter = ({ posts }: NewsFilterProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();

    posts.forEach((post) => {
      post.tags.forEach((tag) => tagSet.add(tag));
    });

    return Array.from(tagSet).sort();
  }, [posts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.author.name.toLowerCase().includes(query);

      const matchesTag =
        selectedTag === null || post.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  // Separate featured and regular posts
  const featuredPosts = filteredPosts.filter(
    (post) => post.isFeatured
  );

  const regularPosts = filteredPosts.filter(
    (post) => !post.isFeatured
  );

  return (
    <>
      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="group relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
            size={18}
          />

          <Input
            type="text"
            placeholder="Search articles by title, content, or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Tags */}
        {allTags.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Tag size={18} className="text-primary" />
              <span>Filter by Topic</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {/* All Articles */}
              <Button
                type="button"
                onClick={() => setSelectedTag(null)}
                variant={selectedTag === null ? "default" : "outline"}
                size="sm"
                className="gap-2"
              >
                <Zap size={16} />
                All Articles
              </Button>

              {/* Individual Tags */}
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  type="button"
                  onClick={() =>
                    setSelectedTag(
                      tag === selectedTag ? null : tag
                    )
                  }
                  variant={
                    selectedTag === tag ? "default" : "outline"
                  }
                  size="sm"
                  className="gap-2"
                >
                  <Tag size={14} />
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Featured Articles */}
      {featuredPosts.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">
            Featured Articles
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <NewsCard
                key={post.id}
                {...post}
              />
            ))}
          </div>
        </section>
      )}

      {/* Regular Articles */}
      <section>
        <h2 className="mb-6 text-2xl font-bold">
          {featuredPosts.length > 0
            ? "All Articles"
            : "Latest Articles"}
        </h2>

        {regularPosts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {regularPosts.map((post) => (
              <NewsCard
                key={post.id}
                {...post}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed bg-card/50 py-12 text-center">
            <Search
              size={40}
              className="mx-auto mb-3 text-muted-foreground/50"
            />

            <p className="font-medium text-muted-foreground">
              {posts.length === 0
                ? "No articles yet."
                : "No articles match your search or filter."}
            </p>

            {searchQuery && (
              <p className="mt-2 text-sm text-muted-foreground">
                Try adjusting your search terms
              </p>
            )}

            {selectedTag && !searchQuery && (
              <p className="mt-2 text-sm text-muted-foreground">
                Try selecting a different topic
              </p>
            )}
          </div>
        )}
      </section>

      {/* Results Count */}
      {filteredPosts.length > 0 && (
        <div className="mt-8 text-center text-sm text-muted-foreground">
          Showing {filteredPosts.length} of {posts.length} articles
        </div>
      )}
    </>
  );
};
