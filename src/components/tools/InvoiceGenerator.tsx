"use client";

import React, { useState, useMemo } from "react";
import { Plus, Trash2, Printer, CheckCircle } from "lucide-react";
import Image from "next/image";
import BrandingOptions, { getBrandingConfig } from "@/components/workspace/BrandingOptions";


interface InvoiceItem {
  description: string;
  qty: number;
  price: number;
}

export default function InvoiceGenerator() {
  const [from, setFrom] = useState("Your Company\n123 Business Ave\nCity, Country");
  const [to, setTo] = useState("Client Company\n456 Client St\nCity, Country");
  const [invoiceNum, setInvoiceNum] = useState("INV-001");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [currency, setCurrency] = useState("$");
  const [taxRate, setTaxRate] = useState(10);
  const [notes, setNotes] = useState("Thank you for your business!");
  const [logo, setLogo] = useState<string | null>(null);
  
  const [items, setItems] = useState<InvoiceItem[]>([
    { description: "Web Development Services", qty: 1, price: 1500 },
  ]);

  const addItem = () => {
    setItems((prev) => [...prev, { description: "New Item", qty: 1, price: 100 }]);
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: any) => {
    const list = [...items];
    list[index] = {
      ...list[index],
      [field]: field === "description" ? value : Number(value),
    };
    setItems(list);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setLogo(url);
    }
  };

  const finances = useMemo(() => {
    const subtotal = items.reduce((acc, item) => acc + item.qty * item.price, 0);
    const tax = subtotal * (taxRate / 100);
    const total = subtotal + tax;
    return { subtotal, tax, total };
  }, [items, taxRate]);

  const handlePrint = () => {
    window.print();
    import("canvas-confetti").then((m) => m.default({ particleCount: 30, spread: 60, origin: { y: 0.8 } }));
  };

  return (
    <div className="flex flex-col gap-6 p-2">
      
      {/* Logo Upload Section */}
      <div className="flex flex-col gap-2">
        <label className="text-3xs font-semibold text-muted-foreground uppercase">Company Logo</label>
        <div className="flex items-center gap-4">
          {logo ? (
            <div className="relative group">
              <img src={logo} alt="Company Logo" className="h-16 object-contain rounded-lg border border-border" />
              <button
                onClick={() => setLogo(null)}
                className="absolute -top-2 -right-2 bg-rose-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <label className="cursor-pointer bg-neutral-900 border border-border text-xs text-white rounded-lg p-3 hover:bg-neutral-800 transition-colors flex items-center gap-2">
              <Plus className="h-4 w-4" /> Upload Logo
              <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
            </label>
          )}
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-3xs font-semibold text-muted-foreground uppercase">Invoice Number</label>
          <input
            type="text"
            value={invoiceNum}
            onChange={(e) => setInvoiceNum(e.target.value)}
            className="bg-neutral-950 border border-border text-xs text-white rounded-lg p-2 focus:outline-hidden"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-3xs font-semibold text-muted-foreground uppercase">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-neutral-950 border border-border text-xs text-white rounded-lg p-2 focus:outline-hidden"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-3xs font-semibold text-muted-foreground uppercase">Currency</label>
          {/* Currency selector with extensive world currencies */}
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-neutral-950 border border-border text-xs text-white rounded-lg p-2 focus:outline-hidden"
          >
            {[
              { code: "USD", symbol: "$" },
              { code: "EUR", symbol: "€" },
              { code: "GBP", symbol: "£" },
              { code: "INR", symbol: "₹" },
              { code: "PKR", symbol: "Rs" },
              { code: "BDT", symbol: "৳" },
              { code: "AED", symbol: "د.إ" },
              { code: "SAR", symbol: "﷼" },
              { code: "JPY", symbol: "¥" },
              { code: "AUD", symbol: "A$" },
              { code: "CAD", symbol: "C$" },
              { code: "CHF", symbol: "CHF" },
              { code: "CNY", symbol: "¥" },
              { code: "HKD", symbol: "HK$" },
              { code: "NZD", symbol: "NZ$" },
              { code: "SEK", symbol: "kr" },
              { code: "KRW", symbol: "₩" },
              { code: "ZAR", symbol: "R" },
              { code: "RUB", symbol: "₽" },
              { code: "BRL", symbol: "R$" },
              { code: "SGD", symbol: "S$" },
            ].map((c) => (
              <option key={c.code} value={c.symbol}>
                {c.code} ({c.symbol})
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-3xs font-semibold text-muted-foreground uppercase">Tax Rate (%)</label>
          <input
            type="number"
            value={taxRate}
            onChange={(e) => setTaxRate(Number(e.target.value))}
            className="bg-neutral-950 border border-border text-xs text-white rounded-lg p-2 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Billing Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-3xs font-semibold text-muted-foreground uppercase">Invoice From</label>
          <textarea
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="bg-neutral-950 border border-border text-xs text-white rounded-lg p-2 h-20 resize-none focus:outline-hidden"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-3xs font-semibold text-muted-foreground uppercase">Invoice To</label>
          <textarea
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="bg-neutral-950 border border-border text-xs text-white rounded-lg p-2 h-20 resize-none focus:outline-hidden"
          />
        </div>
      </div>

      {/* Staged Items Table */}
      <div className="flex flex-col gap-2">
        <label className="text-3xs font-semibold text-muted-foreground uppercase">Invoice Items</label>
        <div className="flex flex-col gap-2 border border-border rounded-xl p-3 bg-neutral-950/40">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-center gap-2">
              <input
                type="text"
                value={item.description}
                onChange={(e) => updateItem(index, "description", e.target.value)}
                placeholder="Item description"
                className="bg-neutral-950 border border-border text-xs text-white rounded-lg p-2 flex-1 w-full"
              />
              <input
                type="number"
                value={item.qty}
                onChange={(e) => updateItem(index, "qty", e.target.value)}
                placeholder="Qty"
                className="bg-neutral-950 border border-border text-xs text-white rounded-lg p-2 w-full sm:w-16"
              />
              <input
                type="number"
                value={item.price}
                onChange={(e) => updateItem(index, "price", e.target.value)}
                placeholder="Price"
                className="bg-neutral-950 border border-border text-xs text-white rounded-lg p-2 w-full sm:w-24"
              />
              <button
                onClick={() => removeItem(index)}
                disabled={items.length <= 1}
                className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg disabled:opacity-30 shrink-0 self-stretch sm:self-auto flex items-center justify-center border border-rose-500/20"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            onClick={addItem}
            className="py-2 px-3 mt-1 bg-neutral-900 hover:bg-neutral-800 text-xs font-semibold text-white rounded-lg flex items-center justify-center gap-1 border border-border/40"
          >
            <Plus className="h-4 w-4" /> Add Item
          </button>
        </div>
      </div>

      {/* Finances Summary */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 border-t border-border/40 pt-4">
        <div className="flex flex-col gap-1 w-full md:max-w-md">
          <label className="text-3xs font-semibold text-muted-foreground uppercase">Notes / Terms</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="bg-neutral-950 border border-border text-xs text-white rounded-lg p-2 h-14 resize-none focus:outline-hidden"
          />
        </div>

        <div className="w-full md:w-56 space-y-1.5 text-xs">
          <div className="flex justify-between text-muted-foreground font-semibold">
            <span>Subtotal</span>
            <span>{currency}{finances.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-muted-foreground font-semibold">
            <span>Tax ({taxRate}%)</span>
            <span>{currency}{finances.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-primary pt-1.5 border-t border-border/60 text-sm">
            <span>Invoice Total</span>
            <span>{currency}{finances.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Trigger Print Action */}
      <div className="flex justify-end gap-3 border-t border-border/40 pt-4">
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to reset all invoice fields?")) {
              setFrom("Your Company\n123 Business Ave\nCity, Country");
              setTo("Client Company\n456 Client St\nCity, Country");
              setInvoiceNum("INV-001");
              setDate(new Date().toISOString().split("T")[0]);
              setCurrency("$");
              setTaxRate(10);
              setNotes("Thank you for your business!");
              setLogo(null);
              setItems([{ description: "Web Development Services", qty: 1, price: 1500 }]);
            }
          }}
          className="px-4 py-2.5 text-xs font-semibold bg-white dark:bg-card border border-border text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-all cursor-pointer"
        >
          Reset Form
        </button>
        <button
          onClick={handlePrint}
          className="px-5 py-2.5 text-xs font-bold bg-[#7d4dff] border border-[#7d4dff] text-white hover:bg-[#6530ef] rounded-xl transition-all active:scale-95 shadow-md shadow-[#7d4dff]/10 flex items-center gap-1.5 cursor-pointer"
        >
          <Printer className="h-4 w-4" /> Generate &amp; Print Invoice
        </button>
      </div>

      {/* Branding Settings Option Panel */}
      <div className="border-t border-border/40 pt-6 mt-6 print:hidden w-full">
        <BrandingOptions />
      </div>

      {/* Printable Watermark Footer */}
      {getBrandingConfig().enabled && (
        <div className="hidden print:flex items-center justify-center border-t border-dashed border-neutral-200 pt-4 mt-12 text-[9px] text-neutral-400 font-bold select-none uppercase tracking-widest w-full">
          {getBrandingConfig().text}
        </div>
      )}

    </div>
  );
}
