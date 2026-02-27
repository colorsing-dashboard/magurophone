import {
  // ナビゲーション・UI
  Home, Search, Settings, Menu, X, ChevronRight, ChevronDown,
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight, ExternalLink, Link,
  Eye, EyeOff, Filter, LayoutGrid, List, Maximize, Minimize,
  MoreHorizontal, MoreVertical, Plus, Minus, Check, RefreshCw,
  // ユーザー・人物
  Users, User, UserPlus, UserCheck, Contact,
  // メディア・音楽
  Music, Mic, MicOff, Headphones, Radio, Volume2, VolumeX,
  Play, Pause, SkipForward, SkipBack, Disc3,
  // ゲーム・エンタメ
  Gamepad2, Zap, Tv, Clapperboard, Popcorn, Drama, Dices,
  // コミュニケーション
  MessageCircle, MessageSquare, Mail, MailX, Send, Phone, Video,
  // アワード・実績
  Trophy, Crown, Award, Medal, Star, Sparkles, PartyPopper, Gem, Target, Flag,
  // ショッピング・ギフト
  Gift, ShoppingCart, ShoppingBag, CreditCard, Banknote, Coins, Receipt,
  // 食事・ドリンク
  Wine, Beer, Coffee, CookingPot, UtensilsCrossed, Cherry, Cake, IceCreamCone,
  // 自然・天気
  Sun, Moon, Cloud, CloudRain, Snowflake, Flower, Flower2, TreePine, Mountain, Waves,
  // 動物
  Cat, Dog, Bird, Fish, Bug, Rabbit, Squirrel, Turtle,
  // ハート・感情
  Heart, HeartHandshake, ThumbsUp, ThumbsDown, Smile, Laugh, Frown, Angry,
  // 時間・カレンダー
  Clock, Calendar, CalendarDays, Timer, Hourglass, AlarmClock,
  // ファイル・ドキュメント
  FileText, Folder, BookOpen, Bookmark, ClipboardList, Newspaper, NotebookPen,
  // 建物・場所
  Building2, Store, School, Landmark, MapPin, Globe, Compass, Navigation,
  // テクノロジー
  Smartphone, Monitor, Laptop, Wifi, Bluetooth, Camera, QrCode, Cpu,
  // セキュリティ
  Shield, ShieldCheck, Lock, Unlock, Key, Fingerprint,
  // チャート・データ
  BarChart3, TrendingUp, TrendingDown, PieChart, Activity,
  // ツール・設定
  Tag, Palette, Rocket, AlertTriangle, Info, HelpCircle,
  Image, Download, Upload, Trash2, Edit3, Copy, Scissors, Wrench,
  // 交通
  Car, Bike, Plane, Ship, Train,
  // スポーツ
  Dumbbell,
  // その他
  Flame, Lightbulb, Umbrella, Glasses, Shirt, Watch,
  Hash, AtSign, Percent, CircleDollarSign, Infinity, Binary,
} from 'lucide-react'

const ICON_COMPONENTS = {
  // ナビゲーション・UI
  home: Home, search: Search, settings: Settings, menu: Menu, x: X,
  'chevron-right': ChevronRight, 'chevron-down': ChevronDown,
  'arrow-up': ArrowUp, 'arrow-down': ArrowDown, 'arrow-left': ArrowLeft, 'arrow-right': ArrowRight,
  'external-link': ExternalLink, link: Link,
  eye: Eye, 'eye-off': EyeOff, filter: Filter, 'layout-grid': LayoutGrid, list: List,
  maximize: Maximize, minimize: Minimize,
  'more-horizontal': MoreHorizontal, 'more-vertical': MoreVertical,
  plus: Plus, minus: Minus, check: Check, 'refresh-cw': RefreshCw,
  // ユーザー・人物
  users: Users, user: User, 'user-plus': UserPlus, 'user-check': UserCheck, contact: Contact,
  // メディア・音楽
  music: Music, mic: Mic, 'mic-off': MicOff, headphones: Headphones, radio: Radio,
  'volume-2': Volume2, 'volume-x': VolumeX,
  play: Play, pause: Pause, 'skip-forward': SkipForward, 'skip-back': SkipBack, 'disc-3': Disc3,
  // ゲーム・エンタメ
  'gamepad-2': Gamepad2, zap: Zap, tv: Tv, clapperboard: Clapperboard,
  popcorn: Popcorn, drama: Drama, dices: Dices,
  // コミュニケーション
  'message-circle': MessageCircle, 'message-square': MessageSquare,
  mail: Mail, 'mail-x': MailX, send: Send, phone: Phone, video: Video,
  // アワード・実績
  trophy: Trophy, crown: Crown, award: Award, medal: Medal,
  star: Star, sparkles: Sparkles, 'party-popper': PartyPopper,
  gem: Gem, target: Target, flag: Flag,
  // ショッピング・ギフト
  gift: Gift, 'shopping-cart': ShoppingCart, 'shopping-bag': ShoppingBag,
  'credit-card': CreditCard, banknote: Banknote, coins: Coins, receipt: Receipt,
  // 食事・ドリンク
  wine: Wine, beer: Beer, coffee: Coffee, 'cooking-pot': CookingPot,
  'utensils-crossed': UtensilsCrossed, cherry: Cherry, cake: Cake, 'ice-cream-cone': IceCreamCone,
  // 自然・天気
  sun: Sun, moon: Moon, cloud: Cloud, 'cloud-rain': CloudRain,
  snowflake: Snowflake, flower: Flower, 'flower-2': Flower2,
  'tree-pine': TreePine, mountain: Mountain, waves: Waves,
  // 動物
  cat: Cat, dog: Dog, bird: Bird, fish: Fish, bug: Bug,
  rabbit: Rabbit, squirrel: Squirrel, turtle: Turtle,
  // ハート・感情
  heart: Heart, 'heart-handshake': HeartHandshake,
  'thumbs-up': ThumbsUp, 'thumbs-down': ThumbsDown,
  smile: Smile, laugh: Laugh, frown: Frown, angry: Angry,
  // 時間・カレンダー
  clock: Clock, calendar: Calendar, 'calendar-days': CalendarDays,
  timer: Timer, hourglass: Hourglass, alarm: AlarmClock,
  // ファイル・ドキュメント
  'file-text': FileText, folder: Folder, 'book-open': BookOpen,
  bookmark: Bookmark, 'clipboard-list': ClipboardList,
  newspaper: Newspaper, 'notebook-pen': NotebookPen,
  // 建物・場所
  'building-2': Building2, store: Store, school: School, landmark: Landmark,
  'map-pin': MapPin, globe: Globe, compass: Compass, navigation: Navigation,
  // テクノロジー
  smartphone: Smartphone, monitor: Monitor, laptop: Laptop,
  wifi: Wifi, bluetooth: Bluetooth, camera: Camera, 'qr-code': QrCode, cpu: Cpu,
  // セキュリティ
  shield: Shield, 'shield-check': ShieldCheck,
  lock: Lock, unlock: Unlock, key: Key, fingerprint: Fingerprint,
  // チャート・データ
  'bar-chart-3': BarChart3, 'trending-up': TrendingUp, 'trending-down': TrendingDown,
  'pie-chart': PieChart, activity: Activity,
  // ツール・設定
  tag: Tag, palette: Palette, rocket: Rocket,
  'alert-triangle': AlertTriangle, info: Info, 'help-circle': HelpCircle,
  image: Image, download: Download, upload: Upload,
  'trash-2': Trash2, 'edit-3': Edit3, copy: Copy, scissors: Scissors, wrench: Wrench,
  // 交通
  car: Car, bike: Bike, plane: Plane, ship: Ship, train: Train,
  // スポーツ
  dumbbell: Dumbbell,
  // その他
  flame: Flame, lightbulb: Lightbulb, umbrella: Umbrella,
  glasses: Glasses, shirt: Shirt, watch: Watch,
  hash: Hash, 'at-sign': AtSign, percent: Percent,
  'circle-dollar-sign': CircleDollarSign, infinity: Infinity, binary: Binary,
}

export const AVAILABLE_ICONS = Object.keys(ICON_COMPONENTS)

// ─── Phosphor Icons ─────────────────────────────────────────────────────────
import {
  Star as PhStar, Heart as PhHeart, House as PhHouse,
  Crown as PhCrown, Trophy as PhTrophy, Diamond as PhDiamond,
  Gift as PhGift, Bell as PhBell, Sparkle as PhSparkle,
  Confetti as PhConfetti, Medal as PhMedal, SealCheck as PhSealCheck,
  MusicNote as PhMusicNote, MusicNotes as PhMusicNotes,
  Guitar as PhGuitar, Headphones as PhHeadphones,
  Microphone as PhMicrophone, MicrophoneStage as PhMicrophoneStage,
  Radio as PhRadio, VinylRecord as PhVinylRecord,
  PianoKeys as PhPianoKeys, SpeakerHigh as PhSpeakerHigh,
  Broadcast as PhBroadcast, Webcam as PhWebcam,
  User as PhUser, Users as PhUsers, UserCircle as PhUserCircle,
  Smiley as PhSmiley, SmileyWink as PhSmileyWink, UserSound as PhUserSound,
  ChatCircle as PhChatCircle, ChatCircleText as PhChatCircleText,
  Envelope as PhEnvelope, PaperPlaneTilt as PhPaperPlaneTilt,
  Phone as PhPhone, VideoCamera as PhVideoCamera, Megaphone as PhMegaphone,
  Sun as PhSun, Moon as PhMoon, Cloud as PhCloud,
  Flower as PhFlower, Leaf as PhLeaf, Snowflake as PhSnowflake,
  Tree as PhTree, Lightning as PhLightning, Drop as PhDrop,
  Fire as PhFire, Waves as PhWaves,
  Monitor as PhMonitor, Laptop as PhLaptop, DeviceMobile as PhDeviceMobile,
  Desktop as PhDesktop, Screencast as PhScreencast,
} from '@phosphor-icons/react'

const PH_ICONS = {
  'star': PhStar, 'heart': PhHeart, 'house': PhHouse,
  'crown': PhCrown, 'trophy': PhTrophy, 'diamond': PhDiamond,
  'gift': PhGift, 'bell': PhBell, 'sparkle': PhSparkle,
  'confetti': PhConfetti, 'medal': PhMedal, 'seal-check': PhSealCheck,
  'music-note': PhMusicNote, 'music-notes': PhMusicNotes,
  'guitar': PhGuitar, 'headphones': PhHeadphones,
  'microphone': PhMicrophone, 'microphone-stage': PhMicrophoneStage,
  'radio': PhRadio, 'vinyl-record': PhVinylRecord,
  'piano-keys': PhPianoKeys, 'speaker-high': PhSpeakerHigh,
  'broadcast': PhBroadcast, 'webcam': PhWebcam,
  'user': PhUser, 'users': PhUsers, 'user-circle': PhUserCircle,
  'smiley': PhSmiley, 'smiley-wink': PhSmileyWink, 'user-sound': PhUserSound,
  'chat-circle': PhChatCircle, 'chat-circle-text': PhChatCircleText,
  'envelope': PhEnvelope, 'paper-plane-tilt': PhPaperPlaneTilt,
  'phone': PhPhone, 'video-camera': PhVideoCamera, 'megaphone': PhMegaphone,
  'sun': PhSun, 'moon': PhMoon, 'cloud': PhCloud,
  'flower': PhFlower, 'leaf': PhLeaf, 'snowflake': PhSnowflake,
  'tree': PhTree, 'lightning': PhLightning, 'drop': PhDrop,
  'fire': PhFire, 'waves': PhWaves,
  'monitor': PhMonitor, 'laptop': PhLaptop, 'device-mobile': PhDeviceMobile,
  'desktop': PhDesktop, 'screencast': PhScreencast,
}

// ─── Tabler Icons ────────────────────────────────────────────────────────────
import {
  IconStar as TbStar, IconHeart as TbHeart, IconHome as TbHome,
  IconCrown as TbCrown, IconTrophy as TbTrophy, IconDiamond as TbDiamond,
  IconGift as TbGift, IconBell as TbBell, IconFlame as TbFlame,
  IconBolt as TbBolt, IconConfetti as TbConfetti, IconMedal as TbMedal,
  IconAward as TbAward,
  IconMusic as TbMusic, IconHeadphones as TbHeadphones,
  IconMicrophone as TbMicrophone, IconRadio as TbRadio,
  IconPiano as TbPiano, IconVinyl as TbVinyl,
  IconSpeakerphone as TbSpeakerphone, IconBroadcast as TbBroadcast,
  IconScreenShare as TbScreenShare,
  IconUser as TbUser, IconUsers as TbUsers,
  IconMoodSmile as TbMoodSmile, IconMoodHappy as TbMoodHappy,
  IconUserCheck as TbUserCheck,
  IconMessageCircle as TbMessageCircle, IconMail as TbMail,
  IconPhone as TbPhone, IconVideo as TbVideo,
  IconSun as TbSun, IconMoon as TbMoon, IconCloud as TbCloud,
  IconFlower as TbFlower, IconLeaf as TbLeaf, IconSnowflake as TbSnowflake,
  IconTree as TbTree, IconWaveSine as TbWaveSine,
  IconCamera as TbCamera, IconDeviceDesktop as TbMonitor,
  IconDeviceMobile as TbDeviceMobile, IconDeviceLaptop as TbDeviceLaptop,
  IconWifi as TbWifi, IconCpu as TbCpu, IconChartBar as TbChartBar,
  IconBrandTwitch as TbBrandTwitch, IconBrandYoutube as TbBrandYoutube,
  IconBrandInstagram as TbBrandInstagram, IconBrandTwitter as TbBrandTwitter,
  IconBrandTiktok as TbBrandTiktok, IconBrandTelegram as TbBrandTelegram,
  IconBrandLine as TbBrandLine,
} from '@tabler/icons-react'

const TB_ICONS = {
  'star': TbStar, 'heart': TbHeart, 'home': TbHome,
  'crown': TbCrown, 'trophy': TbTrophy, 'diamond': TbDiamond,
  'gift': TbGift, 'bell': TbBell, 'flame': TbFlame,
  'bolt': TbBolt, 'confetti': TbConfetti, 'medal': TbMedal, 'award': TbAward,
  'music': TbMusic, 'headphones': TbHeadphones,
  'microphone': TbMicrophone, 'radio': TbRadio,
  'piano': TbPiano, 'vinyl': TbVinyl,
  'speakerphone': TbSpeakerphone, 'broadcast': TbBroadcast,
  'screen-share': TbScreenShare,
  'user': TbUser, 'users': TbUsers,
  'mood-smile': TbMoodSmile, 'mood-happy': TbMoodHappy, 'user-check': TbUserCheck,
  'message-circle': TbMessageCircle, 'mail': TbMail,
  'phone': TbPhone, 'video': TbVideo,
  'sun': TbSun, 'moon': TbMoon, 'cloud': TbCloud,
  'flower': TbFlower, 'leaf': TbLeaf, 'snowflake': TbSnowflake,
  'tree': TbTree, 'wave-sine': TbWaveSine,
  'camera': TbCamera, 'monitor': TbMonitor,
  'device-mobile': TbDeviceMobile, 'device-laptop': TbDeviceLaptop,
  'wifi': TbWifi, 'cpu': TbCpu, 'chart-bar': TbChartBar,
  'brand-twitch': TbBrandTwitch, 'brand-youtube': TbBrandYoutube,
  'brand-instagram': TbBrandInstagram, 'brand-twitter': TbBrandTwitter,
  'brand-tiktok': TbBrandTiktok, 'brand-telegram': TbBrandTelegram,
  'brand-line': TbBrandLine,
}

// ─── Heroicons ────────────────────────────────────────────────────────────────
import {
  StarIcon as HiStar, HeartIcon as HiHeart, HomeIcon as HiHome,
  GiftIcon as HiGift, BellIcon as HiBell, BoltIcon as HiBolt,
  FireIcon as HiFire, SparklesIcon as HiSparkles, TrophyIcon as HiTrophy,
  MusicalNoteIcon as HiMusicalNote, MicrophoneIcon as HiMicrophone,
  SpeakerWaveIcon as HiSpeakerWave, PlayIcon as HiPlay,
  FilmIcon as HiFilm, TvIcon as HiTv, RadioIcon as HiRadio,
  UserIcon as HiUser, UserGroupIcon as HiUserGroup,
  FaceSmileIcon as HiFaceSmile,
  ChatBubbleLeftIcon as HiChatBubbleLeft, EnvelopeIcon as HiEnvelope,
  PhoneIcon as HiPhone, VideoCameraIcon as HiVideoCamera,
  PaperAirplaneIcon as HiPaperAirplane, MegaphoneIcon as HiMegaphone,
  SunIcon as HiSun, MoonIcon as HiMoon, CloudIcon as HiCloud,
  CameraIcon as HiCamera,
  ComputerDesktopIcon as HiComputerDesktop,
  DevicePhoneMobileIcon as HiDevicePhoneMobile,
  WifiIcon as HiWifi,
  MagnifyingGlassIcon as HiMagnifyingGlass,
  ShoppingCartIcon as HiShoppingCart, CreditCardIcon as HiCreditCard,
  MapPinIcon as HiMapPin, GlobeAltIcon as HiGlobeAlt,
  CalendarIcon as HiCalendar, ClockIcon as HiClock,
  TagIcon as HiTag, RocketLaunchIcon as HiRocketLaunch, KeyIcon as HiKey,
} from '@heroicons/react/24/outline'

const HI_ICONS = {
  'star': HiStar, 'heart': HiHeart, 'home': HiHome,
  'gift': HiGift, 'bell': HiBell, 'bolt': HiBolt,
  'fire': HiFire, 'sparkles': HiSparkles, 'trophy': HiTrophy,
  'musical-note': HiMusicalNote, 'microphone': HiMicrophone,
  'speaker-wave': HiSpeakerWave, 'play': HiPlay,
  'film': HiFilm, 'tv': HiTv, 'radio': HiRadio,
  'user': HiUser, 'user-group': HiUserGroup, 'face-smile': HiFaceSmile,
  'chat-bubble-left': HiChatBubbleLeft, 'envelope': HiEnvelope,
  'phone': HiPhone, 'video-camera': HiVideoCamera,
  'paper-airplane': HiPaperAirplane, 'megaphone': HiMegaphone,
  'sun': HiSun, 'moon': HiMoon, 'cloud': HiCloud,
  'camera': HiCamera,
  'computer-desktop': HiComputerDesktop,
  'device-phone-mobile': HiDevicePhoneMobile,
  'wifi': HiWifi,
  'magnifying-glass': HiMagnifyingGlass,
  'shopping-cart': HiShoppingCart, 'credit-card': HiCreditCard,
  'map-pin': HiMapPin, 'globe-alt': HiGlobeAlt,
  'calendar': HiCalendar, 'clock': HiClock,
  'tag': HiTag, 'rocket-launch': HiRocketLaunch, 'key': HiKey,
}

const IconRenderer = ({ icon, size = 24, className = '' }) => {
  if (!icon) return null

  // Phosphor: "ph:icon-name" or "ph:icon-name:weight"
  if (icon.startsWith('ph:')) {
    const parts = icon.slice(3).split(':')
    const name = parts[0]
    const weight = parts[1] || 'regular'
    const Component = PH_ICONS[name]
    if (Component) return <Component size={size} weight={weight} className={className} />
    return <span className={className} style={{ fontSize: size }}>?</span>
  }

  // Tabler: "tb:icon-name"
  if (icon.startsWith('tb:')) {
    const name = icon.slice(3)
    const Component = TB_ICONS[name]
    if (Component) return <Component size={size} className={className} />
    return <span className={className} style={{ fontSize: size }}>?</span>
  }

  // Heroicons: "hi:icon-name"
  if (icon.startsWith('hi:')) {
    const name = icon.slice(3)
    const Component = HI_ICONS[name]
    if (Component) return <Component width={size} height={size} className={className} />
    return <span className={className} style={{ fontSize: size }}>?</span>
  }

  // Lucide (既存)
  const Component = ICON_COMPONENTS[icon]
  if (Component) return <Component size={size} className={className} />

  // 絵文字フォールバック
  return <span className={className} style={{ fontSize: size }}>{icon}</span>
}

export default IconRenderer
