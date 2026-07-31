'use client'

import { Eye, Calendar, User, Sparkles, Lock, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

interface Author {
  id: string
  name: string
  email: string
  role: string
}

interface NewsCardProps {
  id: string
  title: string
  content: string
  thumbnail: string
  isFeatured: boolean
  status: string
  tags: string[]
  views: number
  createdAt: string
  isPremium: boolean
  author: Author
}

export const  NewsCard = ({
  id,
  title,
  content,
  thumbnail,
  isFeatured,
  tags,
  views,
  createdAt,
  isPremium,
  author,
}: NewsCardProps) =>{
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden border-border hover:shadow-lg hover:border-foreground/20">
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            const img = e.target as HTMLImageElement
            img.src =
              'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" font-size="16" fill="%23999" text-anchor="middle" dy=".3em"%3EImage not available%3C/text%3E%3C/svg%3E'
          }}
        />

        {/* Badges Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
        <div className="absolute left-4 right-4 top-4 flex flex-wrap gap-2">
          {isFeatured && (
            <Badge variant="default" className="gap-1.5">
              <Sparkles size={14} className="animate-pulse" />
              <span>Featured</span>
            </Badge>
          )}
          {isPremium && (
            <Badge variant="secondary" className="gap-1.5">
              <Lock size={14} />
              <span>Premium</span>
            </Badge>
          )}
        </div>
      </div>

      {/* Content Container */}
      <CardContent className="flex flex-1 flex-col justify-between p-4">
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs font-medium"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="mb-2 line-clamp-2 text-lg font-bold leading-tight text-foreground">
          {title}
        </h3>

        {/* Description */}
        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
          {content}
        </p>

        {/* Metadata */}
        <div className="space-y-2.5 border-t border-border pt-3">
          {/* Author Info */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground transition-colors">
            <User size={14} className="text-primary" />
            <span className="font-medium truncate">{author.name}</span>
          </div>

          {/* Date and Views Row */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-primary" />
              <time>{formattedDate}</time>
            </div>
            <div className="flex items-center gap-1.5 font-medium text-foreground">
              <Eye size={14} className="text-primary" />
              <span>{views > 999 ? `${(views / 1000).toFixed(1)}k` : views}</span>
            </div>
          </div>

          {/* Engagement Indicator */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MessageCircle size={14} className="text-primary" />
            <span>{0} comments</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
