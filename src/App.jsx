import React, { useMemo, useState } from 'react';

function App() {
  const basePrice = 20;

  const fabrics = [
    { id: 'cotton-solid', name: 'Cotton Solid', description: 'Breathable everyday fabric', priceDelta: 0 },
    { id: 'cotton-striped', name: 'Cotton Striped', description: 'Playful stripe pattern', priceDelta: 3 },
  ];

  const sleeves = [
    {
      id: 'bishop',
      name: 'Bishop Sleeve',
      description: 'Soft, full sleeve gathered into a cuff for a dreamy look.',
      priceDelta: 4,
      imageUrl: '/sleeves/Bishop.jpg',
    },
    {
      id: 'classic-puff',
      name: 'Classic Puff Sleeve',
      description: 'Soft puff at the shoulder for a cute everyday look.',
      priceDelta: 2,
      imageUrl: '/sleeves/classic-puff.jpg',
    },
    {
      id: 'flutter',
      name: 'Flutter Sleeve',
      description: 'Flowy flutter shape that moves with you.',
      priceDelta: 3,
      imageUrl: '/sleeves/flutter.jpg',
    },
    {
      id: 'short-cap',
      name: 'Short Cap Sleeve',
      description: 'Light, short sleeve that keeps it casual and airy.',
      priceDelta: 0,
      imageUrl: '/sleeves/short-cap.jpg',
    },
    {
      id: 'strap',
      name: 'Strap / Spaghetti Sleeve',
      description: 'Delicate straps for a breezy, summery feel.',
      priceDelta: 2,
      imageUrl: '/sleeves/strap.jpg',
    },
  ];

  const neckOptions = [
    { id: 'crew', label: 'Crew Neck', priceDelta: 0 },
    { id: 'v-neck', label: 'V–Neck', priceDelta: 2 },
    { id: 'boat', label: 'Boat Neck', priceDelta: 3 },
  ];

  const lengthOptions = [
    { id: 'regular', label: 'Regular', priceDelta: 0 },
    { id: 'crop', label: 'Crop', priceDelta: 1 },
    { id: 'longline', label: 'Longline', priceDelta: 2 },
  ];

  const fitOptions = [
    { id: 'regular-fit', label: 'Regular Fit', priceDelta: 0 },
    { id: 'slim-fit', label: 'Slim Fit', priceDelta: 2 },
    { id: 'oversized', label: 'Oversized', priceDelta: 1 },
  ];

  const [selectedFabric, setSelectedFabric] = useState('cotton-solid');
  const [selectedSleeve, setSelectedSleeve] = useState('short-cap');
  const [selectedNeck, setSelectedNeck] = useState('crew');
  const [selectedLength, setSelectedLength] = useState('regular');
  const [selectedFit, setSelectedFit] = useState('regular-fit');
  const [size, setSize] = useState('-');
  const [quantity, setQuantity] = useState(1);
  const [expandedSection, setExpandedSection] = useState('size');
  const [showBreakdown, setShowBreakdown] = useState(false);

  const fabric = fabrics.find((f) => f.id === selectedFabric);
  const sleeve = sleeves.find((s) => s.id === selectedSleeve);
  const neck = neckOptions.find((n) => n.id === selectedNeck);
  const length = lengthOptions.find((l) => l.id === selectedLength);
  const fit = fitOptions.find((f) => f.id === selectedFit);

  const unitTotal = useMemo(() => {
    return (
      basePrice +
      (fabric?.priceDelta ?? 0) +
      (sleeve?.priceDelta ?? 0) +
      (neck?.priceDelta ?? 0) +
      (length?.priceDelta ?? 0) +
      (fit?.priceDelta ?? 0)
    );
  }, [basePrice, fabric, sleeve, neck, length, fit]);

  const lineTotal = unitTotal * quantity;

  const formatPrice = (value) => `$${value.toFixed(2)}`;

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (next > 10) return 10;
      return next;
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white font-semibold">W</span>
            <span className="font-semibold tracking-tight">WeaveWear</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm text-slate-600">
            <button className="hover:text-primary">Tops</button>
            <button className="hover:text-primary">How It Works</button>
            <button className="hover:text-primary">About</button>
          </nav>
          <button className="relative inline-flex items-center gap-2 text-sm font-medium">
            <span>Cart</span>
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-white">0</span>
          </button>
        </div>
      </header>

      <main className="flex-1 bg-slate-50/60">
        <section className="max-w-6xl mx-auto px-4 py-8 md:py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">Custom teen top builder</p>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">Pick your Size, Fabric, Sleeves &amp; More</h1>
          <p className="text-sm text-slate-600 max-w-2xl">
            Start from one base top and tap through simple choices. Every pick updates the preview and your price.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 pb-10 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="space-y-6">
            <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-4 md:p-5 flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="md:w-1/2 flex flex-col gap-3 sticky top-24 self-start">
                  <div className="flex flex-wrap gap-2 text-[11px]">
                    {[
                      { id: 'size', label: 'Size' },
                      { id: 'fabric', label: 'Fabric' },
                      { id: 'sleeves', label: 'Sleeves' },
                      { id: 'neck', label: 'Neck' },
                      { id: 'fit', label: 'Fit' },
                      { id: 'length', label: 'Length' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setExpandedSection(item.id)}
                        className={`rounded-full border px-3 py-1.5 font-medium transition ${
                          expandedSection === item.id
                            ? 'border-primary bg-primary text-white'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-primary/50'
                        }`}
                      >
                        Pick {item.label}
                      </button>
                    ))}
                  </div>

                  <div className="relative w-full max-w-xs mx-auto">
                    <div className="aspect-[3/4] rounded-3xl bg-gradient-to-br from-primary/5 via-white to-accent/10 border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden">
                      <img
                        src={sleeve?.imageUrl || '/top/BlueFlow.jpg'}
                        alt="Teen Basic Top preview"
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </div>
                </div>

                <div className="md:w-1/2 space-y-4 text-sm">
                  <div>
                    <h2 className="text-base md:text-lg font-semibold tracking-tight mb-1">Teen Basic Top</h2>
                    <p className="text-xs text-slate-500">From {formatPrice(basePrice)}</p>
                    <p className="mt-2 text-xs text-slate-600">
                      Pick a size, fabric, sleeve, neck, fit and length. Your choices keep this top teen-friendly and unique.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[11px] font-medium text-slate-500 mb-1">Quantity</p>
                      <div className="inline-flex items-center rounded-full border border-slate-200 bg-white overflow-hidden">
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(-1)}
                          className="h-8 w-8 flex items-center justify-center text-slate-600 hover:bg-slate-50"
                        >
                          −
                        </button>
                        <span className="w-10 text-center text-xs font-medium">{quantity}</span>
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(1)}
                          className="h-8 w-8 flex items-center justify-center text-slate-600 hover:bg-slate-50"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 mt-2">
                    <p>
                      Size: <span className="font-medium text-slate-700">{size}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-4 md:p-5 text-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary mb-2">Your top</p>
              <p className="text-xs text-slate-600 mb-3">
                Price updates as you tap through options. No surprises at checkout.
              </p>
              <div className="mb-3">
                <p className="text-[11px] text-slate-500 mb-1">One top</p>
                <p className="text-2xl font-semibold tracking-tight">{formatPrice(unitTotal)}</p>
              </div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-600">
                  Line total ({quantity} {quantity === 1 ? 'top' : 'tops'})
                </span>
                <span className="font-semibold text-slate-900">{formatPrice(lineTotal)}</span>
              </div>
              <button
                type="button"
                onClick={() => setShowBreakdown((prev) => !prev)}
                className="w-full text-[11px] text-slate-600 flex items-center justify-between border border-dashed border-slate-200 rounded-2xl px-3 py-2 mb-3 hover:border-primary/50"
              >
                <span>See how this price is built</span>
                <span>{showBreakdown ? '–' : '+'}</span>
              </button>
              {showBreakdown && (
                <ul className="space-y-1.5 text-xs text-slate-600 mb-3">
                  <li className="flex justify-between gap-2">
                    <span>Base top</span>
                    <span>{formatPrice(basePrice)}</span>
                  </li>
                  <li className="flex justify-between gap-2">
                    <span>Fabric · {fabric?.name}</span>
                    <span>{fabric?.priceDelta ? `+ ${formatPrice(fabric.priceDelta)}` : 'Included'}</span>
                  </li>
                  <li className="flex justify-between gap-2">
                    <span>Sleeves · {sleeve?.name}</span>
                    <span>{sleeve?.priceDelta ? `+ ${formatPrice(sleeve.priceDelta)}` : 'Included'}</span>
                  </li>
                  <li className="flex justify-between gap-2">
                    <span>Neck · {neck?.label}</span>
                    <span>{neck?.priceDelta ? `+ ${formatPrice(neck.priceDelta)}` : 'Included'}</span>
                  </li>
                  <li className="flex justify-between gap-2">
                    <span>Length · {length?.label}</span>
                    <span>{length?.priceDelta ? `+ ${formatPrice(length.priceDelta)}` : 'Included'}</span>
                  </li>
                  <li className="flex justify-between gap-2">
                    <span>Fit · {fit?.label}</span>
                    <span>{fit?.priceDelta ? `+ ${formatPrice(fit.priceDelta)}` : 'Included'}</span>
                  </li>
                </ul>
              )}
              <button className="mt-1 w-full rounded-full bg-primary text-white text-sm font-medium py-2.5 shadow-sm hover:bg-primary/90">
                Add to cart (preview only)
              </button>
              <p className="mt-2 text-[11px] text-slate-500">
                Later, you can connect this builder to a cart, checkout, and real payment.
              </p>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="space-y-3">
              <AccordionSection
                id="size"
                title="Pick your size"
                description="Choose the size that fits you best."
                expandedSection={expandedSection}
                setExpandedSection={setExpandedSection}
              >
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {['XS', 'S', 'M', 'L', 'XL'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSize(option)}
                      className={`h-8 px-3 rounded-full border font-medium transition ${
                        size === option
                          ? 'border-primary bg-primary text-white'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-primary/50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </AccordionSection>

              <AccordionSection
                id="fabric"
                title="Pick your fabric"
                description="Choose the base fabric and pattern."
                expandedSection={expandedSection}
                setExpandedSection={setExpandedSection}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {fabrics.map((option) => {
                    const selected = selectedFabric === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setSelectedFabric(option.id)}
                        className={`flex items-center gap-3 rounded-2xl border p-3 text-left text-xs transition ${
                          selected
                            ? 'border-primary bg-primary/5 shadow-sm'
                            : 'border-slate-200 bg-white hover:border-primary/50'
                        }`}
                      >
                        <span
                          className={`h-10 w-10 rounded-xl border shadow-inner ${
                            option.id === 'cotton-striped'
                              ? 'bg-[linear-gradient(135deg,#f97316_0,#f97316_20%,#facc15_20%,#facc15_40%,#22c55e_40%,#22c55e_60%,#3b82f6_60%,#3b82f6_80%,#a855f7_80%,#a855f7_100%)]'
                              : 'bg-slate-100'
                          }`}
                        />
                        <div className="flex-1">
                          <p className="font-medium text-slate-800">{option.name}</p>
                          <p className="text-slate-500 line-clamp-2">{option.description}</p>
                        </div>
                        <span className="text-[11px] font-medium text-slate-700">
                          {option.priceDelta ? `+ $${option.priceDelta}` : 'Included'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </AccordionSection>

              <AccordionSection
                id="sleeves"
                title="Pick your sleeves"
                description="Choose the sleeve shape you like. The preview will switch to show it."
                expandedSection={expandedSection}
                setExpandedSection={setExpandedSection}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sleeves.map((option) => {
                    const selected = selectedSleeve === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setSelectedSleeve(option.id)}
                        className={`flex items-center gap-3 rounded-2xl border p-3 text-left text-xs transition ${
                          selected
                            ? 'border-primary bg-primary/5 shadow-sm'
                            : 'border-slate-200 bg-white hover:border-primary/50'
                        }`}
                      >
                        {option.imageUrl ? (
                          <img
                            src={option.imageUrl}
                            alt={option.name}
                            className="h-16 w-14 rounded-xl border border-slate-200 object-cover bg-slate-50"
                          />
                        ) : (
                          <div className="h-16 w-14 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] text-slate-500">
                            <span className="text-center leading-tight">Sleeve</span>
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-slate-800">{option.name}</p>
                          <p className="text-slate-500 line-clamp-2">{option.description}</p>
                        </div>
                        <span className="text-[11px] font-medium text-slate-700">
                          {option.priceDelta ? `+ $${option.priceDelta}` : 'Included'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </AccordionSection>

              <AccordionSection
                id="neck"
                title="Pick your neck style"
                description="Crew, V or boat neckline."
                expandedSection={expandedSection}
                setExpandedSection={setExpandedSection}
              >
                <VariationGroup
                  title="Neck style"
                  help=""
                  options={neckOptions}
                  selectedId={selectedNeck}
                  onSelect={setSelectedNeck}
                />
              </AccordionSection>

              <AccordionSection
                id="fit"
                title="Pick your fit"
                description="Closer fit or more relaxed."
                expandedSection={expandedSection}
                setExpandedSection={setExpandedSection}
              >
                <VariationGroup
                  title="Fit"
                  help=""
                  options={fitOptions}
                  selectedId={selectedFit}
                  onSelect={setSelectedFit}
                />
              </AccordionSection>

              <AccordionSection
                id="length"
                title="Pick your length"
                description="Crop, regular or longline."
                expandedSection={expandedSection}
                setExpandedSection={setExpandedSection}
              >
                <VariationGroup
                  title="Length"
                  help=""
                  options={lengthOptions}
                  selectedId={selectedLength}
                  onSelect={setSelectedLength}
                />
              </AccordionSection>
            </div>
          </aside>
        </section>
      </main>

      <footer className="border-t bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4 text-xs text-slate-500 flex justify-between">
          <span>© {new Date().getFullYear()} WeaveWear</span>
          <span>Customizable teen tops demo</span>
        </div>
      </footer>
    </div>
  );
}

function VariationGroup({ title, help, options, selectedId, onSelect }) {
  return (
    <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-4 md:p-5 text-xs">
      <div className="mb-2">
        <h3 className="text-sm font-semibold tracking-tight mb-0.5">{title}</h3>
        <p className="text-[11px] text-slate-500">{help}</p>
      </div>
      <div className="space-y-1.5">
        {options.map((option) => {
          const selected = selectedId === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className={`w-full flex items-center justify-between gap-2 rounded-xl border px-3 py-2 text-left transition ${
                selected
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-primary/50'
              }`}
            >
              <span className="flex items-center gap-2">
                <span
                  className={`h-3 w-3 rounded-full border ${
                    selected ? 'border-primary bg-primary' : 'border-slate-300 bg-white'
                  }`}
                />
                <span className="font-medium text-slate-800">{option.label}</span>
              </span>
              <span className="text-[11px] font-medium text-slate-700">
                {option.priceDelta ? `+ $${option.priceDelta}` : 'Included'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function AccordionSection({ id, title, description, expandedSection, setExpandedSection, children }) {
  const expanded = expandedSection === id;

  return (
    <div className="rounded-3xl bg-white border border-slate-200 shadow-sm">
      <button
        type="button"
        onClick={() => setExpandedSection(expanded ? '' : id)}
        className="w-full flex items-center justify-between px-4 py-3 md:px-5 md:py-4 text-left"
      >
        <div>
          <h3 className="text-sm font-semibold tracking-tight mb-0.5">{title}</h3>
          {description ? <p className="text-[11px] text-slate-500">{description}</p> : null}
        </div>
        <span className="text-xs text-slate-500">{expanded ? 'Hide' : 'Show'}</span>
      </button>
      {expanded && <div className="border-t border-slate-100 px-4 py-3 md:px-5 md:py-4 text-xs">{children}</div>}
    </div>
  );
}

export default App;
