import videojs from "video.js";
import Button from "./Button";
import * as Types from "../types";

const VideoJsMenuItemClass = videojs.getComponent("MenuItem");

class MenuItem extends VideoJsMenuItemClass {
  item: Types.Item;
  transcriptButton: Button;
  plugin: Types.Plugin;

  private isSelected_?: boolean;

  constructor(
    player: videojs.Player,
    item: Types.Item,
    transcriptButton: Button,
    plugin: Types.Plugin
  ) {
    super(player, {
      label: item.label,
      selectable: true,
      selected: item.selected || false,
    });
    this.item = item;
    this.transcriptButton = transcriptButton;
    this.plugin = plugin;

    if (this.item.selected) {
      this.plugin.setTranscription(this.item.value);
    }
  }

  handleClick(): void {
    const selected = this.isSelected_;
    for (let i = 0; i < Number(this.transcriptButton.items?.length); i += 1) {
      this.transcriptButton.items?.[i].selected(false);
    }

    this.plugin.setTranscription(selected ? null : this.item.value);
    this.selected(!selected);
  }
}

export default MenuItem;
