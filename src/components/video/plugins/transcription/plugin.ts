/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { parse } from "@plussub/srt-vtt-parser";
import videojs from "video.js";
import TranscriptionButton from "./components/Button";
import TranscriptionMenuItem from "./components/MenuItem";
import * as Types from "./types";

const Plugin = videojs.getPlugin("plugin");

const registerPlugin = videojs.registerPlugin || videojs.plugin;

class TranscriptionSelector extends Plugin {
  player: videojs.Player;
  config: Types.PlayerConfig;

  private items?: Types.Item[];
  private transcriptionButton?: TranscriptionButton;

  constructor(player: videojs.Player, options: Types.PlayerConfig) {
    super(player, options);
    this.player = player;
    this.config = options;

    this.on("addTranscription", (event, { data }) => {
      this.addTranscription.call(this, data);
    });
  }

  createTranscriptionButton(): void {
    this.transcriptionButton = new TranscriptionButton(this.player);

    const placementIndex = this.player.controlBar.children().length - 2;
    const transcriptionButtonInstance = this.player.controlBar.addChild(
      this.transcriptionButton,
      { componentClass: "subtitles" },
      this.config.placementIndex || placementIndex
    );

    // for change icon create new class like this
    // .vjs-icon-audio:before, .video-js .vjs-audio-button .vjs-icon-placeholder:before
    // and set `content: file`
    transcriptionButtonInstance.addClass("vjs-subtitles-button");
    this.setButtonInnerText("Transcription");
    transcriptionButtonInstance.removeClass("vjs-hidden");
  }

  // { ...item } === copy item
  getTranscriptionMenuItem({ ...item }: Types.Item): TranscriptionMenuItem {
    const player = this.player;
    const transcriptionButton =
      this.transcriptionButton || new TranscriptionButton(player);

    if (item.id === this.config.defaultTranscriptId) {
      item.selected = true;
    }
    return new TranscriptionMenuItem(player, item, transcriptionButton, this);
  }

  addTranscription(items: Types.Item[]): void {
    // unique
    this.items = [...(this.items || []), ...items].filter(
      (item, index, self) =>
        self.findIndex((selfItem) => selfItem.value === item.value) === index
    );
    if (this.items) {
      this.createTranscriptionButton();
    }

    const menuItems = this.items.map(this.getTranscriptionMenuItem.bind(this));

    if (this.transcriptionButton) {
      this.transcriptionButton.createItems = function () {
        return menuItems;
      };
      this.transcriptionButton.update.call(this.transcriptionButton);
    }
  }

  setTranscription(value: string): void {
    // change this function, i don't have a time
    if (value) {
      const parsedValue = parse(value).entries;
      const html = parsedValue
        .map((entry) => `<div>${entry.text}</div>`)
        .join("\n");
      this.config.container.innerHTML = html;
    } else {
      this.config.container.innerHTML = "";
    }
  }

  setButtonInnerText(text: string): void {
    if (this.transcriptionButton) {
      this.transcriptionButton.menuButton_.$(".vjs-control-text").innerHTML =
        text;
    }
  }
}

registerPlugin("transcriptionSelector", TranscriptionSelector);

export default TranscriptionSelector;
