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

const IconRenderer = ({ icon, size = 24, className = '' }) => {
  if (!icon) return null

  const Component = ICON_COMPONENTS[icon]
  if (Component) {
    return <Component size={size} className={className} />
  }

  // 絵文字フォールバック
  return <span className={className} style={{ fontSize: size }}>{icon}</span>
}

export default IconRenderer
