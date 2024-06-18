export enum TILE_MAP {
  OPEN_STREET_BASE = 'openstreetmap_base',
  STADIA_WATERCOLOR = 'stadiawatercolor',
}
export const TILE_MAP_SRC: Record<
  TILE_MAP,
  {
    url: string;
    attribution: string;
  }
> = {
  [TILE_MAP.OPEN_STREET_BASE]: {
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  [TILE_MAP.STADIA_WATERCOLOR]: {
    url: 'https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg',
    attribution:
      '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>',
  },
};
