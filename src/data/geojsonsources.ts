export enum CHINA {
  BEIJING = 'beijing',
  FULL = 'full',
  GANSU = 'gansu',
  HEBEI = 'hebei',
  LIAODONG = 'liaodong',
  NINGXIA = 'ningxia',
  SHAANXI = 'shaanxi',
  SHANXI = 'shanxi',
  TIANJIN = 'tianjin',
}
// https://github.com/Adl3rAi/The-Great-Wall-of-China-geodata
export const CHINA_GREAT_WALL_PASSES: Record<CHINA, string> = {
  [CHINA.BEIJING]:
    'https://raw.githubusercontent.com/Adl3rAi/The-Great-Wall-of-China-geodata/main/passes/beijingpasses.geojson',
  [CHINA.FULL]:
    'https://raw.githubusercontent.com/Adl3rAi/The-Great-Wall-of-China-geodata/main/passes/fullpasses.geojson',
  [CHINA.GANSU]:
    'https://raw.githubusercontent.com/Adl3rAi/The-Great-Wall-of-China-geodata/main/passes/gansupasses.geojson',
  [CHINA.HEBEI]:
    'https://raw.githubusercontent.com/Adl3rAi/The-Great-Wall-of-China-geodata/main/passes/hebeipasses.geojson',
  [CHINA.LIAODONG]:
    'https://raw.githubusercontent.com/Adl3rAi/The-Great-Wall-of-China-geodata/main/passes/liaodongpasses.geojson',
  [CHINA.NINGXIA]:
    'https://raw.githubusercontent.com/Adl3rAi/The-Great-Wall-of-China-geodata/main/passes/ningxiapasses.geojson',
  [CHINA.SHAANXI]:
    'https://raw.githubusercontent.com/Adl3rAi/The-Great-Wall-of-China-geodata/main/passes/shaanxipasses.geojson',
  [CHINA.SHANXI]:
    'https://raw.githubusercontent.com/Adl3rAi/The-Great-Wall-of-China-geodata/main/passes/shanxipasses.geojson',
  [CHINA.TIANJIN]:
    'https://raw.githubusercontent.com/Adl3rAi/The-Great-Wall-of-China-geodata/main/passes/tianjinpasses.geojson',
};

export const CHINA_GREAT_WALL_DIRECTIONS: Record<CHINA, string> = {
  [CHINA.BEIJING]:
    'https://raw.githubusercontent.com/Adl3rAi/The-Great-Wall-of-China-geodata/main/direction/beijing.geojson',
  [CHINA.FULL]:
    'https://raw.githubusercontent.com/Adl3rAi/The-Great-Wall-of-China-geodata/main/direction/fulldirection.geojson',
  [CHINA.GANSU]:
    'https://raw.githubusercontent.com/Adl3rAi/The-Great-Wall-of-China-geodata/main/direction/gansu.geojson',
  [CHINA.HEBEI]:
    'https://raw.githubusercontent.com/Adl3rAi/The-Great-Wall-of-China-geodata/main/direction/hebei.geojson',
  [CHINA.LIAODONG]:
    'https://raw.githubusercontent.com/Adl3rAi/The-Great-Wall-of-China-geodata/main/direction/liaodong.geojson',
  [CHINA.NINGXIA]:
    'https://raw.githubusercontent.com/Adl3rAi/The-Great-Wall-of-China-geodata/main/direction/ningxia.geojson',
  [CHINA.SHAANXI]:
    'https://raw.githubusercontent.com/Adl3rAi/The-Great-Wall-of-China-geodata/main/direction/shaanxi.geojson',
  [CHINA.SHANXI]:
    'https://raw.githubusercontent.com/Adl3rAi/The-Great-Wall-of-China-geodata/main/direction/shanxi.geojson',
  [CHINA.TIANJIN]:
    'https://raw.githubusercontent.com/Adl3rAi/The-Great-Wall-of-China-geodata/main/direction/tianjin.geojson',
};

// https://github.com/longwosion/geojson-map-china

export const NEW_YORK_BOROUGHS =
  'https://data.cityofnewyork.us/api/geospatial/tqmj-j8zm?method=export&format=GeoJSON';
