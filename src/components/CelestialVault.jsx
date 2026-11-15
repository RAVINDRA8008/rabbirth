import React, { useState } from 'react';

const NODES = [
  {
    id: 1,
    title: 'The Electric Wit',
    coord: 'RA 15h 11m · DEC +28°',
    quote: '"Sharp, disarming, and impossible to forget. You bring life and laughter effortlessly wherever you go."',
    tag: 'ESSENCE'
  },
  {
    id: 2,
    title: 'The Sovereign Aura',
    coord: 'RA 11h 15m · DEC +44°',
    quote: '"You carry yourself with a natural, unforced magnetism. No photographs required—your presence lingers long after you leave."',
    tag: 'ELEGANCE'
  },
  {
    id: 3,
    title: 'The Unfiltered Heart',
    coord: 'RA 15h 45m · DEC +12°',
    quote: '"Real, authentic, and utterly devoid of pretense. A rare soul in a world of manufactured imitations."',
    tag: 'INTEGRITY'
  },
  {
    id: 4,
    title: 'The Golden Horizon',
    coord: 'RA 11h 00m · DEC +88°',
    quote: '"May this fifteenth of November inaugurate twelve months of boundless luck, wild triumph, and pure delight."',
    tag: 'DESTINY'
  }
];

export default function CelestialVault() {
  const [activeNode, setActiveNode] = useState(NODES[0]);

  return (
    <section className="py-24 px-6 sm:px-12 lg:px-20 border-b border-ink-border bg-ink relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="flex items-center space-x-3 text-gold text-xs tracking-widest-plus uppercase mb-4">
            <span className="h-px w-8 bg-gold/40 inline-block" />
            <span>Folio No. 04 — The Celestial Coordinates</span>
          </div>

          <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <h2 className="text-3xl sm:text-5xl font-title tracking-wide text-bone-pure">
                November 15 Constellation
              </h2>
              <p className="font-editorial italic text-xl sm:text-2xl text-bone-muted mt-2">
                "Four coordinates mapped in tribute to Rabbit."
              </p>
            </div>
            <span className="font-mono text-xs text-bone-dark tracking-widest uppercase">
              SECTOR: 15.11 · ASCENDANT
            </span>
          </div>
        </div>

        {/* Interactive Grid of Astronomical Coordinates */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Selector List */}
          <div className="md:col-span-5 space-y-3">
            {NODES.map((node) => {
              const isActive = activeNode.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => setActiveNode(node)}
                  className={`p-5 cursor-pointer border transition-all duration-300 text-left ${
                    isActive
                      ? 'border-gold bg-ink-light text-bone-pure shadow-gold-subtle'
                      : 'border-ink-border/70 hover:border-gold/40 bg-ink-light/20 text-bone-muted'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono tracking-widest uppercase mb-1">
                    <span className={isActive ? 'text-gold' : 'text-bone-dark'}>
                      {node.coord}
                    </span>
                    <span className="text-gold/60">{node.tag}</span>
                  </div>
                  <div className="font-title text-base sm:text-lg tracking-wide">
                    {node.title}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Coordinate Monograph */}
          <div className="md:col-span-7 p-8 sm:p-12 border border-ink-border bg-ink-light/40 backdrop-blur-sm gold-border-glow min-h-[300px] flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center text-[10px] font-mono tracking-super-wide text-gold uppercase border-b border-ink-border pb-4 mb-6">
                <span>COORDINATE DISCOVERY</span>
                <span>FOR: RABBIT · 15.11</span>
              </div>

              <h3 className="font-title text-2xl sm:text-3xl text-bone-pure mb-6">
                {activeNode.title}
              </h3>

              <p className="font-editorial italic text-2xl sm:text-3xl text-bone leading-relaxed">
                {activeNode.quote}
              </p>
            </div>

            <div className="pt-8 border-t border-ink-border/60 flex justify-between items-center text-[10px] tracking-widest uppercase font-mono text-bone-dark">
              <span>ORBIT: FIXED</span>
              <span className="text-gold">✦ ✦ ✦</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
