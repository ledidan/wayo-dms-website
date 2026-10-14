import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  Smartphone,
  X,
  Plus,
} from "lucide-react";
import { StoreBadge } from "../components/StoreBadge";
import { downloads, type StorePlatform } from "../config/downloads";

const platforms = [
  {
    id: "ios" as const,
    name: "iOS",
    devices: "Dành cho iPhone",
    number: "01",
    description:
      "Cài đặt Wayo trực tiếp trên iPhone bằng Safari. Phiên bản iOS 1.0.8, dành cho iOS 15.1 trở lên.",
    instructions:
      "Mở trang này trong Safari trên iPhone, nhấn banner và xác nhận Cài đặt khi thiết bị hiển thị lời nhắc.",
  },
  {
    id: "android" as const,
    name: "Android",
    devices: "Dành cho điện thoại Android",
    number: "02",
    description:
      "Tải bộ cài Wayo cho Android. Mở file APK sau khi tải để cài đặt ứng dụng trên điện thoại.",
    instructions:
      "Nhấn banner để tải APK. Mở file đã tải và làm theo hướng dẫn cài đặt trên thiết bị.",
  },
];

function StoreNotice({
  platform,
  onClose,
}: {
  platform: StorePlatform;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const platformName = platform === "ios" ? "iPhone" : "Android";
  useEffect(() => {
    dialog.current?.showModal();
  }, []);
  return (
    <dialog
      ref={dialog}
      className="legal-modal store-notice"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby="store-notice-title"
    >
      <button
        type="button"
        autoFocus
        aria-label="Đóng thông báo"
        onClick={onClose}
      >
        <X />
      </button>
      <span className="download-icon">
        <Download size={24} />
      </span>
      <h2 id="store-notice-title">Cài đặt từ website HTTPS</h2>
      <p>
        Để cài Wayo trên {platformName}, hãy mở trang tải ứng dụng đã xuất bản
        qua HTTPS trong Safari trên iPhone. Bản xem trước localhost chưa hỗ trợ
        cài đặt iOS trực tiếp. Bạn vẫn có thể tải bộ IPA và manifest bên dưới.
      </p>
      <a
        className="button"
        href={downloads.iosBundle}
        download="wayo-dms-ios.zip"
      >
        Tải IPA + manifest <Download size={16} />
      </a>
    </dialog>
  );
}

export function DownloadsPage() {
  const [notice, setNotice] = useState<StorePlatform | null>(null);

  return (
    <>
      <section className="download-hero">
        <div className="container">
          <a href="/" className="download-breadcrumb">
            Trang chủ <span>/</span> Tải ứng dụng
          </a>
          <div className="eyebrow">
            <span /> WAYO DMS MOBILE
          </div>
          <h1>
            Cài đặt Wayo.
            <br />
            <em>Kết nối trên mọi hành trình.</em>
          </h1>
          <p>
            Chọn hệ điều hành của bạn để tải ứng dụng Wayo.
            <br />
            Đồng hành cùng đội ngũ bán hàng, từ văn phòng đến từng điểm bán.
          </p>
          <div className="download-hero-tags">
            <span>
              <Smartphone size={15} /> iOS & Android
            </span>
            <span>
              <CheckCircle2 size={15} /> Dành cho đội ngũ thị trường
            </span>
          </div>
        </div>
      </section>

      <section
        className="download-platforms container"
        aria-labelledby="platform-heading"
      >
        <div className="download-section-heading">
          <div>
            <div className="eyebrow">CHỌN PHIÊN BẢN PHÙ HỢP</div>
            <h2 id="platform-heading">Wayo trên điện thoại của bạn.</h2>
          </div>
          <p>Bấm vào banner để cài iOS hoặc tải APK Android.</p>
        </div>
        <div className="download-platform-grid">
          {platforms.map((platform) => (
            <article
              key={platform.id}
              id={platform.id}
              className="download-platform-card"
            >
              <div className="download-card-top">
                <span className="platform-number">{platform.number}</span>
                <span>{platform.devices}</span>
              </div>
              <h3>Hệ điều hành {platform.name}</h3>
              <p>{platform.description}</p>
              <div className="store-banner">
                <StoreBadge
                  platform={platform.id}
                  onUnavailable={() => setNotice(platform.id)}
                />
              </div>
              <div className="download-card-help">
                <Download size={17} />
                <p>{platform.instructions}</p>
              </div>
              {/* {platform.id === "ios" ? (
                <>
                  <div className="ios-file-downloads">
                    <a
                      className="ios-bundle-link"
                      href={downloads.iosBundle}
                      download="wayo-dms-ios.zip"
                    >
                      <Download size={15} /> Tải bộ iOS (IPA + manifest)
                    </a>
                    <div>
                      <a href={downloads.ipa} download="wayodms.ipa">
                        Tải IPA
                      </a>
                      <span>·</span>
                      <a href={downloads.manifest} download="manifest.plist">
                        Tải manifest
                      </a>
                    </div>
                  </div>
                  <details className="install-guidance">
                    <summary>
                      Hướng dẫn mở ứng dụng sau cài đặt <Plus size={14} />
                    </summary>
                    <p>
                      Nếu iPhone yêu cầu xác nhận nhà phát triển: mở Cài đặt →
                      Cài đặt chung → VPN &amp; Quản lý thiết bị, chọn hồ sơ nhà
                      phát triển của ứng dụng và xác nhận Tin cậy. Tên mục có
                      thể khác theo phiên bản iOS. Từ iOS 18, thiết bị có thể
                      yêu cầu Cho phép &amp; Khởi động lại.
                    </p>
                  </details>
                </>
              ) : (
                <details className="install-guidance">
                  <summary>
                    Hướng dẫn cài file APK <Plus size={14} />
                  </summary>
                  <p>
                    Mở file wayo-dms.apk vừa tải. Nếu thiết bị yêu cầu quyền cài
                    ứng dụng từ trình duyệt hoặc trình quản lý tệp, làm theo
                    hướng dẫn trên màn hình cho ứng dụng bạn đang dùng để mở
                    file.
                  </p>
                </details>
              )} */}
              <span className="direct-distribution-label">
                {platform.id === "ios"
                  ? "Bản cài đặt iOS trực tiếp · IPA + manifest"
                  : "Bản cài đặt Android trực tiếp · APK"}
              </span>
            </article>
          ))}
        </div>
        <p className="store-trademarks">
          Apple và App Store là nhãn hiệu của Apple Inc. Google Play và logo
          Google Play là nhãn hiệu của Google LLC.
        </p>
      </section>

      <section className="download-start-section">
        <div className="container download-start-grid">
          <div className="download-phone-preview">
            <img
              src="/images/wayo-dashboard-mobile.png"
              width="1179"
              height="2556"
              alt="Giao diện tổng quan Wayo DMS trên iPhone"
              loading="lazy"
            />
          </div>
          <div className="download-start-copy">
            <div className="eyebrow">BẮT ĐẦU TRONG VÀI BƯỚC</div>
            <h2>
              Sẵn sàng làm việc.
              <br />
              Dù bạn đang ở đâu.
            </h2>
            <ol className="download-steps">
              <li>
                <span>1</span>
                <div>
                  <h3>Cài đặt ứng dụng</h3>
                  <p>
                    Trên iPhone, mở bằng Safari và xác nhận cài đặt. Trên
                    Android, tải APK rồi mở file để cài.
                  </p>
                </div>
              </li>
              <li>
                <span>2</span>
                <div>
                  <h3>Đăng nhập tài khoản doanh nghiệp</h3>
                  <p>Sử dụng tài khoản do quản trị viên doanh nghiệp cấp.</p>
                </div>
              </li>
              <li>
                <span>3</span>
                <div>
                  <h3>Kết nối công việc mỗi ngày</h3>
                  <p>
                    Xem tổng quan, điểm bán và đơn hàng theo quyền truy cập của
                    bạn.
                  </p>
                </div>
              </li>
            </ol>
            <a className="text-link" href="/#demo">
              Cần hỗ trợ cài đặt? Liên hệ đội ngũ Wayo <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>
      {notice && (
        <StoreNotice platform={notice} onClose={() => setNotice(null)} />
      )}
    </>
  );
}
