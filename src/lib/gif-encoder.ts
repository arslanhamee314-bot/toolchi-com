/**
 * Lightweight Client-Side GIF Encoder in TypeScript
 * Performs LZW compression and outputs a standard GIF89a binary Blob.
 * Runs 100% locally in-browser.
 */

export class GIFEncoder {
  private width: number;
  private height: number;
  private delay: number; // in hundredths of a second (e.g. 20 = 200ms)
  private repeat: number; // 0 = loop forever, -1 = no loop
  private frames: Uint8Array[] = [];
  private palette: number[][] = [];

  constructor(width: number, height: number, delayMs: number = 200, repeat: number = 0) {
    this.width = width;
    this.height = height;
    this.delay = Math.round(delayMs / 10);
    this.repeat = repeat;
  }

  /**
   * Add a frame from a Canvas 2D context ImageData (RGBA)
   */
  public addFrame(rgbaPixels: Uint8ClampedArray) {
    // Quantize RGBA pixels to 8-bit index pixels using a simple palette
    const indexedFrame = new Uint8Array(this.width * this.height);
    
    for (let i = 0; i < rgbaPixels.length; i += 4) {
      const r = rgbaPixels[i];
      const g = rgbaPixels[i + 1];
      const b = rgbaPixels[i + 2];
      const a = rgbaPixels[i + 3];

      // If fully transparent, map to index 0 (which we will designate as transparent)
      if (a < 128) {
        indexedFrame[i / 4] = 0;
        continue;
      }

      // Simple quantization: find or insert color in palette (limit 256 colors)
      let colorIndex = this.findColor(r, g, b);
      if (colorIndex === -1) {
        if (this.palette.length < 256) {
          this.palette.push([r, g, b]);
          colorIndex = this.palette.length - 1;
        } else {
          // Palette full, find nearest color
          colorIndex = this.findNearestColor(r, g, b);
        }
      }
      indexedFrame[i / 4] = colorIndex;
    }

    this.frames.push(indexedFrame);
  }

  private findColor(r: number, g: number, b: number): number {
    for (let i = 0; i < this.palette.length; i++) {
      if (this.palette[i][0] === r && this.palette[i][1] === g && this.palette[i][2] === b) {
        return i;
      }
    }
    return -1;
  }

  private findNearestColor(r: number, g: number, b: number): number {
    let minDistance = Infinity;
    let nearestIndex = 0;
    for (let i = 0; i < this.palette.length; i++) {
      const dr = r - this.palette[i][0];
      const dg = g - this.palette[i][1];
      const db = b - this.palette[i][2];
      const d = dr * dr + dg * dg + db * db;
      if (d < minDistance) {
        minDistance = d;
        nearestIndex = i;
      }
    }
    return nearestIndex;
  }

  /**
   * Compile and export the GIF binary Blob
   */
  public build(): Blob {
    const out: number[] = [];

    // Ensure we have at least 1 color in palette
    if (this.palette.length === 0) {
      this.palette.push([0, 0, 0]);
    }

    // Pad palette to power of 2 (max 256)
    let paletteSize = 2;
    while (paletteSize < this.palette.length) {
      paletteSize *= 2;
    }
    while (this.palette.length < paletteSize) {
      this.palette.push([0, 0, 0]);
    }

    const palettePower = Math.log2(paletteSize) - 1;

    // 1. Header: GIF89a
    this.writeString(out, "GIF89a");

    // 2. Logical Screen Descriptor
    this.writeWord(out, this.width);
    this.writeWord(out, this.height);
    
    // Packed Field: Global Color Table Present (1), Color Resolution (111), Sort (0), Size of GCT (palettePower)
    const gctPacked = 0x80 | (0x07 << 4) | palettePower;
    out.push(gctPacked);
    out.push(0); // Background Color Index
    out.push(0); // Pixel Aspect Ratio

    // 3. Global Color Table
    for (const color of this.palette) {
      out.push(color[0], color[1], color[2]);
    }

    // 4. Netscape Application Loop Extension (if repeat >= 0)
    if (this.repeat >= 0) {
      out.push(0x21); // Extension Introducer
      out.push(0xff); // Application Extension Label
      out.push(11);   // Block Size
      this.writeString(out, "NETSCAPE2.0");
      out.push(3);    // Sub-block Size
      out.push(1);    // Loop Sub-block Index
      this.writeWord(out, this.repeat); // Loop count (0 = infinite)
      out.push(0);    // Block Terminator
    }

    // 5. Render frames
    for (const frame of this.frames) {
      // Graphic Control Extension (for delay and transparency)
      out.push(0x21); // Extension Introducer
      out.push(0xf9); // Graphic Control Label
      out.push(4);    // Block Size
      
      // Packed Field: Disposal Method (000), User Input (0), Transparent Color Flag (1)
      out.push(0x01); 
      this.writeWord(out, this.delay);
      out.push(0); // Transparent Color Index (0 is transparent index)
      out.push(0); // Block Terminator

      // Image Descriptor
      out.push(0x2c); // Image Separator
      this.writeWord(out, 0); // Image Left
      this.writeWord(out, 0); // Image Top
      this.writeWord(out, this.width);
      this.writeWord(out, this.height);
      out.push(0); // Packed Field (No local palette)

      // LZW Image Data
      const lzwMinCodeSize = 8;
      out.push(lzwMinCodeSize);
      
      const compressed = this.lzwCompress(frame, lzwMinCodeSize);
      
      // Write sub-blocks of max 255 bytes
      let offset = 0;
      while (offset < compressed.length) {
        const chunkSize = Math.min(255, compressed.length - offset);
        out.push(chunkSize);
        for (let j = 0; j < chunkSize; j++) {
          out.push(compressed[offset + j]);
        }
        offset += chunkSize;
      }
      out.push(0); // Block Terminator
    }

    // 6. Trailer
    out.push(0x3b);

    return new Blob([new Uint8Array(out)], { type: "image/gif" });
  }

  private writeString(out: number[], str: string) {
    for (let i = 0; i < str.length; i++) {
      out.push(str.charCodeAt(i));
    }
  }

  private writeWord(out: number[], val: number) {
    out.push(val & 0xff);
    out.push((val >> 8) & 0xff);
  }

  /**
   * LZW compression logic
   */
  private lzwCompress(pixels: Uint8Array, minCodeSize: number): Uint8Array {
    const clearCode = 1 << minCodeSize;
    const endCode = clearCode + 1;
    let codeSize = minCodeSize + 1;
    let codeMask = (1 << codeSize) - 1;

    // Initialize dict
    const dict = new Map<string, number>();
    const resetDict = () => {
      dict.clear();
      for (let i = 0; i < clearCode; i++) {
        dict.set(String.fromCharCode(i), i);
      }
    };
    resetDict();

    let nextCode = endCode + 1;

    const outBytes: number[] = [];
    let accum = 0;
    let accumBits = 0;

    const writeCode = (code: number) => {
      accum |= code << accumBits;
      accumBits += codeSize;
      while (accumBits >= 8) {
        outBytes.push(accum & 0xff);
        accum >>= 8;
        accumBits -= 8;
      }
    };

    // Output Clear Code first
    writeCode(clearCode);

    let currentPattern = "";
    for (let i = 0; i < pixels.length; i++) {
      const pixel = String.fromCharCode(pixels[i]);
      const combined = currentPattern + pixel;

      if (dict.has(combined)) {
        currentPattern = combined;
      } else {
        writeCode(dict.get(currentPattern)!);
        
        if (nextCode < 4096) {
          dict.set(combined, nextCode++);
          if (nextCode > codeMask + 1 && codeSize < 12) {
            codeSize++;
            codeMask = (1 << codeSize) - 1;
          }
        } else {
          // Dictionary full: reset dict and write clear code
          writeCode(clearCode);
          resetDict();
          nextCode = endCode + 1;
          codeSize = minCodeSize + 1;
          codeMask = (1 << codeSize) - 1;
        }
        currentPattern = pixel;
      }
    }

    if (currentPattern !== "") {
      writeCode(dict.get(currentPattern)!);
    }
    writeCode(endCode);

    // Flush remaining bits
    if (accumBits > 0) {
      outBytes.push(accum & 0xff);
    }

    return new Uint8Array(outBytes);
  }
}
