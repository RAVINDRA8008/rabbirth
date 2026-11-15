import React, { useState } from 'react';
import { sounds } from '../utils/soundEffects';
import { fireGrandCelebration, fireGoldLeafShower, fireCakeCutFanfare } from '../utils/confettiCannons';
import BalloonFiesta from './BalloonFiesta';

export default function ExperienceHUD({
  stage = 1,
  setStage,
  candleBlown = false,
  setCandleBlown,
  cakeCut = false,
  setCakeCut,
  onToast,
  onOpenLetter,
}) {
  const [isMuted, setIsMuted] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);

  const toggleSoundMute = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  const toggleMusic = () => {
    const playing = sounds.toggleMusic();
    setIsMusicPlaying(playing);
  };

  const handleEnterGala = () => {
    sounds.playConfettiFanfare();
    fireGrandCelebration();
    setStage(2);
    // Start music on first interaction
    if (!isMusicPlaying && !isMuted) {
      sounds.startMusic();
      setIsMusicPlaying(true);
    }
  };

  const handleBlowCandle = () => {
    sounds.playCandleBlow();
    setCandleBlown(true);
    fireGoldLeafShower();
  };

  const handleCutCake = () => {
    sounds.playCakeSlice();
    setCakeCut(true);
    fireCakeCutFanfare();
  };

  const handleOpenGift = () => {
    sounds.playGiftOpen();
    setGiftOpened(true);
    fireGrandCelebration();
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
            sounds.playConfettiFanfare();
            fireGrandCelebration();
          }}
        />
      )}

      {/* Floating Haute Couture Stepper & Stage Navigator Docked Top */}
      <div className="pointer-events-none fixed top-3 sm:top-5 inset-x-0 z-30 flex flex-col items-center px-3 sm:px-4">
        <div className="pointer-events-auto flex items-center space-x-1.5 sm:space-x-3 px-3 sm:px-6 py-2 rounded-full bg-white/90 backdrop-blur-2xl border border-amber-300/40 shadow-soft-float">
          {/* Stage 1 Pill */}
          <button
            onClick={() => setStage(1)}
            className={`flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all ${
              stage === 1
                ? 'bg-gradient-to-r from-rose-deep to-rose-vibrant text-white shadow-md scale-105'
                : 'text-espresso-soft hover:text-rose-deep'
            }`}
          >
            <span>🎪</span>
            <span className="hidden sm:inline">1. Gala Entrance</span>
          </button>

          <div className="w-2 sm:w-4 h-[1.5px] bg-amber-300/40" />

          {/* Stage 2 Pill */}
          <button
            onClick={() => setStage(2)}
            className={`flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all ${
              stage === 2
                ? 'bg-gradient-to-r from-rose-deep to-rose-vibrant text-white shadow-md scale-105'
                : 'text-espresso-soft hover:text-rose-deep'
            }`}
          >
            <span>🎂</span>
            <span className="hidden sm:inline">2. Wish & Slice</span>
          </button>

          <div className="w-2 sm:w-4 h-[1.5px] bg-amber-300/40" />

          {/* Stage 3 Pill */}
          <button
            onClick={() => setStage(3)}
            className={`flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all ${
              stage === 3
                ? 'bg-gradient-to-r from-rose-deep to-rose-vibrant text-white shadow-md scale-105'
                : 'text-espresso-soft hover:text-rose-deep'
            }`}
          >
            <span>🎈</span>
            <span className="hidden sm:inline">3. Balloons & Gifts</span>
          </button>

          <div className="w-2 sm:w-4 h-[1.5px] bg-amber-300/40" />

          {/* Stage 4 Pill */}
          <button
            onClick={() => {
              setStage(4);
              onOpenLetter();
            }}
            className={`flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all ${
              stage === 4
                ? 'bg-gradient-to-r from-rose-deep to-rose-vibrant text-white shadow-md scale-105'
                : 'text-espresso-soft hover:text-rose-deep'
            }`}
          >
            <span>💌</span>
            <span className="hidden sm:inline">4. Birthday Note</span>
          </button>

          {/* Audio Controls Divider */}
          <div className="border-l border-amber-300/40 pl-2 sm:pl-3 flex items-center space-x-1.5">
            {/* Music Box Toggle */}
            <button
              onClick={toggleMusic}
              title={isMusicPlaying ? 'Pause Birthday Music' : 'Play Birthday Music'}
              className={`p-1.5 rounded-full transition-all text-xs flex items-center space-x-1 ${
                isMusicPlaying
                  ? 'bg-rose-50 text-rose-deep border border-rose-200'
                  : 'hover:bg-amber-50 text-espresso-muted'
              }`}
            >
              <span>🎵</span>
              {isMusicPlaying && (
                <span className="flex space-x-0.5 items-end h-3">
                  <span className="w-0.5 h-3 bg-rose-deep animate-pulse" />
                  <span className="w-0.5 h-2 bg-rose-vibrant animate-pulse delay-75" />
                  <span className="w-0.5 h-3 bg-gold-warm animate-pulse delay-150" />
                </span>
              )}
            </button>

            {/* Mute SFX Toggle */}
            <button
              onClick={toggleSoundMute}
              title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
              className="p-1.5 rounded-full hover:bg-amber-50 text-espresso transition-colors text-xs"
            >
              {isMuted ? '🔇' : '🔔'}
            </button>
          </div>
        </div>
      </div>

      {/* Top Left Title & Quick Trigger */}
      <div className="pointer-events-none fixed top-16 sm:top-20 inset-x-0 z-20 flex justify-between items-start px-4 sm:px-8">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 px-3 py-0.5 rounded-full bg-white/90 border border-amber-300/30 text-rose-deep text-[11px] font-bold shadow-sm backdrop-blur-md">
            <span>✨</span>
            <span className="tracking-wide">15th November · Born To Shine</span>
            <span>✨</span>
          </div>
          <h1 className="font-display text-2xl sm:text-4xl text-espresso font-extrabold tracking-tight drop-shadow-sm">
            Happy Birthday, Rabbit! <span className="text-rose-vibrant">💖</span>
          </h1>
        </div>

        {/* Quick Open Birthday Note Button */}
        <button
          onClick={onOpenLetter}
          className="pointer-events-auto flex items-center space-x-2 px-4 py-2 rounded-full bg-white/95 border border-amber-300/40 text-espresso hover:text-rose-deep font-bold text-xs tracking-wider shadow-soft-float hover:scale-105 active:scale-95 transition-all"
        >
          <span>💌</span>
          <span className="hidden sm:inline">Open Birthday Note</span>
        </button>
      </div>

      {/* 3D Cake Interaction Tip (Center-Bottom) */}
      <div className="pointer-events-none fixed inset-x-0 bottom-36 sm:bottom-44 z-20 flex justify-center px-4">
        <div className="inline-block px-4 py-1.5 rounded-full bg-white/75 backdrop-blur-md border border-amber-200/40 text-[11px] font-medium text-espresso-muted shadow-sm">
          🎂 Drag to rotate cake in 360° · Scroll to zoom · Click balloons to POP!
        </div>
      </div>

      {/* Bottom Main Interactive Deck */}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 sm:bottom-6 z-30 flex justify-center px-3 sm:px-4">
        <div className="pointer-events-auto w-full max-w-xl p-5 sm:p-7 rounded-3xl bg-white/92 backdrop-blur-2xl border border-amber-300/40 shadow-dreamy text-center transition-all animate-fadeIn">
          {/* STAGE 1: GRAND PARTY ENTRANCE */}
          {stage === 1 && (
            <div className="space-y-3.5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-50 text-rose-deep text-xs font-bold border border-rose-200">
                <span>✨</span>
                <span>VIP Birthday Gala · 15th November</span>
                <span>✨</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl text-espresso font-extrabold">
                Welcome to Rabbit's Birthday Gala! 🐰💖
              </h2>
              <p className="font-sans text-xs sm:text-sm text-espresso-soft max-w-md mx-auto">
                Step inside the high-octane 3D celebration crafted exclusively for Rabbit. A 24K gold patisserie masterpiece, floating helium balloons, and heartfelt surprises await!
              </p>
              <div className="pt-1 flex flex-wrap justify-center gap-3">
                <button
                  onClick={handleEnterGala}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-rose-deep via-rose-vibrant to-gold-warm text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
                >
                  ✨ Enter The Celebration & Light Candles! ✨
                </button>
              </div>
            </div>
          )}

          {/* STAGE 2: BLOW CANDLE & CUT CAKE */}
          {stage === 2 && (
            <div className="space-y-3.5">
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

              <div className="pt-1 flex flex-wrap justify-center gap-3">
                {!candleBlown ? (
                  <button
                    onClick={handleBlowCandle}
                    className="px-7 py-3 rounded-full bg-gradient-to-r from-rose-deep via-rose-vibrant to-gold-warm text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg hover:scale-105 active:scale-95 transition-all"
                  >
                    🌬️ Blow The Candle & Make Wish!
                  </button>
                ) : !cakeCut ? (
                  <button
                    onClick={handleCutCake}
                    className="px-7 py-3 rounded-full bg-gradient-to-r from-gold-warm via-amber-500 to-rose-vibrant text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg hover:scale-105 active:scale-95 transition-all animate-pulse"
                  >
                    🔪 Cut The First Slice!
                  </button>
                ) : (
                  <button
                    onClick={() => setStage(3)}
                    className="px-7 py-3 rounded-full bg-gradient-to-r from-rose-deep via-rose-vibrant to-gold text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg hover:scale-105 active:scale-95 transition-all"
                  >
                    🎈 Proceed to Balloons & Mystery Gifts! →
                  </button>
                )}

                {candleBlown && !cakeCut && (
                  <button
                    onClick={() => setCandleBlown(false)}
                    className="px-4 py-2.5 rounded-full border border-rose-gold text-rose-deep hover:bg-rose-50 font-semibold text-xs transition-all"
                  >
                    🕯️ Relight Candle
                  </button>
                )}

                <button
                  onClick={onToast}
                  className="px-5 py-2.5 rounded-full bg-white/95 border border-amber-300/40 text-espresso font-bold text-xs tracking-wider shadow-sm hover:scale-105 active:scale-95 transition-all"
                >
                  🎉 Fire Confetti!
                </button>
              </div>
            </div>
          )}

          {/* STAGE 3: POP BALLOONS & UNBOX MYSTERY GIFT */}
          {stage === 3 && (
            <div className="space-y-3.5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200">
                <span>🎁</span>
                <span>Stage 3: Party Games & Mystery Delivery</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl text-espresso font-bold">
                Pop The Floating Balloons & Unbox Your Gift! 🎈✨
              </h2>
              <p className="font-sans text-xs sm:text-sm text-espresso-soft max-w-md mx-auto">
                Click any floating balloon on screen to pop it and collect magical birthday perks. Then untie the golden ribbon on Rabbit's mystery box!
              </p>

              <div className="pt-1 flex flex-wrap justify-center gap-3">
                {!giftOpened ? (
                  <button
                    onClick={handleOpenGift}
                    className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-400 via-rose-vibrant to-rose-deep text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg hover:scale-105 active:scale-95 transition-all animate-bounce"
                  >
                    🎁 Untie Satin Ribbon & Open Gift!
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setStage(4);
                      onOpenLetter();
                    }}
                    className="px-8 py-3 rounded-full bg-gradient-to-r from-rose-deep to-rose-vibrant text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg hover:scale-105 active:scale-95 transition-all"
                  >
                    💌 Read Rabbit's Birthday Note →
                  </button>
                )}

                <button
                  onClick={onToast}
                  className="px-5 py-2.5 rounded-full bg-white/95 border border-amber-300/40 text-espresso font-bold text-xs tracking-wider shadow-sm hover:scale-105 active:scale-95 transition-all"
                >
                  🎉 Fire Confetti!
                </button>
              </div>
            </div>
          )}

          {/* STAGE 4: GRAND FINALE & KEEPSAKES */}
          {stage === 4 && (
            <div className="space-y-3.5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-50 text-rose-deep text-xs font-bold border border-rose-200">
                <span>💌</span>
                <span>Stage 4: Grand Gala Climax & Birthday Note</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl text-espresso font-extrabold">
                Here's To You, Rabbit! 🐰🌟
              </h2>
              <p className="font-sans text-xs sm:text-sm text-espresso-soft max-w-md mx-auto">
                Thank you for being the amazing, vibrant person you are. The birthday note is ready for you whenever you want to revisit it!
              </p>

              <div className="pt-1 flex flex-wrap justify-center gap-3">
                <button
                  onClick={onOpenLetter}
                  className="px-7 py-3 rounded-full bg-gradient-to-r from-rose-deep via-rose-vibrant to-gold-warm text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg hover:scale-105 active:scale-95 transition-all"
                >
                  💌 Reopen Birthday Note
                </button>

                <button
                  onClick={() => {
                    setStage(1);
                    setCandleBlown(false);
                    setCakeCut(false);
                    setGiftOpened(false);
                  }}
                  className="px-5 py-2.5 rounded-full border border-rose-gold text-rose-deep hover:bg-rose-50 font-semibold text-xs transition-all"
                >
                  🔄 Replay Gala From Beginning
                </button>

                <button
                  onClick={onToast}
                  className="px-5 py-2.5 rounded-full bg-white/95 border border-amber-300/40 text-espresso font-bold text-xs tracking-wider shadow-sm hover:scale-105 active:scale-95 transition-all"
                >
                  🎆 Mega Fireworks!
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
