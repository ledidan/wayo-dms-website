import { getDownloadUrl, type StorePlatform } from '../config/downloads';

const platforms = {
  ios: { name: 'iPhone', image: '/images/stores/app-store.svg' },
  android: { name: 'Android', image: '/images/stores/google-play.png' },
};

export function StoreBadge({ platform }: { platform: StorePlatform }) {
  const product = platforms[platform];
  const url = getDownloadUrl(platform);
  const className = `store-badge store-badge-${platform}`;
  const image = <img src={product.image} alt={`Tải Wayo cho ${product.name}`} />;

  return <a className={className} href={url}
    download={platform === 'android' ? 'wayo-dms.apk' : 'wayo-dms-ios.zip'}
    aria-label={platform === 'android' ? 'Tải Wayo cho Android (APK)' : 'Tải Wayo cho iPhone (IPA + manifest)'}>
    {image}
  </a>;
}
