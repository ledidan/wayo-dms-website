const distributionBase = 'https://pub-49ac702f59c8453b8965d53831cc2d4a.r2.dev';

export const downloads = {
  ipa: `${distributionBase}/ios-distribution/wayodms.ipa`,
  apk: `${distributionBase}/android-distribution/wayo-dms.apk`,
  manifest: '/ios-distribution/manifest.plist',
  iosBundle: '/downloads/wayo-dms-ios.zip',
  iosVersion: '1.0.8',
  minimumIOS: '15.1',
};

export type StorePlatform = 'ios' | 'android';

export function getDownloadUrl(platform: StorePlatform): string {
  return platform === 'ios' ? downloads.iosBundle : downloads.apk;
}

export function getIOSManifestUrl(): string | null {
  const configured = import.meta.env.VITE_IOS_MANIFEST_URL;
  try {
    const url = new URL(configured || downloads.manifest, window.location.origin);
    return url.protocol === 'https:' && !url.username && !url.password ? url.href : null;
  } catch {
    return null;
  }
}

export function getInstallUrl(platform: StorePlatform): string | null {
  if (platform === 'android') return downloads.apk;
  const manifest = getIOSManifestUrl();
  return manifest ? `itms-services://?action=download-manifest&url=${encodeURIComponent(manifest)}` : null;
}
