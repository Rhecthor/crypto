"use client";

import React, { useState } from "react";
import "./Hero.css";

export default function CryptoCheckout() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    amount: "",
    email: "",
    fullName: "",
    wallet: "",
    walletProvider: "",
    crypto: "bitcoin",
  })

  const [transactionId, setTransactionId] = useState("")

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Wallet providers per selected cryptocurrency
  const walletsByCrypto = {
    bitcoin: [
      { id: 'ledger', name: 'Ledger (Hardware)' },
      { id: 'coinbase', name: 'Coinbase Wallet' },
      { id: 'exchange', name: 'Exchange (Binance, Kraken...)' }
    ],
    ethereum: [
      { id: 'metamask', name: 'MetaMask' },
      { id: 'walletconnect', name: 'WalletConnect' },
      { id: 'ledger', name: 'Ledger (Hardware)' }
    ],
    usdt: [
      { id: 'metamask', name: 'MetaMask' },
      { id: 'walletconnect', name: 'WalletConnect' },
      { id: 'exchange', name: 'Exchange (Binance, Coinbase)' }
    ],
    usdc: [
      { id: 'metamask', name: 'MetaMask' },
      { id: 'walletconnect', name: 'WalletConnect' },
      { id: 'coinbase', name: 'Coinbase Wallet' }
    ]
  }

  const generateTxId = () => {
    const rand = Math.random().toString(36).substr(2, 9).toUpperCase()
    return `TX-${Date.now().toString().slice(-5)}-${rand}`
  }

  const handleCompletePayment = () => {
    // basic validation
    if (!formData.walletProvider) {
      alert('Please select a wallet/provider to continue.')
      return
    }
    if (!formData.wallet || formData.wallet.length < 6) {
      alert('Please enter a valid wallet address.')
      return
    }

    // simulate processing and show success
    const tx = generateTxId()
    setTransactionId(tx)
    setCurrentStep(5)
  }

  return (
    <div className="checkout-container">
      <div className="checkout-wrapper">
        {/* Progress Indicator */}
        <div className="progress-section">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(currentStep / 5) * 100}%` }}></div>
          </div>
          <div className="step-indicators">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className={`step-indicator ${currentStep >= step ? "active" : ""}`}>
                <div className="step-number">{step}</div>
                <div className="step-label">
                  {step === 1 && "Amount"}
                  {step === 2 && "Details"}
                  {step === 3 && "Payment"}
                  {step === 4 && "Confirm"}
                  {step === 5 && "Success"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Amount Selection */}
        {currentStep === 1 && (
          <div className="step-content">
            <h1 className="step-title">Select Amount</h1>
            <p className="step-description">Choose the amount you want to pay in cryptocurrency</p>

            <div className="amount-presets">
              {["50", "100", "250", "500"].map((preset) => (
                <button
                  key={preset}
                  className={`preset-button ${formData.amount === preset ? "selected" : ""}`}
                  onClick={() => setFormData({ ...formData, amount: preset })}
                >
                  ${preset}
                </button>
              ))}
            </div>

            <div className="input-group">
              <label htmlFor="amount">Custom Amount (USD)</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="Enter amount"
                className="input-field"
              />
            </div>

            <button className="btn-primary" onClick={handleNextStep} disabled={!formData.amount}>
              Continue
            </button>
          </div>
        )}

        {/* Step 2: Personal Details */}
        {currentStep === 2 && (
          <div className="step-content">
            <h1 className="step-title">Your Details</h1>
            <p className="step-description">We need some information to process your payment</p>

            <div className="input-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="input-field"
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                className="input-field"
              />
            </div>

            <div className="button-group">
              <button className="btn-secondary" onClick={handlePrevStep}>
                Back
              </button>
              <button className="btn-primary" onClick={handleNextStep} disabled={!formData.fullName || !formData.email}>
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Crypto Selection */}
        {currentStep === 3 && (
          <div className="step-content">
            <h1 className="step-title">Select Cryptocurrency</h1>
            <p className="step-description">Choose your preferred payment method</p>

            <div className="crypto-options">
              <div
                className={`crypto-card ${formData.crypto === "bitcoin" ? "selected" : ""}`}
                onClick={() => setFormData({ ...formData, crypto: "bitcoin" })}
              >
                <div className="crypto-icon">₿</div>
                <div className="crypto-info">
                  <h3>Bitcoin</h3>
                  <p>BTC</p>
                </div>
                <div className="crypto-check">✓</div>
              </div>

              <div
                className={`crypto-card ${formData.crypto === "ethereum" ? "selected" : ""}`}
                onClick={() => setFormData({ ...formData, crypto: "ethereum" })}
              >
                <div className="crypto-icon">Ξ</div>
                <div className="crypto-info">
                  <h3>Ethereum</h3>
                  <p>ETH</p>
                </div>
                <div className="crypto-check">✓</div>
              </div>

              <div
                className={`crypto-card ${formData.crypto === "usdt" ? "selected" : ""}`}
                onClick={() => setFormData({ ...formData, crypto: "usdt" })}
              >
                <div className="crypto-icon">₮</div>
                <div className="crypto-info">
                  <h3>Tether</h3>
                  <p>USDT</p>
                </div>
                <div className="crypto-check">✓</div>
              </div>

              <div
                className={`crypto-card ${formData.crypto === "usdc" ? "selected" : ""}`}
                onClick={() => setFormData({ ...formData, crypto: "usdc" })}
              >
                <div className="crypto-icon">$</div>
                <div className="crypto-info">
                  <h3>USD Coin</h3>
                  <p>USDC</p>
                </div>
                <div className="crypto-check">✓</div>
              </div>
            </div>

            <div className="button-group">
              <button className="btn-secondary" onClick={handlePrevStep}>
                Back
              </button>
              <button className="btn-primary" onClick={handleNextStep}>
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Payment Confirmation */}
        {currentStep === 4 && (
          <div className="step-content">
            <h1 className="step-title">Confirm Payment</h1>
            <p className="step-description">Review your payment details before proceeding</p>

            <div className="summary-card">
              <div className="summary-row">
                <span className="summary-label">Amount</span>
                <span className="summary-value">${formData.amount}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Email</span>
                <span className="summary-value">{formData.email}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Name</span>
                <span className="summary-value">{formData.fullName}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Payment Method</span>
                <span className="summary-value crypto-badge">
                  {formData.crypto === "bitcoin" && "₿ Bitcoin"}
                  {formData.crypto === "ethereum" && "Ξ Ethereum"}
                  {formData.crypto === "usdt" && "₮ USDT"}
                  {formData.crypto === "usdc" && "$ USDC"}
                </span>
              </div>
            </div>

            <div className="wallet-section">
              <label htmlFor="walletProvider">Choose Wallet / Provider</label>
              <select
                id="walletProvider"
                name="walletProvider"
                value={formData.walletProvider}
                onChange={(e) => setFormData({ ...formData, walletProvider: e.target.value })}
                className="select-field"
              >
                <option value="">Select a provider</option>
                {(walletsByCrypto[formData.crypto] || []).map((p) => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </select>

              <label htmlFor="wallet" style={{ marginTop: 12, display: 'block' }}>Wallet Address</label>
              <input
                type="text"
                id="wallet"
                name="wallet"
                value={formData.wallet}
                onChange={handleInputChange}
                placeholder="Enter your wallet address"
                className="input-field"
              />
              <p className="wallet-hint">Please double-check your wallet address before confirming</p>
            </div>

            <div className="button-group">
              <button className="btn-secondary" onClick={handlePrevStep}>
                Back
              </button>
              <button className="btn-primary" onClick={handleCompletePayment} disabled={!formData.wallet || !formData.walletProvider}>
                Complete Payment
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Success */}
        {currentStep === 5 && (
          <div className="step-content">
            <h1 className="step-title">Payment Submitted</h1>
            <p className="step-description">Your payment is being processed. You will receive a confirmation shortly.</p>

            <div className="summary-card">
              <div className="summary-row">
                <span className="summary-label">Transaction ID</span>
                <span className="summary-value">{transactionId}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Amount</span>
                <span className="summary-value">${formData.amount}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Payment Method</span>
                <span className="summary-value">{formData.crypto.toUpperCase()}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Provider</span>
                <span className="summary-value">{formData.walletProvider}</span>
              </div>
            </div>

            <div className="button-group">
              <button className="btn-primary" onClick={() => {
                // reset form for a new payment
                setFormData({ amount: '', email: '', fullName: '', wallet: '', walletProvider: '', crypto: 'bitcoin' })
                setTransactionId('')
                setCurrentStep(1)
              }}>
                Make another payment
              </button>
            </div>
          </div>
        )}

        {/* Security Badge */}
        <div className="security-badge">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 0L2 3V7C2 10.866 4.634 14.168 8 15C11.366 14.168 14 10.866 14 7V3L8 0Z" fill="currentColor" />
          </svg>
          <span>Secure Payment • SSL Encrypted</span>
        </div>
      </div>
    </div>
  )
}
