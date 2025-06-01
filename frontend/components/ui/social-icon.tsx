import React from 'react'
import { Link, Linkedin, Globe } from 'lucide-react'
import {
  FaGithub,
  FaGitlab,
  FaFacebook,
  FaInstagram,
  FaDribbble,
  FaTwitch,
  FaSlack,
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
import { FaUpwork, FaXTwitter } from 'react-icons/fa6'
import {
  SiFreelancer,
  SiToptal,
  SiSubstack,
  SiGumroad,
  SiApplepodcasts,
} from 'react-icons/si'

interface SocialIconProps {
  name: string
  classname?: string
  size?: number
}

export const SocialIcon: React.FC<SocialIconProps> = ({
  name,
  classname,
  size = 24,
}) => {
  if (!name) return null

  let IconComponent

  const normalized = name.toLowerCase()

  switch (normalized) {
    case 'website':
      IconComponent = Globe
      break
    case 'github':
      IconComponent = FaGithub
      break
    case 'gitlab':
      IconComponent = FaGitlab
      break
    case 'bitbucket':
      IconComponent = FaBitbucket
      break
    case 'linkedin':
      IconComponent = Linkedin
      break
    case 'twitch':
      IconComponent = FaTwitch
      break
    case 'x':
    case 'twitter':
      IconComponent = FaXTwitter
      break
    case 'upwork':
      IconComponent = FaUpwork
      break
    case 'freelancer':
      IconComponent = SiFreelancer
      break
    case 'toptal':
      IconComponent = SiToptal
      break
    case 'facebook':
      IconComponent = FaFacebook
      break
    case 'instagram':
      IconComponent = FaInstagram
      break
    case 'vimeo':
      IconComponent = FaVimeoV
      break
    case 'youtube':
      IconComponent = FaYoutube
      break
    case 'pinterest':
      IconComponent = FaPinterestP
      break
    case 'medium':
      IconComponent = FaMedium
      break
    case 'tiktok':
      IconComponent = FaTiktok
      break
    case 'discord':
      IconComponent = FaDiscord
      break
    case 'telegram':
      IconComponent = FaTelegramPlane
      break
    case 'substack':
      IconComponent = SiSubstack
      break
    case 'gumroad':
      IconComponent = SiGumroad
      break
    case 'reddit':
      IconComponent = FaReddit
      break
    case 'stackoverflow':
      IconComponent = FaStackOverflow
      break
    case 'dribbble':
      IconComponent = FaDribbble
      break
    case 'behance':
      IconComponent = FaBehance
      break
    case 'slack':
      IconComponent = FaSlack
      break
    case 'soundcloud':
      IconComponent = FaSoundcloud
      break
    case 'spotify':
      IconComponent = FaSpotify
      break
    case 'apple':
    case 'apple_podcasts':
      IconComponent = SiApplepodcasts
      break
    case 'other':
      IconComponent = Link
      break
    default:
      IconComponent = Link
      break
  }

  if (!IconComponent) return null
  return <IconComponent size={size} className={classname} />
}
