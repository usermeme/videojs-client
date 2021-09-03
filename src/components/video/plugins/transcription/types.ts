import videojs from "video.js";
export interface Item {
  id: string;
  label: string;
  value: string;
  selected?: boolean;
}

export type Plugin = any;

export interface PlayerConfig extends videojs.PlayerOptions {
  defaultTranscriptId: string;
  placementIndex?: number;
  container: HTMLDivElement;
}
