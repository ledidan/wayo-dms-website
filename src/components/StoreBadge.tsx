import { getInstallUrl, type StorePlatform } from '../config/downloads';

const platforms = {
  ios: { name: 'iPhone', image: '/images/stores/app-store.svg' },
  android: { name: 'Android', image: '/images/stores/google-play.png' },
};

export function StoreBadge({ platform, onUnavailable }: {
  platform: StorePlatform;
  onUnavailable?: () => void;
}) {
  const product = platforms[platform];
  const url = getInstallUrl(platform);
  const className = `store-badge store-badge-${platform}`;
  const image = <img src={product.image} alt={`Cài đặt Wayo trên ${product.name}`} />;

  if (!url && onUnavailable) {
    return <button type="button" className={className} onClick={onUnavailable}
      aria-label={`Hướng dẫn cài đặt Wayo trên ${product.name}`}>{image}</button>;
  }
  return <a className={className} href={url || `/tai-ung-dung#${platform}`}
    download={platform === 'android' ? 'wayo-dms.apk' : undefined}
    aria-label={platform === 'android' ? 'Tải Wayo cho Android (APK)' : 'Cài đặt Wayo trên iPhone'}>
    {image}
  </a>;
}
