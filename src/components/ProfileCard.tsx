import React, { useEffect, useRef, useCallback, useMemo } from "react";
import "./ProfileCard.css";

export type ProfileCardProps = {
  avatarUrl?: string;
  iconUrl?: string;
  grainUrl?: string;
  behindGradient?: string;
  innerGradient?: string;
  showBehindGradient?: boolean;
  className?: string;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  mobileTiltSensitivity?: number;
  miniAvatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string; // without @
  status?: string;
  contactText?: string;
  showUserInfo?: boolean;
  onContactClick?: () => void;
};

const DEFAULT_BEHIND_GRADIENT =
  "radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y), hsla(260, 100%, 85%, calc(var(--card-opacity) * 0.35)) 10%, hsla(260, 60%, 70%, calc(var(--card-opacity) * 0.25)) 40%, transparent 70%), radial-gradient(35% 52% at 55% 20%, hsla(200, 85%, 60%, 0.18) 0%, transparent 100%), radial-gradient(100% 100% at 50% 50%, hsla(260, 70%, 70%, 0.15) 1%, transparent 76%), conic-gradient(from 124deg at 50% 50%, hsla(270, 70%, 60%, 0.2) 0%, hsla(200, 70%, 60%, 0.2) 50%, hsla(270, 70%, 60%, 0.2) 100%)";

const DEFAULT_INNER_GRADIENT =
  "linear-gradient(145deg, hsla(220, 40%, 22%, 0.6) 0%, hsla(260, 42%, 30%, 0.6) 100%)";

const ANIMATION_CONFIG = {
  SMOOTH_DURATION: 600,
  INITIAL_DURATION: 1500,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  DEVICE_BETA_OFFSET: 20,
};

const clamp = (value: number, min = 0, max = 100) =>
  Math.min(Math.max(value, min), max);

const round = (value: number, precision = 3) =>
  parseFloat(value.toFixed(precision));

const adjust = (
  value: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number
) => round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));

const easeInOutCubic = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

const ProfileCardComponent: React.FC<ProfileCardProps> = ({
  avatarUrl = "/thienzhicard.png",
  iconUrl,
  grainUrl,
  behindGradient,
  innerGradient,
  showBehindGradient = true,
  className = "",
  enableTilt = true,
  enableMobileTilt = true,
  mobileTiltSensitivity = 5,
  miniAvatarUrl,
  name = "Khoo Thien Zhi",
  title = "Software Engineer",
  handle = "thienzhi_",
  status = "Online",
  contactText = "Contact",
  showUserInfo = true,
  onContactClick,
}) => {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLElement | null>(null);

  const animationHandlers = useMemo(() => {
    if (!enableTilt) return null;

    let rafId: number | null = null;

    const updateCardTransform = (
      offsetX: number,
      offsetY: number,
      card: HTMLElement,
      wrap: HTMLDivElement
    ) => {
      const width = card.clientWidth;
      const height = card.clientHeight;

      const percentX = clamp((100 / width) * offsetX);
      const percentY = clamp((100 / height) * offsetY);

      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const properties: Record<string, string> = {
        "--pointer-x": `${percentX}%`,
        "--pointer-y": `${percentY}%`,
        "--background-x": `${adjust(percentX, 0, 100, 35, 65)}%`,
        "--background-y": `${adjust(percentY, 0, 100, 35, 65)}%`,
        "--pointer-from-center": `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        "--pointer-from-top": `${percentY / 100}`,
        "--pointer-from-left": `${percentX / 100}`,
        "--rotate-x": `${round(-(centerX / 5))}deg`,
        "--rotate-y": `${round(centerY / 4)}deg`,
      };

      Object.entries(properties).forEach(([property, value]) => {
        wrap.style.setProperty(property, value);
      });
    };

    const createSmoothAnimation = (
      duration: number,
      startX: number,
      startY: number,
      card: HTMLElement,
      wrap: HTMLDivElement
    ) => {
      const startTime = performance.now();
      const targetX = wrap.clientWidth / 2;
      const targetY = wrap.clientHeight / 2;

      const animationLoop = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = clamp(elapsed / duration);
        const easedProgress = easeInOutCubic(progress);

        const currentX = adjust(easedProgress, 0, 1, startX, targetX);
        const currentY = adjust(easedProgress, 0, 1, startY, targetY);

        updateCardTransform(currentX, currentY, card, wrap);

        if (progress < 1) {
          rafId = requestAnimationFrame(animationLoop);
        }
      };

      rafId = requestAnimationFrame(animationLoop);
    };

    return {
      updateCardTransform,
      createSmoothAnimation,
      cancelAnimation: () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
    };
  }, [enableTilt]);

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      const card = cardRef.current as HTMLElement | null;
      const wrap = wrapRef.current as HTMLDivElement | null;

      if (!card || !wrap || !animationHandlers) return;

      const rect = card.getBoundingClientRect();
      animationHandlers.updateCardTransform(
        event.clientX - rect.left,
        event.clientY - rect.top,
        card,
        wrap
      );
    },
    [animationHandlers]
  );

  const handlePointerEnter = useCallback(() => {
    const card = cardRef.current as HTMLElement | null;
    const wrap = wrapRef.current as HTMLDivElement | null;

    if (!card || !wrap || !animationHandlers) return;

    animationHandlers.cancelAnimation();
    wrap.classList.add("active");
    card.classList.add("active");
  }, [animationHandlers]);

  const handlePointerLeave = useCallback(
    (event: PointerEvent) => {
      const card = cardRef.current as HTMLElement | null;
      const wrap = wrapRef.current as HTMLDivElement | null;

      if (!card || !wrap || !animationHandlers) return;

      // event has offsetX/Y when from mouse events; provide fallback to center if undefined
      const offsetX = (event as any).offsetX ?? card.clientWidth / 2;
      const offsetY = (event as any).offsetY ?? card.clientHeight / 2;

      animationHandlers.createSmoothAnimation(
        ANIMATION_CONFIG.SMOOTH_DURATION,
        offsetX,
        offsetY,
        card,
        wrap
      );
      wrap.classList.remove("active");
      card.classList.remove("active");
    },
    [animationHandlers]
  );

  const handleDeviceOrientation = useCallback(
    (event: DeviceOrientationEvent) => {
      const card = cardRef.current as HTMLElement | null;
      const wrap = wrapRef.current as HTMLDivElement | null;

      if (!card || !wrap || !animationHandlers) return;

      const { beta, gamma } = event;
      if (beta == null || gamma == null) return;

      animationHandlers.updateCardTransform(
        card.clientHeight / 2 + gamma * mobileTiltSensitivity,
        card.clientWidth / 2 + (beta - ANIMATION_CONFIG.DEVICE_BETA_OFFSET) * mobileTiltSensitivity,
        card,
        wrap
      );
    },
    [animationHandlers, mobileTiltSensitivity]
  );

  useEffect(() => {
    if (!enableTilt || !animationHandlers) return;

    const card = cardRef.current as HTMLElement | null;
    const wrap = wrapRef.current as HTMLDivElement | null;

    if (!card || !wrap) return;

    const pointerMoveHandler = (e: Event) => handlePointerMove(e as PointerEvent);
    const pointerEnterHandler = () => handlePointerEnter();
    const pointerLeaveHandler = (e: Event) => handlePointerLeave(e as PointerEvent);
    const deviceOrientationHandler = (e: Event) => handleDeviceOrientation(e as DeviceOrientationEvent);

    const handleClick = () => {
      if (!enableMobileTilt || location.protocol !== "https:") return;
      const DME: any = (window as any).DeviceMotionEvent;
      if (DME && typeof DME.requestPermission === "function") {
        DME.requestPermission()
          .then((state: string) => {
            if (state === "granted") {
              window.addEventListener("deviceorientation", deviceOrientationHandler as EventListener);
            }
          })
          .catch((err: unknown) => console.error(err));
      } else {
        window.addEventListener("deviceorientation", deviceOrientationHandler as EventListener);
      }
    };

    card.addEventListener("pointerenter", pointerEnterHandler as EventListener);
    card.addEventListener("pointermove", pointerMoveHandler as EventListener);
    card.addEventListener("pointerleave", pointerLeaveHandler as EventListener);
    card.addEventListener("click", handleClick);

    const initialX = wrap.clientWidth - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;

    animationHandlers.updateCardTransform(initialX, initialY, card, wrap);
    animationHandlers.createSmoothAnimation(
      ANIMATION_CONFIG.INITIAL_DURATION,
      initialX,
      initialY,
      card,
      wrap
    );

    return () => {
      card.removeEventListener("pointerenter", pointerEnterHandler as EventListener);
      card.removeEventListener("pointermove", pointerMoveHandler as EventListener);
      card.removeEventListener("pointerleave", pointerLeaveHandler as EventListener);
      card.removeEventListener("click", handleClick);
      window.removeEventListener("deviceorientation", deviceOrientationHandler as EventListener);
      animationHandlers.cancelAnimation();
    };
  }, [
    enableTilt,
    enableMobileTilt,
    animationHandlers,
    handlePointerMove,
    handlePointerEnter,
    handlePointerLeave,
    handleDeviceOrientation,
  ]);

  const cardStyle = useMemo(
    () =>
      ({
        // CSS variables passed to the CSS file
        "--icon": iconUrl ? `url(${iconUrl})` : "none",
        "--grain": grainUrl ? `url(${grainUrl})` : "none",
        "--behind-gradient": showBehindGradient
          ? (behindGradient ?? DEFAULT_BEHIND_GRADIENT)
          : "none",
        "--inner-gradient": innerGradient ?? DEFAULT_INNER_GRADIENT,
      }) as React.CSSProperties,
    [iconUrl, grainUrl, showBehindGradient, behindGradient, innerGradient]
  );

  const handleContactClick = useCallback(() => {
    onContactClick?.();
  }, [onContactClick]);

  return (
    <div
      ref={wrapRef}
      className={`pc-card-wrapper ${className || ""}`.trim()}
      style={cardStyle}
    >
      <section ref={cardRef as any} className="pc-card" aria-label={`${name} interactive profile card`}>
        <div className="pc-inside" />
        <div className="pc-shine" />
        <div className="pc-glare" />

        <div className="pc-content pc-avatar-content">
          <img
            className="avatar"
            src={avatarUrl}
            alt={`${name || "User"} avatar`}
            loading="eager"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              target.style.display = "none";
            }}
          />
          {showUserInfo && (
            <div className="pc-user-info">
              <div className="pc-user-details">
                <div className="pc-mini-avatar">
                  <img
                    src={miniAvatarUrl || avatarUrl}
                    alt={`${name || "User"} mini avatar`}
                    loading="eager"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.style.opacity = "0.5";
                      target.src = avatarUrl;
                    }}
                  />
                </div>
                <div className="pc-user-text">
                  <div className="pc-handle">@{handle}</div>
                  <div className="pc-status">{status}</div>
                </div>
              </div>
              <button
                className="pc-contact-btn"
                onClick={handleContactClick}
                style={{ pointerEvents: "auto" }}
                type="button"
                aria-label={`Contact ${name || "user"}`}
              >
                {contactText}
              </button>
            </div>
          )}
        </div>

        <div className="pc-content">
          <div className="pc-details">
            <h3>{name}</h3>
            <p>{title}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

const ProfileCard = React.memo(ProfileCardComponent);

export default ProfileCard;
