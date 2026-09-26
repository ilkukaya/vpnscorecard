---
title: "What Is a VPN Kill Switch and Should You Turn It On?"
description: "How a VPN kill switch works, the difference between app-level and system-level kill switches, and how to enable it."
summary: "A VPN kill switch blocks your internet traffic whenever the VPN connection drops, so your real IP address and unencrypted traffic are never exposed. System-level kill switches block all traffic; app-level ones only close selected apps. You should turn it on, especially on public Wi-Fi or when privacy matters."
date: "2026-01-25"
updated: "2026-09-26"
category: technical
readTime: 5
faq:
  - q: "Does a kill switch slow down my internet?"
    a: "No. It does nothing while the VPN is connected. It only blocks traffic during the seconds when the VPN reconnects."
  - q: "Why can't I get online after turning on the kill switch?"
    a: "The VPN is probably disconnected and the kill switch is blocking traffic as designed. Reconnect the VPN or temporarily disable the kill switch."
  - q: "Do iPhones have a kill switch?"
    a: "Most VPN apps offer a kill switch or 'include all networks' option on iOS. Android also has a system setting called 'Block connections without VPN'."
---

VPN connections occasionally drop — when you switch networks, when your laptop wakes from sleep or when a server restarts. For a few seconds your device may fall back to the normal, unencrypted connection. A **kill switch** prevents that.

## How it works

The kill switch watches the VPN connection. If the tunnel goes down, it immediately blocks internet traffic until the VPN reconnects. Nothing leaves your device outside the tunnel.

## Types of kill switch

- **System-level (network) kill switch:** blocks all internet traffic when the VPN disconnects. The safest option.
- **App-level kill switch:** closes or blocks only the apps you choose, such as a browser or P2P client.
- **Always-on / permanent mode:** blocks internet access whenever the VPN isn't connected, even before you open the app.

## When it matters most

- On public Wi-Fi, where a drop could expose unencrypted traffic.
- When you rely on the VPN for privacy from your internet provider.
- During P2P file sharing, where your IP is visible to others.

## How to turn it on

- **Windows/Mac:** VPN app settings → Kill switch → On.
- **Android:** Settings → Network → VPN → your VPN → enable *Always-on VPN* and *Block connections without VPN*.
- **iPhone/iPad:** in the VPN app, enable the kill switch or "include all networks" option if available.

All of the top VPNs in our [rankings](/) include a kill switch; our review pages show it in the key facts section.
