import React from 'react'
import {
  Link,
  Github,
  Gitlab,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Dribbble,
  Slack,
  Globe,
} from 'lucide-react'
import {
  FaBitbucket,
  FaTiktok,
  FaVimeoV,
  FaYoutube,
  FaPinterestP,
  FaMedium,
  FaDiscord,
  FaTelegramPlane,
  FaReddit,
  FaStackOverflow,
  FaBehance,
  FaSoundcloud,
  FaSpotify,
} from 'react-icons/fa'
import { FaUpwork } from 'react-icons/fa6'
import {
  SiFreelancer,
  SiToptal,
  SiSubstack,
  SiGumroad,
  SiApplepodcasts,
} from 'react-icons/si'

interface SocialIconProps {
  name: string
  url: string
  size?: number
}

export const SocialIcon: React.FC<SocialIconProps> = ({
  name,
  url,
  size = 24,
}) => {
  if (!url) return null

  const lowerUrl = url.toLowerCase()

  let IconComponent

  switch (true) {
    case name.toLowerCase() === 'website':
      IconComponent = Globe
      break
    case lowerUrl.includes('github'):
      IconComponent = Github
      break
    case lowerUrl.includes('gitlab'):
      IconComponent = Gitlab
      break
    case lowerUrl.includes('bitbucket'):
      IconComponent = FaBitbucket
      break
    case lowerUrl.includes('linkedin'):
      IconComponent = Linkedin
      break
    case lowerUrl.includes('twitter'):
      IconComponent = Twitter
      break
    case lowerUrl.includes('upwork'):
      IconComponent = FaUpwork
      break
    case lowerUrl.includes('freelancer'):
      IconComponent = SiFreelancer
      break
    case lowerUrl.includes('toptal'):
      IconComponent = SiToptal
      break
    case lowerUrl.includes('facebook'):
      IconComponent = Facebook
      break
    case lowerUrl.includes('instagram'):
      IconComponent = Instagram
      break
    case lowerUrl.includes('vimeo'):
      IconComponent = FaVimeoV
      break
    case lowerUrl.includes('youtube'):
      IconComponent = FaYoutube
      break
    case lowerUrl.includes('pinterest'):
      IconComponent = FaPinterestP
      break
    case lowerUrl.includes('medium'):
      IconComponent = FaMedium
      break
    case lowerUrl.includes('tiktok'):
      IconComponent = FaTiktok
      break
    case lowerUrl.includes('discord'):
      IconComponent = FaDiscord
      break
    case lowerUrl.includes('t.me'):
      IconComponent = FaTelegramPlane
      break
    case lowerUrl.includes('substack'):
      IconComponent = SiSubstack
      break
    case lowerUrl.includes('gumroad'):
      IconComponent = SiGumroad
      break
    case lowerUrl.includes('reddit'):
      IconComponent = FaReddit
      break
    case lowerUrl.includes('stackoverflow'):
      IconComponent = FaStackOverflow
      break
    case lowerUrl.includes('dribbble'):
      IconComponent = Dribbble
      break
    case lowerUrl.includes('behance'):
      IconComponent = FaBehance
      break
    case lowerUrl.includes('slack'):
      IconComponent = Slack
      break
    case lowerUrl.includes('soundcloud'):
      IconComponent = FaSoundcloud
      break
    case lowerUrl.includes('spotify'):
      IconComponent = FaSpotify
      break
    case lowerUrl.includes('apple'):
      IconComponent = SiApplepodcasts
      break
    default:
      IconComponent = Link
  }

  return <IconComponent size={size} />
}
