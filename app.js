'use strict';

class MercyPaintsAppEngine {

    constructor() {
        this.colorInventory = [
            { name: "Off-White",       hex: "#f0ece0" },
            { name: "Warm White",      hex: "#f5eedc" },
            { name: "Pale Beige",      hex: "#ddd0be" },
            { name: "Pale Mushroom",   hex: "#b8a48a" },
            { name: "Cream",           hex: "#fdf0c8" },
            { name: "Bluff Bluff",     hex: "#e0c070" },
            { name: "Bamboo",          hex: "#c8a040" },
            { name: "Sunflower",       hex: "#f8c800" },
            { name: "Golden Yellow",   hex: "#e09000" },
            { name: "Mustard",         hex: "#b87800" },
            { name: "Orange",          hex: "#e85000" },
            { name: "Sand",            hex: "#ccc0a0" },
            { name: "Rich Brown",      hex: "#6a3820" },
            { name: "Chocolate",       hex: "#2c1608" },
            { name: "Lilac Haze",      hex: "#c0a8cc" },
            { name: "Rose Pink",       hex: "#f090b0" },
            { name: "Rose",            hex: "#cc4068" },
            { name: "Tile Red",        hex: "#962c20" },
            { name: "Red Oxide",       hex: "#601408" },
            { name: "Laterite Red",    hex: "#802418" },
            { name: "Post Office Red", hex: "#cc0000" },
            { name: "Pale Blue",       hex: "#c0d8e8" },
            { name: "Sky Blue",        hex: "#60a8d8" },
            { name: "Light Blue",      hex: "#80c0e0" },
            { name: "Nursery Blue",    hex: "#3878b8" },
            { name: "Pacific Blue",    hex: "#104878" },
            { name: "Brilliant Blue",  hex: "#0830a0" },
            { name: "Midnight Blue",   hex: "#060e28" },
            { name: "Light Green",     hex: "#98d880" },
            { name: "Leaf Green",      hex: "#347828" },
            { name: "Aquamarine",      hex: "#30c8b0" },
            { name: "Apple Green",     hex: "#689820" },
            { name: "Greengage",       hex: "#486820" },
            { name: "National Green",  hex: "#005020" },
            { name: "Silver Grey",     hex: "#c8c8c8" },
            { name: "Neutral",         hex: "#a0a8b0" },
            { name: "Ice Grey",        hex: "#ccd8e0" },
            { name: "Dove Grey",       hex: "#8898a8" },
            { name: "Ash Grey",        hex: "#687080" },
            { name: "Dark Grey",       hex: "#303840" },
            { name: "Magnolia",        hex: "#f8f0d8" },
            { name: "Peach",           hex: "#f8a870" },
            { name: "Sienna",          hex: "#882810" },
            { name: "Cameo",           hex: "#d09878" },
            { name: "Abuja Brown",     hex: "#402010" },
            { name: "Lilac",           hex: "#b878e0" },
            { name: "Purple",          hex: "#680068" },
            { name: "Deep Purple",     hex: "#300050" },
            { name: "Gossamer",        hex: "#e4e4d8" },
            { name: "Oka Maize",       hex: "#f0c000" },
            { name: "Delta Green",     hex: "#104020" },
            { name: "Butter Cream",    hex: "#fef8d8" },
            { name: "Harmattan Grey",  hex: "#a8b0b0" },
            { name: "Tarqua Green",    hex: "#007868" },
            { name: "Coral Red",       hex: "#e02020" },
            { name: "Casuarina",       hex: "#284838" },
            { name: "Concorde Grey",   hex: "#505860" }
        ];

        this.pricingCatalog = {
            emul_std:        { name: "Emulsion Standard",        p20L: 18000,  p4L: 4000,  coverage: 10 },
            emul_prem:       { name: "Emulsion Premium",         p20L: 21000,  p4L: 5000,  coverage: 12 },
            emul_ext:        { name: "Emulsion Extra",           p20L: 27000,  p4L: 6000,  coverage: 14 },
            satin_prem:      { name: "Satin Premium",            p20L: 53000,  p4L: 13000, coverage: 12 },
            satin_ext:       { name: "Satin Extra",              p20L: 60000,  p4L: 16000, coverage: 15 },
            matt_emul_prem:  { name: "Matt Emulsion Premium",    p20L: 45000,  p4L: 11500, coverage: 11 },
            matt_emul_ext:   { name: "Matt Emulsion Extra",      p20L: 52000,  p4L: 13000, coverage: 13 },
            matt_satin_prem: { name: "Matt Satin Premium",       p20L: 50000,  p4L: 12000, coverage: 11 },
            matt_satin_ext:  { name: "Matt Satin Extra",         p20L: 55000,  p4L: 15000, coverage: 13 },
            tex_std:         { name: "Texcote Standard",         p20L: 20000,  p4L: null,  coverage: 7  },
            tex_prem:        { name: "Texcote Premium",          p20L: 23000,  p4L: null,  coverage: 8  },
            tex_ext:         { name: "Texcote Extra",            p20L: 27000,  p4L: null,  coverage: 9  },
            gravitex:        { name: "Gravitex Special Exterior", p20L: 25000, p4L: null,  coverage: 6  },
            flexcoat:        { name: "Flexcoat Surface Shield",  p20L: 25000,  p4L: null,  coverage: 8  },
            trowel:          { name: "Trowel Finish Industrial", p20L: 30000,  p4L: null,  coverage: 5  },
            gloss:           { name: "Gloss Premium Enamel",     p20L: 90000,  p4L: 22000, coverage: 14 }
        };

        this.logisticsTariffRegistry = {
            pickup:          0,
            mainland:        15000,
            island:          25000,
            'out-of-state':  65000
        };

        this.projectRoomsBasket = [];
        this.initUI();
    }

    /* ── UI INIT ──────────────────────────────────────── */
    initUI() {
        this.renderCatalogSelectMenu();
        this.renderSwatchesGrid();
        this.bindCalculatorEvents();
    }

    /* ── POPULATE PRODUCT DROPDOWN ────────────────────── */
    renderCatalogSelectMenu() {
        const el = document.getElementById('form-paint-product');
        if (!el) return;
        el.innerHTML = '';
        for (const [key, product] of Object.entries(this.pricingCatalog)) {
            const priceLabel = product.p4L
                ? `₦${product.p20L.toLocaleString()} (20L) / ₦${product.p4L.toLocaleString()} (4L)`
                : `₦${product.p20L.toLocaleString()} (20L Only)`;
            const opt = document.createElement('option');
            opt.value = key;
            opt.textContent = `${product.name} — ${priceLabel}`;
            el.appendChild(opt);
        }
    }

    /* ── RENDER COLOR SWATCHES ────────────────────────── */
    renderSwatchesGrid() {
        const grid = document.getElementById('colors-mosaic-grid');
        if (!grid) return;

        this.colorInventory.forEach((color, index) => {
            const tile = document.createElement('div');
            tile.className = 'swatch-item-card';
            tile.setAttribute('title', color.name);
            tile.innerHTML = `
                <div class="swatch-color-pill" style="background-color: ${color.hex};"></div>
                <span class="swatch-label-text">${color.name}</span>
            `;
            tile.addEventListener('click', () => {
                document.querySelectorAll('.swatch-item-card').forEach(t => t.classList.remove('active'));
                tile.classList.add('active');
                const wall = document.getElementById('visualizer-wall-layer');
                const banner = document.getElementById('active-hue-title');
                if (wall) wall.style.backgroundColor = color.hex;
                if (banner) banner.textContent = color.name;
            });
            grid.appendChild(tile);
        });

        // Auto-click first swatch on load
        setTimeout(() => {
            const first = grid.querySelector('.swatch-item-card');
            if (first) first.click();
        }, 120);
    }

    /* ── BIND EVENTS ──────────────────────────────────── */
    bindCalculatorEvents() {
        const addBtn = document.getElementById('action-add-room-btn');
        if (addBtn) addBtn.addEventListener('click', () => this.executeMaterialCalculation());

        const deliverySelect = document.getElementById('form-delivery-region');
        if (deliverySelect) deliverySelect.addEventListener('change', () => this.refreshLedgerTotals());

        const waBtn = document.getElementById('action-whatsapp-dispatch-btn');
        if (waBtn) waBtn.addEventListener('click', () => this.dispatchToWhatsApp());

        const emBtn = document.getElementById('action-email-dispatch-btn');
        if (emBtn) emBtn.addEventListener('click', () => this.dispatchToEmail());
    }

    /* ── CALCULATION ENGINE ───────────────────────────── */
    executeMaterialCalculation() {
        const labelInput   = document.getElementById('form-room-label');
        const productKey   = document.getElementById('form-paint-product').value;
        const surfaceType  = document.getElementById('form-surface-profile').value;
        const areaInput    = document.getElementById('form-surface-area');
        const openings     = parseInt(document.getElementById('form-wastage-guard').value);

        const rawArea = parseFloat(areaInput.value);
        if (!rawArea || rawArea <= 0) {
            alert('Please enter a valid positive surface area in m².');
            return;
        }

        const spaceLabel = labelInput.value.trim() || `Section ${this.projectRoomsBasket.length + 1}`;
        const product    = this.pricingCatalog[productKey];

        // Deduct 2.0 m² per opening (doors/windows)
        const netArea    = Math.max(1, rawArea - (openings * 2.0));

        // Apply porous surface multiplier
        const porousMultiplier = (surfaceType === 'porous') ? 1.15 : 1.0;
        const totalLitres  = (netArea / product.coverage) * porousMultiplier;

        // Container optimisation: use 4L gallons if volume ≤ 8L and product supports 4L
        let containerSize, containerRate, containerLabel;
        if (product.p4L !== null && totalLitres <= 8.0) {
            containerSize  = 4;
            containerRate  = product.p4L;
            containerLabel = '4L Gallon';
        } else {
            containerSize  = 20;
            containerRate  = product.p20L;
            containerLabel = '20L Drum';
        }

        const totalContainers = Math.ceil(totalLitres / containerSize);
        const lineCost        = totalContainers * containerRate;

        this.projectRoomsBasket.push({
            label:      spaceLabel,
            productName: product.name,
            litres:     totalLitres.toFixed(1),
            containers: `${totalContainers} × ${containerLabel}`,
            cost:       lineCost
        });

        // Clear inputs
        labelInput.value = '';
        areaInput.value  = '';

        this.refreshLedgerTotals();
    }

    /* ── REFRESH LEDGER ───────────────────────────────── */
    refreshLedgerTotals() {
        const tableBody    = document.getElementById('basket-table-rows');
        const emptyNotice  = document.getElementById('basket-empty-placeholder');
        const resultsWrap  = document.getElementById('invoice-results-wrapper');

        if (!tableBody || !emptyNotice || !resultsWrap) return;

        tableBody.innerHTML = '';

        if (this.projectRoomsBasket.length === 0) {
            emptyNotice.classList.remove('state-hidden');
            resultsWrap.classList.add('state-hidden');
            return;
        }

        emptyNotice.classList.add('state-hidden');
        resultsWrap.classList.remove('state-hidden');

        let materialSubtotal = 0;

        this.projectRoomsBasket.forEach((item, idx) => {
            materialSubtotal += item.cost;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${item.label}</strong></td>
                <td>${item.productName}</td>
                <td>${item.litres} L</td>
                <td>${item.containers}</td>
                <td>₦${item.cost.toLocaleString()}</td>
                <td>
                    <button class="row-purge" data-idx="${idx}" title="Remove this row">🗑️</button>
                </td>
            `;
            row.querySelector('.row-purge').addEventListener('click', (e) => {
                const removeIdx = parseInt(e.currentTarget.getAttribute('data-idx'));
                this.projectRoomsBasket.splice(removeIdx, 1);
                this.refreshLedgerTotals();
            });
            tableBody.appendChild(row);
        });

        // Logistics
        const deliveryKey    = document.getElementById('form-delivery-region').value;
        const deliveryCost   = this.logisticsTariffRegistry[deliveryKey] || 0;
        const grandTotal     = materialSubtotal + deliveryCost;

        document.getElementById('out-invoice-subtotal').textContent = `₦${materialSubtotal.toLocaleString()}`;
        document.getElementById('out-invoice-delivery').textContent = `₦${deliveryCost.toLocaleString()}`;
        document.getElementById('out-invoice-total').textContent    = `₦${grandTotal.toLocaleString()}`;
    }

    /* ── COMPILE QUOTE PAYLOAD ────────────────────────── */
    compilePayload() {
        const deliveryKey  = document.getElementById('form-delivery-region').value;
        const deliveryCost = this.logisticsTariffRegistry[deliveryKey] || 0;
        const deliveryNames = {
            pickup:         'Self-Pickup at Factory',
            mainland:       'Lagos Mainland',
            island:         'Lagos Island / Lekki-Ajah',
            'out-of-state': 'Interstate / Out-of-Lagos'
        };

        let materialSubtotal = 0;
        this.projectRoomsBasket.forEach(item => { materialSubtotal += item.cost; });
        const grandTotal = materialSubtotal + deliveryCost;

        let lines = [];
        lines.push('🎨 MERCY PAINTS — PROJECT QUOTE');
        lines.push('A Division of A.L.O.I Chemicals');
        lines.push('📍 19, Akinyemi Tawose Street, Ogudu Ori-Oke, Lagos.');
        lines.push('─────────────────────────────────');

        if (this.projectRoomsBasket.length === 0) {
            lines.push('No rooms added yet.');
        } else {
            this.projectRoomsBasket.forEach((item, i) => {
                lines.push(`\n[${i + 1}] ${item.label}`);
                lines.push(`  Product:    ${item.productName}`);
                lines.push(`  Volume:     ${item.litres} L`);
                lines.push(`  Containers: ${item.containers}`);
                lines.push(`  Line Total: ₦${item.cost.toLocaleString()}`);
            });
        }

        lines.push('\n─────────────────────────────────');
        lines.push(`Material Subtotal:  ₦${materialSubtotal.toLocaleString()}`);
        lines.push(`Logistics (${deliveryNames[deliveryKey] || deliveryKey}): ₦${deliveryCost.toLocaleString()}`);
        lines.push(`GRAND TOTAL:        ₦${grandTotal.toLocaleString()}`);
        lines.push('─────────────────────────────────');
        lines.push('📞 +234 706 334 3497 | mercypaints@gmail.com');

        return lines.join('\n');
    }

    /* ── WHATSAPP DISPATCH ────────────────────────────── */
    dispatchToWhatsApp() {
        if (this.projectRoomsBasket.length === 0) {
            alert('Please add at least one room or wall section before dispatching.');
            return;
        }
        const payload = encodeURIComponent(this.compilePayload());
        window.open(`https://wa.me/2347063343497?text=${payload}`, '_blank');
    }

    /* ── EMAIL DISPATCH ───────────────────────────────── */
    dispatchToEmail() {
        if (this.projectRoomsBasket.length === 0) {
            alert('Please add at least one room or wall section before sending.');
            return;
        }
        const subject  = encodeURIComponent('Project Paint Quote — Mercy Paints');
        const body     = encodeURIComponent(this.compilePayload());
        window.open(`mailto:mercypaints@gmail.com?subject=${subject}&body=${body}`, '_blank');
    }
}

/* ── BOOT ─────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    new MercyPaintsAppEngine();
});
