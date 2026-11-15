import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEffects';
import BalloonFiesta from './BalloonFiesta';

export default function CelebrationStages({
  stage,
  setStage,
  candleBlown,
  setCandleBlown,
  cakeCut,
  setCakeCut,
  onOpenLetter,
  onToast,
}) {
  const [giftOpened, setGiftOpened] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const toggleSound = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  const handleEnterParty = () => {
    sounds.playChime('grand');
    onToast();
    setStage(2);
  };

  const handleBlowCandle = () => {
    sounds.playBlow();
    setCandleBlown(true);
    onToast();
  };

  const handleCutCake = () => {
    sounds.playSlice();
    setCakeCut(true);
    sounds.playChime('grand');
    onToast();
  };

  const handleOpenGift = () => {
    sounds.playGiftUnbox();
    setGiftOpened(true);
    onToast();
    setTimeout(() => {
      setStage(4);
      onOpenLetter();
    }, 1200);
  };

  return (
    <>
      {/* Balloon Fiesta Layer (Active on Stage 3) */}
      {stage === 3 && (
        <BalloonFiesta
          onAllPopped={() => {
            sounds.playChime('grand');
            onToast();
          }}
        />
      )}

      {/* Floating Haute Couture Stepper & Stage Navigator */}
      <div className="pointer-events-none fixed top-4 sm:top-6 inset-x-0 z-30 flex flex-col items-center px-4">
        <div className="pointer-events-auto flex items-center space-x-2 sm:space-x-4 px-4 sm:px-6 py-2.5 rounded-full bg-white/85 backdrop-blur-xl border border-gold/40 shadow-soft-float">
          {/* Stage 1 Pill */}
          <button
            onClick={() => setStage(1)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              stage === 1
                ? 'bg-gradient-to-r from-rose-deep to-rose-vibrant text-white shadow-md scale-105'
                : 'text-espresso-soft hover:text-rose-deep'
            }`}
          >
            <span>🎉</span>
            <span className="hidden sm:inline">1. Gala Entrance</span>
          </button>

          {/* Connector */}
          <div className="w-3 sm:w-6 h-[2px] bg-gold/30" />

          {/* Stage 2 Pill */}
          <button
            onClick={() => setStage(2)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              stage === 2
                ? 'bg-gradient-to-r from-rose-deep to-rose-vibrant text-white shadow-md scale-105'
                : 'text-espresso-soft hover:text-rose-deep'
            }`}
          >
            <span>🎂</span>
            <span className="hidden sm:inline">2. Wish & Slice</span>
          </button>

          {/* Connector */}
          <div className="w-3 sm:w-6 h-[2px] bg-gold/30" />

          {/* Stage 3 Pill */}
          <button
            onClick={() => setStage(3)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              stage === 3
                ? 'bg-gradient-to-r from-rose-deep to-rose-vibrant text-white shadow-md scale-105'
                : 'text-espresso-soft hover:text-rose-deep'
            }`}
          >
            <span>🎈</span>
            <span className="hidden sm:inline">3. Balloons & Gifts</span>
          </button>

          {/* Connector */}
          <div className="w-3 sm:w-6 h-[2px] bg-gold/30" />

          {/* Stage 4 Pill */}
          <button
            onClick={() => {
              setStage(4);
              onOpenLetter();
            }}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              stage === 4
                ? 'bg-gradient-to-r from-rose-deep to-rose-vibrant text-white shadow-md scale-105'
                : 'text-espresso-soft hover:text-rose-deep'
            }`}
          >
            <span>💌</span>
            <span className="hidden sm:inline">4. Keepsake Note</span>
          </button>

          {/* Audio Toggle */}
          <div className="border-l border-gold/40 pl-2">
            <button
              onClick={toggleSound}
              title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
              className="p-1.5 rounded-full hover:bg-blush-light text-espresso transition-colors text-sm"
            >
              {isMuted ? '🔇' : '🔔'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage Controller Card (Docked Bottom) */}
      <div className="pointer-events-none fixed inset-x-0 bottom-6 sm:bottom-8 z-30 flex justify-center px-4">
        <div className="pointer-events-auto w-full max-w-xl p-6 sm:p-7 rounded-3xl bg-white/90 backdrop-blur-2xl border border-gold/40 shadow-dreamy text-center transition-all animate-fadeIn">
          {/* STAGE 1: GRAND PARTY ENTRANCE */}
          {stage === 1 && (
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-50 text-rose-deep text-xs font-bold border border-rose-200">
                <span>✨</span>
                <span>VIP Birthday Invitation · 15th November</span>
                <span>✨</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl text-espresso font-extrabold">
                Welcome to Rabbit's Birthday Gala! 🐰💖
              </h2>
              <p className="font-sans text-xs sm:text-sm text-espresso-soft max-w-md mx-auto">
                Step inside the high-octane 3D celebration crafted exclusively for Rabbit. A golden patisserie masterpiece, floating helium balloons, and surprises await!
              </p>
              <div className="pt-2">
                <button
                  onClick={handleEnterParty}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-deep via-rose-vibrant to-gold-warm text-white font-extrabold text-sm tracking-wide shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
                >
                  ✨ Enter The Celebration & Light Candles! ✨
                </button>
              </div>
            </div>
          )}

          {/* STAGE 2: BLOW CANDLE & CUT CAKE */}
          {stage === 2 && (
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-50 text-gold-warm text-xs font-bold border border-amber-200">
                <span>🎂</span>
                <span>Stage 2: Sacred Candle Ceremony & The First Slice</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl text-espresso font-bold">
                {!candleBlown
                  ? 'Make A Wish, Rabbit! 🕯️'
                  : !cakeCut
                  ? 'Your Wish Is In The Stars! Now Cut The Cake! 🍰'
                  : 'The First Slice Is Cut! Sweetest Year Ahead! 🍓'}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-espresso-soft max-w-md mx-auto">
                {!candleBlown
                  ? 'Close your eyes, think of your happiest wish for this year, and blow out the sparkling candle flame!'
                  : !cakeCut
                  ? 'Take the ceremonial golden knife and slice into the multi-layer strawberry buttercream cake!'
                  : 'Look at that delicious strawberry compote and sponge! You deserve every single sweet moment!'}
              </p>

              <div className="pt-2 flex flex-wrap justify-center gap-3">
                {!candleBlown ? (
                  <button
                    onClick={handleBlowCandle}
                    className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-deep via-rose-vibrant to-gold-warm text-white font-bold text-sm tracking-wide shadow-lg hover:scale-105 active:scale-95 transition-all"
                  >
                    🌬️ Blow The Candle & Make Wish!
                  </button>
                ) : !cakeCut ? (
                  <button
                    onClick={handleCutCake}
                    className="px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-warm via-amber-500 to-rose-vibrant text-white font-bold text-sm tracking-wide shadow-lg hover:scale-105 active:scale-95 transition-all animate-pulse"
                  >
                    🔪 Cut The First Slice!
                  </button>
                ) : (
                  <button
                    onClick={() => setStage(3)}
                    className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-deep via-rose-vibrant to-gold text-white font-bold text-sm tracking-wide shadow-lg hover:scale-105 active:scale-95 transition-all"
                  >
                    🎈 Proceed to Balloons & Mystery Gifts! →
                  </button>
                )}

                <button
                  onClick={onToast}
                  className="px-5 py-2.5 rounded-full bg-white/95 border border-gold/40 text-espresso font-bold text-xs tracking-wider shadow-sm hover:scale-105 active:scale-95 transition-all"
                >
                  🎉 Fire Confetti!
                </button>
              </div>
            </div>
          )}

          {/* STAGE 3: POP BALLOONS & UNBOX MYSTERY GIFT */}
          {stage === 3 && (
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200">
                <span>🎁</span>
                <span>Stage 3: Party Games & Mystery Delivery</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl text-espresso font-bold">
                Pop The Floating Balloons & Unbox Your Gift! 🎈✨
              </h2>
              <p className="font-sans text-xs sm:text-sm text-espresso-soft max-w-md mx-auto">
                Tap any floating balloon to pop it and collect magical birthday perks. Then untie the golden ribbon on Rabbit's mystery box!
              </p>

              <div className="pt-2 flex flex-wrap justify-center gap-3">
                {!giftOpened ? (
                  <button
                    onClick={handleOpenGift}
                    className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-rose-vibrant to-rose-deep text-white font-bold text-sm tracking-wide shadow-lg hover:scale-105 active:scale-95 transition-all animate-bounce"
                  >
                    🎁 Untie Satin Ribbon & Open Gift!
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setStage(4);
                      onOpenLetter();
                    }}
                    className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-deep to-rose-vibrant text-white font-bold text-sm tracking-wide shadow-lg hover:scale-105 active:scale-95 transition-all"
                  >
                    💌 Unfolded Keepsake Revealed! Read Note →
                  </button>
                )}

                <button
                  onClick={onToast}
                  className="px-5 py-2.5 rounded-full bg-white/95 border border-gold/40 text-espresso font-bold text-xs tracking-wider shadow-sm hover:scale-105 active:scale-95 transition-all"
                >
                  🎉 More Confetti!
                </button>
              </div>
            </div>
          )}

          {/* STAGE 4: HEARTFELT KEEPSAKE & GRAND FINALE */}
          {stage === 4 && (
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-50 text-rose-deep text-xs font-bold border border-rose-200">
                <span>💌</span>
                <span>Stage 4: Rabbit's Monogram Keepsake Note</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl text-espresso font-bold">
                Sealed With Love & Starlight 🐰💖
              </h2>
              <p className="font-sans text-xs sm:text-sm text-espresso-soft max-w-md mx-auto">
                May this new chapter bring endless laughter, incredible memories, delicious feasts, and unstoppable happiness!
              </p>

              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <button
                  onClick={onOpenLetter}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-deep via-rose-vibrant to-gold text-white font-bold text-sm tracking-wide shadow-lg hover:scale-105 active:scale-95 transition-all"
                >
                  📖 Re-read Birthday Note
                </button>

                <button
                  onClick={() => {
                    setStage(1);
                    setCandleBlown(false);
                    setCakeCut(false);
                    setGiftOpened(false);
                    sounds.playChime('grand');
                  }}
                  className="px-6 py-2.5 rounded-full border border-gold/50 text-espresso hover:bg-blush-light font-semibold text-xs transition-all"
                >
                  🔄 Replay Celebration
                </button>

                <button
                  onClick={onToast}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-gold-warm to-gold text-white font-bold text-xs tracking-wider shadow-sm hover:scale-105 active:scale-95 transition-all"
                >
                  🎆 Fireworks & Confetti!
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
