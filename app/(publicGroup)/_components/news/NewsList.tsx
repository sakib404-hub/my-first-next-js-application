'use client'

import { Search, Tag, X, Zap, BookOpen } from 'lucide-react'
import { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { NewsCard } from './NewsCard'

interface Author {
  id: string
  name: string
  email: string
  activeStatus: string
  role: string
  createdAt: string
  updatedAt: string
  isPremium: boolean
}

interface NewsPost {
  id: string
  title: string
  content: string
  thumbnail: string
  isFeatured: boolean
  status: string
  tags: string[]
  views: number
  createdAt: string
  updatedAt: string
  isPremium: boolean
  authorId: string
  comments: unknown[]
  author: Author
  _count: {
    comments: number
  }
}

interface NewsPageListProps {
  posts: NewsPost[]
}

export const NewsList =() => {

      const samplePosts : NewsPost[] = [
    {
      id: "090997be-c76d-4a84-8fbc-6578257deacc",
      title: "Building Secure APIs with JWT",
      content:
        "Learn how JSON Web Tokens can be used for authentication and authorization in RESTful APIs.",
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLzOsXAGnBHRlP3m5OClYHGLxQHkqyJQGVI3Vxk3d6aA&s",
      isFeatured: true,
      status: "PUBLISHED",
      tags: ["JWT", "Authentication", "Security"],
      views: 9,
      createdAt: "2026-06-27T19:34:31.917Z",
      updatedAt: "2026-07-30T19:29:12.108Z",
      isPremium: true,
      authorId: "380cfaf1-25bb-49eb-b2b6-cf5be105c356",
      comments: [],
      author: {
        id: "380cfaf1-25bb-49eb-b2b6-cf5be105c356",
        name: "Sakib Hossen",
        email: "sakibhossen@gmail.com",
        activeStatus: "ACTIVE",
        role: "ADMIN",
        createdAt: "2026-06-27T15:08:37.691Z",
        updatedAt: "2026-06-27T15:08:37.691Z",
        isPremium: false,
      },
      _count: {
        comments: 0,
      },
    },
    {
      id: "090997be-c76d-4a84-8fbc-6578257deacc-2",
      title: "React Performance Optimization Strategies",
      content:
        "Discover key techniques for optimizing React applications, from code splitting to lazy loading and memoization.",
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLzOsXAGnBHRlP3m5OClYHGLxQHkqyJQGVI3Vxk3d6aA&s",
      isFeatured: true,
      status: "PUBLISHED",
      tags: ["React", "Performance", "JavaScript"],
      views: 245,
      createdAt: "2026-07-01T10:15:00.000Z",
      updatedAt: "2026-07-28T14:22:00.000Z",
      isPremium: false,
      authorId: "380cfaf1-25bb-49eb-b2b6-cf5be105c356",
      comments: [],
      author: {
        id: "380cfaf1-25bb-49eb-b2b6-cf5be105c356",
        name: "Sakib Hossen",
        email: "sakibhossen@gmail.com",
        activeStatus: "ACTIVE",
        role: "ADMIN",
        createdAt: "2026-06-27T15:08:37.691Z",
        updatedAt: "2026-06-27T15:08:37.691Z",
        isPremium: false,
      },
      _count: {
        comments: 0,
      },
    },
    {
      id: "090997be-c76d-4a84-8fbc-6578257deacc-3",
      title: "Introduction to TypeScript Generics",
      content:
        "Master the power of TypeScript generics to write reusable, type-safe code that scales with your application.",
      thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
      isFeatured: false,
      status: "PUBLISHED",
      tags: ["TypeScript", "JavaScript", "Programming"],
      views: 156,
      createdAt: "2026-07-05T08:45:00.000Z",
      updatedAt: "2026-07-29T11:30:00.000Z",
      isPremium: true,
      authorId: "380cfaf1-25bb-49eb-b2b6-cf5be105c356",
      comments: [],
      author: {
        id: "380cfaf1-25bb-49eb-b2b6-cf5be105c356",
        name: "Sakib Hossen",
        email: "sakibhossen@gmail.com",
        activeStatus: "ACTIVE",
        role: "ADMIN",
        createdAt: "2026-06-27T15:08:37.691Z",
        updatedAt: "2026-06-27T15:08:37.691Z",
        isPremium: false,
      },
      _count: {
        comments: 0,
      },
    },
  ];

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // Get all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    samplePosts.forEach((post) => {
      post.tags.forEach((tag) => tagSet.add(tag))
    })
    return Array.from(tagSet).sort()
  }, [samplePosts])

  // Filter posts based on search and selected tag
  const filteredPosts = useMemo(() => {
    return samplePosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesTag = !selectedTag || post.tags.includes(selectedTag)

      return matchesSearch && matchesTag
    })
  }, [samplePosts, searchQuery, selectedTag])

  // Separate featured and regular posts
  const featuredPosts = filteredPosts.filter((post) => post.isFeatured)
  const regularPosts = filteredPosts.filter((post) => !post.isFeatured)

  return (
    <div className="min-h-screen bg-background">

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
            <Input
              type="text"
              placeholder="Search articles by title, content, or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Tag Filter */}
          {allTags.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Tag size={18} className="text-primary" />
                <span>Filter by Topic</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => setSelectedTag(null)}
                  variant={selectedTag === null ? 'default' : 'outline'}
                  size="sm"
                  className="gap-2"
                >
                  <Zap size={16} />
                  All Articles
                </Button>
                {allTags.map((tag) => (
                  <Button
                    key={tag}
                    onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                    variant={selectedTag === tag ? 'default' : 'outline'}
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

        {/* Featured Section */}
        {featuredPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-foreground">
              Featured Articles
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post) => (
                <NewsCard key={post.id} {...post} />
              ))}
            </div>
          </section>
        )}

        {/* All Articles Section */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-foreground">
            {featuredPosts.length > 0 ? 'All Articles' : 'Latest Articles'}
          </h2>

          {regularPosts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {regularPosts.map((post) => (
                <NewsCard key={post.id} {...post} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-border bg-card/50 py-12 text-center">
              <Search size={40} className="mx-auto mb-3 text-muted-foreground/50" />
              <p className="text-muted-foreground font-medium">
                {samplePosts.length === 0
                  ? 'No articles yet.'
                  : 'No articles match your search or filter.'}
              </p>
              {searchQuery && (
                <p className="text-sm text-muted-foreground mt-2">
                  Try adjusting your search terms
                </p>
              )}
            </div>
          )}
        </section>

        {/* Results Count */}
        {filteredPosts.length > 0 && (
          <div className="mt-8 text-center text-sm text-muted-foreground">
            Showing {filteredPosts.length} of {samplePosts.length} articles
          </div>
        )}
      </div>
    </div>
  )
}
