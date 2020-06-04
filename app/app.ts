import { rawThemes as RAW_THEME_DATA } from "../assets/themes.json";
import { ThemeDatum } from "../app/themeDatum";
import { VotingWidget } from "../app/votingWidgets/votingWidget";
import { PooledThemesWidget } from "../app/themePoolWidgets/pooledThemesWidget";
import { Random } from "../app/utility/random";

/* --- */

var THEME_DATA: ThemeDatum[];

/* --- */

SetupDocument();

/* --- */

function SetupDocument()
{
    LoadThemes();

    PopulatePooledThemesWidget();

    const votingWidget: VotingWidget = new VotingWidget();
    votingWidget.SetThemes( GetRandomTheme(), GetRandomTheme() );
}

function LoadThemes()
{
    const numThemes: number = RAW_THEME_DATA.length;
    THEME_DATA = new Array( numThemes );

    for ( var idx: number = 0; idx < numThemes; ++idx )
    {
        const rawTheme: string = RAW_THEME_DATA[idx];
        THEME_DATA[idx] = new ThemeDatum( rawTheme );
    }
}

function PopulatePooledThemesWidget()
{
    const themeCount = 8;
    const randThemes: ThemeDatum[] = new Array( themeCount );

    for ( var idx: number = 0; idx < themeCount; ++idx )
    {
        randThemes[idx] = GetRandomTheme();
    }

    const pooledThemesWidget: PooledThemesWidget = new PooledThemesWidget();
    pooledThemesWidget.PopulateThemes( randThemes );
}

function GetRandomTheme() : ThemeDatum
{
    const randIdx = Random.Range( 0, THEME_DATA.length );
    return THEME_DATA[randIdx];
}

/* --- */

class AppSettings
{
    private themeCount: number = 8;
    // private currentProfile: Profile = default;

    public SetThemeCount( count: number )
    {
        this.themeCount = count;
    }
}