// カテゴリ定義
export const FONT_CATEGORIES = [
  { id: 'all', label: 'すべて' },
  { id: 'japanese', label: '日本語' },
  { id: 'serif', label: '明朝・セリフ' },
  { id: 'sans-serif', label: 'ゴシック・サンセリフ' },
  { id: 'display', label: 'ディスプレイ' },
  { id: 'handwriting', label: '手書き風' },
]

// キュレート済みフォント一覧
const url = (family, weights = '400;700') =>
  `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weights}&display=swap`

export const FONT_DATABASE = [
  // 日本語フォント
  { family: 'Noto Sans JP', category: 'japanese', cssFamily: "'Noto Sans JP', sans-serif", cssUrl: url('Noto Sans JP', '400;500;700') },
  { family: 'Noto Serif JP', category: 'japanese', cssFamily: "'Noto Serif JP', serif", cssUrl: url('Noto Serif JP', '400;500;700') },
  { family: 'M PLUS 1p', category: 'japanese', cssFamily: "'M PLUS 1p', sans-serif", cssUrl: url('M PLUS 1p', '400;500;700') },
  { family: 'M PLUS 2', category: 'japanese', cssFamily: "'M PLUS 2', sans-serif", cssUrl: url('M PLUS 2', '400;500;700') },
  { family: 'M PLUS Rounded 1c', category: 'japanese', cssFamily: "'M PLUS Rounded 1c', sans-serif", cssUrl: url('M PLUS Rounded 1c', '400;500;700') },
  { family: 'Kosugi Maru', category: 'japanese', cssFamily: "'Kosugi Maru', sans-serif", cssUrl: url('Kosugi Maru', '400') },
  { family: 'Sawarabi Mincho', category: 'japanese', cssFamily: "'Sawarabi Mincho', serif", cssUrl: url('Sawarabi Mincho', '400') },
  { family: 'Sawarabi Gothic', category: 'japanese', cssFamily: "'Sawarabi Gothic', sans-serif", cssUrl: url('Sawarabi Gothic', '400') },
  { family: 'Zen Kaku Gothic New', category: 'japanese', cssFamily: "'Zen Kaku Gothic New', sans-serif", cssUrl: url('Zen Kaku Gothic New', '400;500;700') },
  { family: 'Zen Maru Gothic', category: 'japanese', cssFamily: "'Zen Maru Gothic', sans-serif", cssUrl: url('Zen Maru Gothic', '400;500;700') },
  { family: 'Zen Old Mincho', category: 'japanese', cssFamily: "'Zen Old Mincho', serif", cssUrl: url('Zen Old Mincho', '400;700') },
  { family: 'Shippori Mincho', category: 'japanese', cssFamily: "'Shippori Mincho', serif", cssUrl: url('Shippori Mincho', '400;500;700') },
  { family: 'BIZ UDGothic', category: 'japanese', cssFamily: "'BIZ UDGothic', sans-serif", cssUrl: url('BIZ UDGothic', '400;700') },
  { family: 'BIZ UDMincho', category: 'japanese', cssFamily: "'BIZ UDMincho', serif", cssUrl: url('BIZ UDMincho', '400;700') },
  { family: 'Klee One', category: 'japanese', cssFamily: "'Klee One', cursive", cssUrl: url('Klee One', '400;600') },
  { family: 'Hachi Maru Pop', category: 'japanese', cssFamily: "'Hachi Maru Pop', cursive", cssUrl: url('Hachi Maru Pop', '400') },
  { family: 'Yusei Magic', category: 'japanese', cssFamily: "'Yusei Magic', sans-serif", cssUrl: url('Yusei Magic', '400') },
  { family: 'Yomogi', category: 'japanese', cssFamily: "'Yomogi', cursive", cssUrl: url('Yomogi', '400') },
  { family: 'Dela Gothic One', category: 'japanese', cssFamily: "'Dela Gothic One', sans-serif", cssUrl: url('Dela Gothic One', '400') },
  { family: 'Reggae One', category: 'japanese', cssFamily: "'Reggae One', sans-serif", cssUrl: url('Reggae One', '400') },
  { family: 'RocknRoll One', category: 'japanese', cssFamily: "'RocknRoll One', sans-serif", cssUrl: url('RocknRoll One', '400') },
  { family: 'Stick', category: 'japanese', cssFamily: "'Stick', sans-serif", cssUrl: url('Stick', '400') },
  { family: 'DotGothic16', category: 'japanese', cssFamily: "'DotGothic16', sans-serif", cssUrl: url('DotGothic16', '400') },
  { family: 'Zen Antique', category: 'japanese', cssFamily: "'Zen Antique', serif", cssUrl: url('Zen Antique', '400') },

  // セリフ
  { family: 'Playfair Display', category: 'serif', cssFamily: "'Playfair Display', serif", cssUrl: url('Playfair Display', '400;700;900') },
  { family: 'Cinzel', category: 'serif', cssFamily: "'Cinzel', serif", cssUrl: url('Cinzel', '400;700;900') },
  { family: 'Cormorant Garamond', category: 'serif', cssFamily: "'Cormorant Garamond', serif", cssUrl: url('Cormorant Garamond', '400;600;700') },
  { family: 'Lora', category: 'serif', cssFamily: "'Lora', serif", cssUrl: url('Lora', '400;600;700') },
  { family: 'Merriweather', category: 'serif', cssFamily: "'Merriweather', serif", cssUrl: url('Merriweather', '400;700') },
  { family: 'EB Garamond', category: 'serif', cssFamily: "'EB Garamond', serif", cssUrl: url('EB Garamond', '400;600;700') },
  { family: 'Libre Baskerville', category: 'serif', cssFamily: "'Libre Baskerville', serif", cssUrl: url('Libre Baskerville', '400;700') },

  // サンセリフ
  { family: 'Inter', category: 'sans-serif', cssFamily: "'Inter', sans-serif", cssUrl: url('Inter', '400;500;700') },
  { family: 'Montserrat', category: 'sans-serif', cssFamily: "'Montserrat', sans-serif", cssUrl: url('Montserrat', '400;700;900') },
  { family: 'Poppins', category: 'sans-serif', cssFamily: "'Poppins', sans-serif", cssUrl: url('Poppins', '400;600;700') },
  { family: 'Raleway', category: 'sans-serif', cssFamily: "'Raleway', sans-serif", cssUrl: url('Raleway', '400;700;900') },
  { family: 'Open Sans', category: 'sans-serif', cssFamily: "'Open Sans', sans-serif", cssUrl: url('Open Sans', '400;600;700') },
  { family: 'Lato', category: 'sans-serif', cssFamily: "'Lato', sans-serif", cssUrl: url('Lato', '400;700') },
  { family: 'Nunito', category: 'sans-serif', cssFamily: "'Nunito', sans-serif", cssUrl: url('Nunito', '400;600;700') },
  { family: 'Quicksand', category: 'sans-serif', cssFamily: "'Quicksand', sans-serif", cssUrl: url('Quicksand', '400;500;700') },
  { family: 'DM Sans', category: 'sans-serif', cssFamily: "'DM Sans', sans-serif", cssUrl: url('DM Sans', '400;500;700') },

  // ディスプレイ
  { family: 'Orbitron', category: 'display', cssFamily: "'Orbitron', sans-serif", cssUrl: url('Orbitron', '400;700;900') },
  { family: 'Bebas Neue', category: 'display', cssFamily: "'Bebas Neue', sans-serif", cssUrl: url('Bebas Neue', '400') },
  { family: 'Righteous', category: 'display', cssFamily: "'Righteous', sans-serif", cssUrl: url('Righteous', '400') },
  { family: 'Josefin Sans', category: 'display', cssFamily: "'Josefin Sans', sans-serif", cssUrl: url('Josefin Sans', '400;600;700') },
  { family: 'Russo One', category: 'display', cssFamily: "'Russo One', sans-serif", cssUrl: url('Russo One', '400') },
  { family: 'Audiowide', category: 'display', cssFamily: "'Audiowide', sans-serif", cssUrl: url('Audiowide', '400') },
  { family: 'Bungee', category: 'display', cssFamily: "'Bungee', sans-serif", cssUrl: url('Bungee', '400') },
  { family: 'Press Start 2P', category: 'display', cssFamily: "'Press Start 2P', monospace", cssUrl: url('Press Start 2P', '400') },

  // 手書き風
  { family: 'Dancing Script', category: 'handwriting', cssFamily: "'Dancing Script', cursive", cssUrl: url('Dancing Script', '400;700') },
  { family: 'Pacifico', category: 'handwriting', cssFamily: "'Pacifico', cursive", cssUrl: url('Pacifico', '400') },
  { family: 'Caveat', category: 'handwriting', cssFamily: "'Caveat', cursive", cssUrl: url('Caveat', '400;700') },
  { family: 'Great Vibes', category: 'handwriting', cssFamily: "'Great Vibes', cursive", cssUrl: url('Great Vibes', '400') },
  { family: 'Sacramento', category: 'handwriting', cssFamily: "'Sacramento', cursive", cssUrl: url('Sacramento', '400') },
  { family: 'Satisfy', category: 'handwriting', cssFamily: "'Satisfy', cursive", cssUrl: url('Satisfy', '400') },
]
