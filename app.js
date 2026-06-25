'use strict';

class MercyPaintsAppEngine {

    constructor() {
        this.colorInventory = [
            { name: "Off-White",       hex: "#f2ede4" },
            { name: "Warm White",      hex: "#f5f0e8" },
            { name: "Pale Beige",      hex: "#e8ddd0" },
            { name: "Pale Mushroom",   hex: "#c4b49e" },
            { name: "Cream",           hex: "#fef4d6" },
            { name: "Bluff Bluff",     hex: "#e8cc96" },
            { name: "Bamboo",          hex: "#d4b870" },
            { name: "Sunflower",       hex: "#f5c842" },
            { name: "Golden Yellow",   hex: "#e8a020" },
            { name: "Mustard",         hex: "#c8902a" },
            { name: "Orange",          hex: "#e86010" },
            { name: "Sand",            hex: "#d8c8a8" },
            { name: "Rich Brown",      hex: "#7a4830" },
            { name: "Chocolate",       hex: "#3e2418" },
            { name: "Lilac Haze",      hex: "#c8b8d0" },
            { name: "Rose Pink",       hex: "#f0a0b8" },
            { name: "Rose",            hex: "#d4607a" },
            { name: "Tile Red",        hex: "#a83c30" },
            { name: "Red Oxide",       hex: "#782018" },
            { name: "Laterite Red",    hex: "#903428" },
            { name: "Post Office Red", hex: "#cc1010" },
            { name: "Pale Blue",       hex: "#c8dce8" },
            { name: "Sky Blue",        hex: "#78b0d8" },
            { name: "Light Blue",      hex: "#90c8e0" },
            { name: "Nursery Blue",    hex: "#4888b8" },
            { name: "Pacific Blue",    hex: "#1e5888" },
            { name: "Brilliant Blue",  hex: "#1040a0" },
            { name: "Midnight Blue",   hex: "#0a1a38" },
            { name: "Light Green",     hex: "#a8d890" },
            { name: "Leaf Green",      hex: "#488040" },
            { name: "Aquamarine",      hex: "#58c8b8" },
            { name: "Apple Green",     hex: "#78a830" },
            { name: "Greengage",       hex: "#587830" },
            { name: "National Green",  hex: "#006030" },
            { name: "Silver Grey",     hex: "#c8c8c8" },
            { name: "Neutral",         hex: "#a8adb0" },
            { name: "Ice Grey",        hex: "#d0d8e0" },
            { name: "Dove Grey",       hex: "#98a4b0" },
            { name: "Ash Grey",        hex: "#808890" },
            { name: "Dark Grey",       hex: "#404850" },
            { name: "Magnolia",        hex: "#f8f0e0" },
            { name: "Peach",           hex: "#f8c090" },
            { name: "Sienna",          hex: "#983820" },
            { name: "Cameo",           hex: "#d8a888" },
            { name: "Abuja Brown",     hex: "#503020" },
            { name: "Lilac",           hex: "#c898e0" },
            { name: "Purple",          hex: "#780878" },
            { name: "Deep Purple",     hex: "#400060" },
            { name: "Gossamer",        hex: "#e8e8e0" },
            { name: "Oka Maize",       hex: "#f0c840" },
            { name: "Delta Green",     hex: "#185030" },
            { name: "Butter Cream",    hex: "#fef8e0" },
            { name: "Harmattan Grey",  hex: "#b0b8b8" },
            { name: "Tarqua Green",    hex: "#008878" },
            { name: "Coral Red",       hex: "#e83030" },
            { name: "Casuarina",       hex: "#385848" },
            { name: "Concorde Grey",   hex: "#606870" }
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
        window.open(`https://mail.google.com/mail/?view=cm&to=mercypaints@gmail.com&su=${subject}&body=${body}`, '_blank');
    }
}

/* ── BOOT ─────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    new MercyPaintsAppEngine();
});
