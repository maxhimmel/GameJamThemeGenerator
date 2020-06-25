// TODO: Load these from a database at some point ...
import { configSettings as CONFIG_SETTINGS } from "../assets/configSettings.json";

/* -- */

import { VotingWidget } from "../app/votingWidgets/votingWidget";
import { PooledThemesWidget } from "../app/themePoolWidgets/pooledThemesWidget";
import { ConfigSettingsWidget } from "./configSettingsWidgets/configSettingsWidget";
import { WinWidget } from "./winWidget/winWidget";

export class MenuManager
{
    private configSettingsWidget: ConfigSettingsWidget;
    private votingWidget: VotingWidget;
    private pooledThemesWidget: PooledThemesWidget;
    private winWidget: WinWidget;

    public constructor()
    {
        this.configSettingsWidget = new ConfigSettingsWidget( CONFIG_SETTINGS );
        this.votingWidget = new VotingWidget();
        this.pooledThemesWidget = new PooledThemesWidget();
        this.winWidget = new WinWidget();

        this.configSettingsWidget.Hide();
        this.votingWidget.Hide();
        this.pooledThemesWidget.Hide();
        this.winWidget.Hide();
    }

    public Begin()
    {
        this.configSettingsWidget.Show();
    }
}