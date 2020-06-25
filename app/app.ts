// TODO: Load these from a database at some point ...
import { configSettings as CONFIG_SETTINGS } from "../assets/configSettings.json";

import { VotingWidget } from "../app/votingWidgets/votingWidget";
import { PooledThemesWidget } from "../app/themePoolWidgets/pooledThemesWidget";
import { ConfigSettingsWidget } from "./configSettingsWidgets/configSettingsWidget";
import { WinWidget } from "./winWidget/winWidget";

/* --- */

const configSettingsWidget: ConfigSettingsWidget = new ConfigSettingsWidget( CONFIG_SETTINGS );
configSettingsWidget.Show();

const votingWidget: VotingWidget = new VotingWidget();
votingWidget.Hide();

const pooledThemesWidget: PooledThemesWidget = new PooledThemesWidget();
pooledThemesWidget.Hide();

const winWidget: WinWidget = new WinWidget();
winWidget.Hide();

/* --- */