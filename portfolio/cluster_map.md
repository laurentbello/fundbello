# Cluster map — correlated-thesis layer
#
# The assembly pass uses this to collapse a SINGLE shared driver moving ≥2 members of
# one cluster into ONE read-through sized by AGGREGATE cluster weight — instead of N
# separate alerts. Keep weights in sync with holdings.md. Idiosyncratic items (single-
# name earnings/mgmt/filing) stay under their own name.
# -----------------------------------------------------------------------------

## CLUSTERS

- **Infra concessions** — VINCI, Aena, Cellnex, Ferrovial
  - agg weight: ~15.3%
  - shared drivers: rates, concession-regulation, inflation-linked tariffs
  - cluster break test: a regulatory move that breaks the inflation pass-through /
    re-regulates tariffs across ≥2 members → cluster read-through

- **Industrial gases** — Air Liquide, Linde
  - agg weight: ~10.8%
  - shared drivers: energy/input cost, industrial cycle, on-site pricing
  - cluster break test: industry pricing turning negative (pricing-power break) across both

- **Aerospace** — Safran, Airbus
  - agg weight: ~8.4%
  - shared drivers: build rates, aftermarket/RPK, supply chain
  - cluster break test: a structural RPK/demand shock or shared supply-chain constraint

- **Ratings / fin-data** — S&P Global, Moody's
  - agg weight: ~6.8%
  - shared drivers: debt issuance, rate cycle, ratings regulation
  - cluster break test: ratings re-regulation (issuer rotation / forced competition / fee caps)

- **Semis (WFE / litho)** — ASML, Lam Research
  - agg weight: ~6.5%
  - shared drivers: WFE capex, China export controls, memory vs logic
  - cluster break test: an export-control tightening that cuts served-market across both

- **Payment networks** — Visa, Mastercard
  - agg weight: ~5.3%
  - shared drivers: A2A/stablecoin, interchange/network-fee regulation, cross-border
  - cluster break test: CCCA attachment, network-fee cap, or A2A/stablecoin card-bypass

# -----------------------------------------------------------------------------
# CLUSTER LOGIC (for the assembly pass)
# - If a SINGLE shared driver moved and affects ≥2 members of one cluster, collapse it
#   into ONE cluster read-through sized by AGGREGATE cluster weight — not N alerts.
# - An item that is BOTH a registered single-name signal AND a cluster read-through is
#   reported ONCE under its primary signal with a one-line cluster footnote.
# - Size tiers by exposure at risk: a 1–2% name alone is rarely URGENT; a 10–15% cluster
#   on one driver can be.
