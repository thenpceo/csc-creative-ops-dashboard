# CSC Generation — Legacy DESIGN.md Research Snapshots

> Research artifact only. These files are not the production brand packages and are not a canonical source of truth.

This directory preserves the first-pass translation of CSC Generation's 13-brand retail portfolio into Google's open `DESIGN.md` alpha format. It is useful as research evidence and as an example exporter target, but its tool-specific YAML, inferred tokens, and generated guidance must not be loaded as the new modular design system.

Production packages will follow the tool-neutral [Brand Package Specification](../BRAND-PACKAGE-SPEC.md). A future exporter may generate this format from those canonical packages. It must not import these snapshots back as authoritative data.

## Brand Set

| # | Brand file | Confidence | Live URL |
|---:|---|---|---|
| 1 | [Backcountry](./backcountry/DESIGN.md) | high | https://www.backcountry.com/ |
| 2 | [Competitive Cyclist](./competitive-cyclist/DESIGN.md) | high | https://www.competitivecyclist.com/ |
| 3 | [BikeTiresDirect](./bike-tires-direct/DESIGN.md) | high | https://www.biketiresdirect.com/ |
| 4 | [Home Consignment Center](./home-consignment-center/DESIGN.md) | high | https://thehomeconsignmentcenter.com/ |
| 5 | [Home Designs](./home-designs/DESIGN.md) | medium | https://www.cabinetryunlimited.com/ |
| 6 | [Level Nine Sports](./level-nine-sports/DESIGN.md) | high | https://www.levelninesports.com/ |
| 7 | [MotoSport](./motosport/DESIGN.md) | high | https://www.motosport.com/ |
| 8 | [One Kings Lane](./one-kings-lane/DESIGN.md) | high | https://www.onekingslane.com/ |
| 9 | [Seattle Coffee Gear](./seattle-coffee-gear/DESIGN.md) | high | https://www.seattlecoffeegear.com/ |
| 10 | [Steep & Cheap](./steep-and-cheap/DESIGN.md) | high | https://www.steepandcheap.com/ |
| 11 | [Sur La Table](./sur-la-table/DESIGN.md) | high | https://www.surlatable.com/ |
| 12 | [Western Bikeworks](./western-bikeworks/DESIGN.md) | high-historical | https://www.westernbikeworks.com/ |
| 13 | [TriSports](./trisports/DESIGN.md) | high-historical | https://www.trisports.com/ |

## How the 13 were resolved

CSC's [current homepage](https://www.cscgeneration.com/) says it powers 13 brands, while its production bundle explicitly names 11: Backcountry, Competitive Cyclist, BikeTiresDirect, Home Consignment Center, Home Designs, Level Nine Sports, MotoSport, One Kings Lane, Seattle Coffee Gear, Steep & Cheap, and Sur La Table.

CSC's [Velotech announcement](https://www.linkedin.com/posts/csc-generation_were-stoked-to-welcome-velotech-inc-activity-7369465759531577347-CDX2) identifies the two additional specialty sites, Western Bikeworks and TriSports. That produces the declared set of 13. The exact source trail and per-brand caveats live in [portfolio-manifest.json](./portfolio-manifest.json).

## Caveats that matter

- Western Bikeworks now redirects to BikeTiresDirect. Its file preserves the last standalone first-party system.
- TriSports now redirects to Competitive Cyclist. Its file preserves the last standalone first-party system.
- Home Designs has no linked consumer site in CSC's bundle. Its file uses CSC's Home Designs logo tile plus the active Cabinetry Unlimited surface associated with the Home Designs hiring organization.
- Coalatree is a recent Backcountry incubator acquisition, but it is not part of the exact 13-brand count resolved above.

## Legacy format validation

Run Google's official linter from this directory:


    for file in */DESIGN.md; do npx -y @google/design.md@0.3.0 lint "$file"; done

The format is currently alpha, so pin the CLI version before using this library in a production build pipeline.

## Safe demo use

Use these files to demonstrate the breadth of the original research or to compare a generated export. Do not use them as the policy layer for a production workflow. The production path is `brand package -> requested modules -> consumer adapter -> output`, as defined in the root implementation overview.
