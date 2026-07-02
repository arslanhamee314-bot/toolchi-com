"use client";

import React, { useState, useMemo } from "react";
import { Plus, Trash2, Printer, CheckCircle } from "lucide-react";
import confetti from "canvas-confetti";

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

  const finances = useMemo(() => {
    const subtotal = items.reduce((acc, item) => acc + item.qty * item.price, 0);
    const tax = subtotal * (taxRate / 100);
    const total = subtotal + tax;
    return { subtotal, tax, total };
  }, [items, taxRate]);

  const handlePrint = () => {
    window.print();
    confetti({ particleCount: 30, spread: 60, origin: { y: 0.8 } });
  };

  return (
    <div className="flex flex-col gap-6 p-2">
      
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
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-neutral-950 border border-border text-xs text-white rounded-lg p-2 focus:outline-hidden"
          >
            <option value="$">USD ($)</option>
            <option value="€">EUR (€)</option>
            <option value="£">GBP (£)</option>
            <option value="₹">INR (₹)</option>
            <option value="¥">JPY (¥)</option>
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
      <div className="flex justify-end border-t border-border/40 pt-4">
        <button
          onClick={handlePrint}
          className="px-5 py-2.5 text-xs font-bold bg-primary border border-primary text-primary-foreground hover:bg-primary-hover rounded-xl transition-all active:scale-95 shadow-md shadow-primary/10 flex items-center gap-1.5"
        >
          <Printer className="h-4 w-4" /> Generate & Print Invoice
        </button>
      </div>

    </div>
  );
}
