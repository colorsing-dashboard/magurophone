import {
  Home, Wine, Users, Image, Music, Gamepad2, MessageCircle,
  Mic, Zap, Trophy, Crown, Sparkles, Star, AlertTriangle,
  RefreshCw, MailX, Tag, Palette, BarChart3, Smartphone,
  Award, FileText, Rocket, Heart, Gift, Clock, Shield,
  Headphones, Radio, Volume2, Play, Disc3, PartyPopper,
} from 'lucide-react'

const ICON_COMPONENTS = {
  home: Home,
  wine: Wine,
  users: Users,
  image: Image,
  music: Music,
  'gamepad-2': Gamepad2,
  'message-circle': MessageCircle,
  mic: Mic,
  zap: Zap,
  trophy: Trophy,
  crown: Crown,
  sparkles: Sparkles,
  star: Star,
  'alert-triangle': AlertTriangle,
  'refresh-cw': RefreshCw,
  'mail-x': MailX,
  tag: Tag,
  palette: Palette,
  'bar-chart-3': BarChart3,
  smartphone: Smartphone,
  award: Award,
  'file-text': FileText,
  rocket: Rocket,
  heart: Heart,
  gift: Gift,
  clock: Clock,
  shield: Shield,
  headphones: Headphones,
  radio: Radio,
  'volume-2': Volume2,
  play: Play,
  'disc-3': Disc3,
  'party-popper': PartyPopper,
}

export const AVAILABLE_ICONS = Object.keys(ICON_COMPONENTS)

const IconRenderer = ({ icon, size = 24, className = '' }) => {
  if (!icon) return null

  const Component = ICON_COMPONENTS[icon]
  if (Component) {
    return <Component size={size} className={className} />
  }

  // 絵文字フォールバック
  return <span className={className}>{icon}</span>
}

export default IconRenderer
