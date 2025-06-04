import Image from 'next/image'
import { UserProps } from '@/types/user'
import { BadgeProps } from '@/types/badge'
import { Card, CardHeader, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'

function BadgeColorCategory(category: string) {
  switch (category) {
    case 'starter':
      return 'filter sepia saturate-100 brightness-50 hue-rotate-15'
    case 'community':
      return 'filter grayscale brightness-150 contrast-125'
    case 'skill mastery':
      return 'filter sepia saturate-200 brightness-110 hue-rotate-25'
    default:
      return ''
  }
}

async function getAllBadges() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/badges/`, {
      next: { revalidate: 60 },
      cache: 'no-cache',
    })
    return res.json()
  } catch (error) {
    throw new Error('Failed to fetch badges')
  }
}

export default async function BadgesSection({ user }: { user: UserProps }) {
  const badges = await getAllBadges()
  const userBadges = user.badges.map((badge: BadgeProps) => badge.id)

  // add grayscale classname to badge that user don't have
  const filteredBadges = badges.map((badge: BadgeProps) => {
    if (!userBadges.includes(badge.id)) {
      return {
        ...badge,
        className: 'grayscale opacity-50 hover:grayscale-0 hover:opacity-80',
      }
    }
    return badge
  })

  const categories = [
    {
      name: 'Starter',
      badges: filteredBadges.filter(
        (badge: BadgeProps) => badge.group === 'starter'
      ),
    },
    {
      name: 'Community',
      badges: filteredBadges.filter(
        (badge: BadgeProps) => badge.group === 'community'
      ),
    },
    {
      name: 'Skill Mastery',
      badges: filteredBadges.filter(
        (badge: BadgeProps) => badge.group === 'skill mastery'
      ),
    },
    {
      name: 'Elite',
      badges: filteredBadges.filter(
        (badge: BadgeProps) => badge.group === 'elite'
      ),
    },
  ]

  return (
    <div className="p-4">
      {categories.map((category, index) => {
        if (category.badges.length > 0) {
          return (
            <Card key={category.name} className="mb-4">
              <CardHeader>
                <h3 className="text-lg font-semibold mb-4">{category.name}</h3>
              </CardHeader>
              <CardContent>
                <div className="flex items-center flex-wrap space-y-4">
                  <div className="flex items-center flex-wrap gap-4">
                    {categories[index].badges.map(
                      (badge: BadgeProps & { className?: string }) => {
                        return (
                          <div
                            key={badge.id}
                            className={`flex justify-center items-center flex-col gap-2 ${badge.className}`}
                          >
                            <div className="relative">
                              <Image
                                src="/badge.png"
                                width={150}
                                height={150}
                                alt={badge.name}
                                className={`${BadgeColorCategory(badge.group)}`}
                                priority
                                title={badge.description}
                              />
                              <Image
                                src={badge.image}
                                width={100}
                                height={100}
                                alt={badge.name}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12"
                                priority
                                title={badge.description}
                              />
                            </div>
                            <div>
                              <Badge
                                variant="secondary"
                                className="text-sm font-semibold break-words text-center"
                              >
                                {badge.name}
                              </Badge>
                            </div>
                          </div>
                        )
                      }
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        } else {
          return null
        }
      })}
    </div>
  )
}
