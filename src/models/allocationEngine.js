/**
 * Channel Allocation & E-Auction Optimization Engine
 * Determines the optimal split across Long-Term MoUs, Spot Sales, and E-Auctions
 * to maximize net revenue realization while fulfilling strategic customer SLAs.
 */

import { METALS_DATA } from '../data/mockData.js';

export class AllocationEngine {
  constructor(metalKey = 'zinc') {
    this.metalKey = metalKey;
    // Default channel volume split percentages
    this.mouPct = 70; // 70% Annual Contracts (Tata, JSW, Exide, Adani)
    this.spotPct = 20; // 20% Direct Monthly Spot
    this.auctionPct = 10; // 10% Dynamic E-Auctions
  }

  setMetal(metalKey) {
    if (METALS_DATA[metalKey]) {
      this.metalKey = metalKey;
    }
  }

  setSplit(mouPct, spotPct, auctionPct) {
    const total = mouPct + spotPct + auctionPct;
    if (total === 100) {
      this.mouPct = mouPct;
      this.spotPct = spotPct;
      this.auctionPct = auctionPct;
    }
  }

  optimizeAllocation(totalAvailableVolume = null, marketSentiment = 'BULLISH') {
    const metal = METALS_DATA[this.metalKey];
    const isSilver = this.metalKey === 'silver';
    
    // Total monthly volume to allocate (defaults to HZL SOM production)
    const totalVolume = totalAvailableVolume || metal.somMonthly;
    
    // Base prices & premiums
    const basePrice = isSilver ? metal.domesticExchangePriceINR : metal.currentLMEPrice;
    const basePremium = metal.currentDomesticPremium;

    // Channel pricing dynamics:
    // MoU gives volume rebate (e.g. 5% discount on premium for committed offtake)
    const mouPremium = isSilver ? basePremium - 120 : basePremium - 10;
    
    // Spot captures premium elasticity during domestic tightness
    const spotPremium = isSilver 
      ? basePremium + (marketSentiment === 'BULLISH' ? 250 : -80) 
      : basePremium + (marketSentiment === 'BULLISH' ? 18 : -5);

    // E-Auctions enable competitive bidding if allocated strategically in tight tranches
    const auctionRealizedPremium = isSilver
      ? basePremium + (marketSentiment === 'BULLISH' ? 380 : 50)
      : basePremium + (marketSentiment === 'BULLISH' ? 26 : 5);

    // Volumes
    const mouVolume = Math.round(totalVolume * (this.mouPct / 100));
    const spotVolume = Math.round(totalVolume * (this.spotPct / 100));
    const auctionVolume = Math.round(totalVolume - mouVolume - spotVolume);

    // Channel Revenues
    const mouRealization = mouVolume * (basePrice + mouPremium);
    const spotRealization = spotVolume * (basePrice + spotPremium);
    const auctionRealization = auctionVolume * (basePrice + auctionRealizedPremium);
    const totalRevenue = mouRealization + spotRealization + auctionRealization;
    
    const blendedAveragePremium = (
      (mouVolume * mouPremium + spotVolume * spotPremium + auctionVolume * auctionRealizedPremium) / totalVolume
    ).toFixed(1);

    // Baseline comparison (if 100% was sold at standard MoU baseline)
    const baselineRevenue = totalVolume * (basePrice + mouPremium);
    const incrementalEbitda = Math.max(0, totalRevenue - baselineRevenue);

    // Reserve Price Recommendation for E-Auctions
    const recommendedAuctionReservePrice = isSilver
      ? Math.round(basePrice + basePremium + 50)
      : Math.round(basePrice + basePremium + 8);

    return {
      metalName: metal.name,
      totalVolume,
      unit: metal.baseUnit,
      currency: isSilver ? 'INR' : 'USD',
      premiumUnit: isSilver ? 'INR/kg' : 'USD/MT',
      channels: {
        mou: {
          name: "Annual MoU Contracts (Key Accounts)",
          pct: this.mouPct,
          volume: mouVolume,
          effectivePremium: mouPremium,
          realization: mouRealization,
          rationale: "Guaranteed cash flow & working capital anchor with Tier-1 galvanizers & OEMs."
        },
        spot: {
          name: "Monthly Direct Spot Sales",
          pct: this.spotPct,
          volume: spotVolume,
          effectivePremium: spotPremium,
          realization: spotRealization,
          rationale: "Captures localized regional demand surges and sudden supply crunches."
        },
        auction: {
          name: "Dynamic E-Auction Tranches",
          pct: this.auctionPct,
          volume: auctionVolume,
          effectivePremium: auctionRealizedPremium,
          realization: auctionRealization,
          rationale: "Maximizes price discovery for premium ingot grades & liquid spot participants."
        }
      },
      blendedAveragePremium,
      totalRevenue,
      incrementalEbitda,
      recommendedAuctionReservePrice,
      recommendedTranches: Math.max(2, Math.round(auctionVolume / (isSilver ? 5000 : 2500))),
      bestAuctionTiming: "Tuesday & Thursday 11:00 AM (Post-MCX Morning Session Discovery)"
    };
  }
}
