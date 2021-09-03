import videojs from "video.js";

const VideoJsButtonClass = videojs.getComponent("MenuButton");
const VideoJsMenuClass = videojs.getComponent("Menu");
const VideoJsComponent = videojs.getComponent("MenuItem");
const Dom = videojs.dom;

class Button extends VideoJsButtonClass {
  items?: videojs.MenuItem[];
  hideThreshold?: number;

  constructor(player: videojs.Player) {
    super(player, { title: "Transcription" });
  }

  createItems(): videojs.MenuItem[] {
    return [];
  }

  createMenu(): videojs.Menu {
    const menu: videojs.Menu = new VideoJsMenuClass(this.player_, {
      menuButton: this,
    });

    this.hideThreshold = 0;

    // Add a title list item to the top
    if (this.options_?.title) {
      const titleEl = Dom.createEl("li", {
        className: "vjs-menu-title",
        innerHTML: this.options_.title,
        tabIndex: -1,
      });
      const titleComponent = new VideoJsComponent(this.player_, {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        el: titleEl,
      });

      this.hideThreshold += 1;

      menu.addItem(titleComponent);
    }

    this.items = this.createItems.call(this);

    if (this.items) {
      // Add menu items to the menu
      for (let i = 0; i < this.items.length; i++) {
        menu.addItem(this.items[i]);
      }
    }

    return menu;
  }
}

export default Button;
